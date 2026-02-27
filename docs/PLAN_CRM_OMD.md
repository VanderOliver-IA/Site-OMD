# 🎯 PLANO MESTRE: OMD CRM 2026

> **Data:** 27/02/2026  
> **Status:** FASE 2 - Implementação  
> **Agentes:** orchestrator, project-planner, frontend-specialist, backend-specialist, database-architect, devops-engineer

---

## 📊 AUDITORIA DO ESTADO ATUAL

### ✅ O que JÁ funciona
| Item | Status | Detalhe |
|------|--------|---------|
| **Site PHP** | ✅ Online | `olamundodigital.cloud` via Coolify (Docker + Apache) |
| **Formulário de Lead** | ✅ Código pronto | `index.php` tem form → dispara para n8n webhook |
| **Banco de Dados** | ✅ Tabelas criadas | `leads`, `clients`, `marketing_metrics`, `ai_reports`, `user_permissions` no Supabase |
| **RLS** | ✅ Habilitado | Policies para admin e clientes |
| **n8n Workflow** | ✅ Criado | "OMD CRM - Lead Ingestor Inteligente" (ID: `Wv5ilqrvOQuF1FjD`) |
| **n8n as Code** | ✅ Configurado | Extensão sincronizada, todos os workflows acessíveis |
| **OpenAI no n8n** | ✅ Credencial ativa | `ApiKeytest` (ID: `ujK1370CzAZ0iWjd`) |
| **Deploy Pipeline** | ✅ Funcional | Git push → Coolify auto-build (UUID: `eksok8koc48go4wkcs40coc8`) |

### ❌ O que está QUEBRADO / INCOMPLETO
| Item | Problema | Impacto |
|------|----------|---------|
| **n8n Workflow** | ❌ Nós desconectados (OpenAI → Evolution/Supabase sem link) | Leads não são salvos nem notificados |
| **n8n Credencial Supabase** | ❌ Não existe no n8n | Não salva leads no banco |
| **n8n Evolution API** | ❌ URL/Key são placeholders | WhatsApp não funciona |
| **Dashboard React** | ❌ Não compila (Tailwind v4 + config v3 incompatível) | Tela branca |
| **Dashboard Deploy** | ❌ Não está integrado ao Dockerfile | Não vai subir no Coolify |
| **Formulário no site** | ❌ Não está em produção (commit pendente) | Leads continuam indo pro Zap direto |
| **index.php (L181)** | ❌ `</section>` extra sobrando | HTML malformado |
| **package.json raiz** | ❌ tem deps que não servem mais (`pg`, `dotenv`) | Confusão de projeto |

---

## 🏗️ PLANO DE IMPLEMENTAÇÃO (6 Tarefas)

### TAREFA 1: Corrigir o n8n Workflow (Backend)
**Agente:** `backend-specialist`  
**Arquivo:** `workflows/.../OMD CRM - Lead Ingestor Inteligente.workflow.ts`

**O que fazer:**
1. Conectar `OpenAI` → `Evolution WhatsApp` (output 0)
2. Conectar `OpenAI` → `Save to Supabase` (output 0)
3. Melhorar o prompt da IA para retornar JSON estruturado
4. Configurar o nó OpenAI corretamente (model + messages)
5. Push via extensão n8n-as-code

**Credenciais que o USUÁRIO precisa configurar manualmente:**
- Evolution API: URL + API Key + Instância
- Supabase: Criar credencial no n8n com URL + Service Key

---

### TAREFA 2: Corrigir o Dashboard React (Frontend)
**Agente:** `frontend-specialist`  
**Pasta:** `dashboard/`

**Problemas a resolver:**
1. ❌ Tailwind v4 foi instalado, mas config é formato v3 → **downgrade para Tailwind v3**
2. ❌ Dependências `@supabase/supabase-js`, `lucide-react`, `recharts`, `framer-motion` não estão no package.json
3. ❌ `postcss.config.js` pode estar ausente
4. ❌ `App.css` antigo do Vite template ainda existe

