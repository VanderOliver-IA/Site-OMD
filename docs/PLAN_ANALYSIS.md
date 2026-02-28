# 🗺️ Plano de Orquestração: Análise Total Site-OMD

## 📝 Objetivo
Realizar uma auditoria 360º no projeto para entendimento completo da arquitetura, segurança, SEO e UX/UI.

## 🤖 Agentes Convocados (Mínimo 3)
1. **`explorer-agent`**: Mapeamento completo de diretórios, rotas e dependências.
2. **`backend-specialist`**: Análise da lógica PHP, integração com Supabase e segurança da pasta `/admin`.
3. **`frontend-specialist`**: Avaliação de fidelidade do design, performance (Lighthouse) e checklist de UX.
4. **`seo-specialist`**: Verificação de meta-tags, acessibilidade e indexabilidade (GEO-friendly).

## 🚀 Fases da Tarefa

### 1. Descoberta e Mapeamento (Explorer)
- Listar todos os arquivos em `admin/`, `includes/` e `assets/`.
- Identificar o schema das tabelas no Supabase através dos arquivos de configuração.

### 2. Auditoria de Lógica e Dados (Backend + Security)
- Analisar `setup-db-user.js` e `verify-admin.js`.
- Revisar `includes/header.php` e `footer.php` para scripts globais e vulnerabilidades.

### 3. Auditoria de Interface e Performance (Frontend)
- Analisar `assets/css/style.css` (ou similar) contra as regras de "Deep Design Thinking".
- Verificar responsividade e animações em `assets/js/main.js`.

### 4. Síntese Final (Orchestrator)
- Gerar o **Relatório de Orquestração** com os achados de cada especialista.

## 🏁 Critérios de Êxito
- Documentação completa da estrutura do banco de dados.
- Mapeamento de todas as rotas da área administrativa.
- Relatório de melhorias de SEO e Performance.
