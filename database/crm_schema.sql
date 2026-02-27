-- OMD CRM 2026 - Estrutura Mestra
-- Foco: Multi-tenant (Área do Cliente) + CRM + BI (Killer Reportei)

-- 1. Tabela de Clientes (Empresas que a OMD atende)
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name TEXT NOT NULL,
    company_name TEXT,
    logo_url TEXT,
    website TEXT,
    contact_email TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabela de Leads (Gestão de CRM)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    source TEXT DEFAULT 'site_omd', -- Origem (Google, Instagram, Site)
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacting', 'qualified', 'converted', 'lost')),
    ia_score INT DEFAULT 0, -- 0 a 100 (Vem da análise de IA do n8n)
    ia_summary TEXT, -- Resumo automático da dor do cliente
    message_raw TEXT, -- Mensagem original que o lead mandou
    assigned_to UUID REFERENCES auth.users(id), -- Quem da agência cuida desse lead
    last_contact TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabela de Métricas (O Cérebro do BI - Substituto do Reportei)
-- Aqui o n8n vai injetar os dados de Meta/Google Ads
CREATE TABLE IF NOT EXISTS public.marketing_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    platform TEXT NOT NULL, -- 'meta', 'google', 'ga4'
    date_ref DATE NOT NULL,
    reach INT DEFAULT 0,
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    conversions INT DEFAULT 0,
    spend DECIMAL(10,2) DEFAULT 0.00,
    currency TEXT DEFAULT 'BRL',
    raw_json JSONB, -- Dados brutos caso precise reprocessar
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Relatórios Gerados por IA
CREATE TABLE IF NOT EXISTS public.ai_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    ai_insights TEXT, -- O "Comentário da Agência" gerado pela IA
    view_count INT DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Controle de Permissões (Quem é Admin OMD e quem é Cliente)
CREATE TABLE IF NOT EXISTS public.user_permissions (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    client_id UUID REFERENCES public.clients(id), -- Se NULL, é Admin da OMD
    role TEXT DEFAULT 'client' CHECK (role IN ('superadmin', 'manager', 'client')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Ativar RLS (Segurança Máxima)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_reports ENABLE ROW LEVEL SECURITY;

-- 7. Políticas de Segurança (O pulo do gato)
-- Admins vêem TUDO. Clientes vêem apenas o seu client_id.

CREATE POLICY "Admins full access" ON public.clients 
    USING (EXISTS (SELECT 1 FROM public.user_permissions WHERE user_id = auth.uid() AND role IN ('superadmin', 'manager')));

CREATE POLICY "Clients view own data" ON public.ai_reports 
    FOR SELECT USING (client_id IN (SELECT client_id FROM public.user_permissions WHERE user_id = auth.uid()));