**O que fazer:**
1. Reinstalar dependências corretas (Tailwind v3, Supabase, Recharts, Lucide)
2. Verificar PostCSS config
3. Remover App.css e assets desnecessários
4. Testar build com `npm run build`

---

### TAREFA 3: Integrar Dashboard no Deploy (DevOps)
**Agente:** `devops-engineer`  
**Arquivo:** `Dockerfile`

**Estratégia:** O Dashboard React será compilado (build estático) e servido pelo mesmo Apache do PHP, na rota `/crm/`.

**O que fazer:**
1. Instalar Node.js no Dockerfile (multi-stage build)
2. Buildar o dashboard React durante o Docker build
3. Copiar output (`dashboard/dist/`) para `/var/www/html/crm/`
4. Configurar `vite.config.js` com `base: '/crm/'`
5. O site PHP continua na raiz `/`, o CRM fica em `/crm/`

---

### TAREFA 4: Corrigir HTML do Site (Frontend)
**Agente:** `frontend-specialist`  
**Arquivo:** `index.php`

**O que fazer:**
1. Remover o `</section>` extra na linha 181
2. Garantir que o formulário de lead está funcional
3. Verificar que o webhook URL está correto

---

### TAREFA 5: Git Commit + Push + Deploy (DevOps)
**Agente:** `devops-engineer`

**O que fazer:**
1. `git add .`
2. `git commit -m "feat(crm): dashboard React + formulário de leads + n8n integration"`
3. `git push origin main`
4. Coolify dispara build automático
5. Monitorar até ficar online

---

### TAREFA 6: Validação Final (QA)
**Agente:** `orchestrator`

**Checklist de validação:**
- [ ] Site PHP abre normalmente em `olamundodigital.cloud`
- [ ] Formulário de diagnóstico aparece e envia dados
- [ ] `/crm/` mostra o dashboard React com Kanban
- [ ] n8n webhook responde (testar com curl)

---

## 📋 DEPENDÊNCIAS ENTRE TAREFAS

```
TAREFA 1 (n8n) ──────────────────────────┐
TAREFA 2 (Dashboard React) ──┐           │
TAREFA 4 (HTML Fix) ─────────┼─→ TAREFA 3 (Dockerfile) → TAREFA 5 (Deploy) → TAREFA 6 (Validação)
                              │
```

**Tarefas 1, 2 e 4 são independentes** → Podem rodar em paralelo.  
**Tarefa 3** depende de 2 (precisa do dashboard compilando).  
**Tarefa 5** depende de todas as anteriores.  
**Tarefa 6** depende do deploy estar online.

---

## 🔑 CREDENCIAIS NECESSÁRIAS DO USUÁRIO

| Credencial | Para quê | Onde configurar |
|------------|----------|-----------------|
| Evolution API URL | Notificações WhatsApp | n8n → nó "Evolution WhatsApp" |
| Evolution API Key | Autenticação Evolution | n8n → nó "Evolution WhatsApp" |
| Evolution Instância | Nome da instância Zap | n8n → nó "Evolution WhatsApp" |
| Supabase URL | Salvar leads no banco | n8n → Criar credencial "Supabase" |
| Supabase Service Key | Acesso admin ao banco | n8n → Criar credencial "Supabase" |

---

## 🎯 RESULTADO ESPERADO

Após a execução completa:
1. **`olamundodigital.cloud`** → Site PHP com formulário de captura inteligente
2. **`olamundodigital.cloud/crm/`** → Dashboard React com Kanban de Leads + BI
3. **n8n** → Workflow funcional que analisa leads com IA, salva no Supabase e notifica no WhatsApp
4. **Supabase** → Banco multi-tenant com dados de leads, clientes e métricas

---

## ⏱️ TEMPO ESTIMADO
- **Implementação:** ~30 minutos
- **Deploy + Build:** ~5 minutos
- **Validação:** ~5 minutos
- **Total:** ~40 minutos
