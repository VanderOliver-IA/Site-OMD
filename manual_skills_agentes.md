# 📘 Manual de Skills e Agentes do Sistema

Este documento serve como um guia de referência para todas as "Skills" (Habilidades) e Agentes disponíveis no seu sistema. Use este manual para entender qual ferramenta ativar para cada tipo de tarefa.

---

## 🧠 1. Core & Planejamento Estratégico
*Estas skills são fundamentais para o início de projetos e organização.*

| Skill | Função Principal | Quando Usar |
| :--- | :--- | :--- |
| **`app-builder`** | Construtor de Apps | Para criar uma aplicação completa do zero via chat. Ele orquestra todo o processo de escolha de stack e setup. |
| **`architecture`** | Arquiteto de Software | Ao tomar decisões estruturais difíceis (ex: Monolito vs Microserviços). Cria documentos de decisão (ADRs). |
| **`brainstorming`** | Brainstorming Socrático | **MANDATÓRIO** para tarefas complexas. O agente faz perguntas para esclarecer requisitos antes de codar. |
| **`plan-writing`** | Planejamento de Tarefas | Para quebrar grandes objetivos em passos menores, com dependências e critérios de sucesso claros. |
| **`behavioral-modes`** | Modos de Comportamento | Define se o agente deve agir como "Planejador", "Debugador", "Professor" ou "Executor". |
| **`intelligent-routing`** | Roteamento Inteligente | Analisa seu pedido e escolhe automaticamente o melhor especialista (Frontend, Backend, etc.). |
| **`parallel-agents`** | Agentes Paralelos | Para tarefas que exigem múltiplas perspectivas simultâneas (ex: Análise de Segurança + Performance + UX ao mesmo tempo). |
| **`micro-saas-launcher`** | Lançador de Micro SaaS | Guia completo para lançar produtos pequenos e lucrativos rápido. Cobre desde a ideia até o MVP e pricing. |

---

## 🎨 2. Frontend & Design (UI/UX)
*Para criar interfaces bonitas, responsivas e modernas.*

| Skill | Função Principal | Quando Usar |
| :--- | :--- | :--- |
| **`frontend-design`** | Design Web Geral | Princípios de cores, tipografia e layout para web. Use para criar telas bonitas, não apenas funcionais. |
| **`mobile-design`** | Design Mobile-First | Focado em toques, gestos e telas pequenas (iOS/Android). Essencial para Apps ou PWA. |
| **`web-design-guidelines`** | Auditoria de UI | Use para "revisar meu site". Verifica se o design segue padrões de usabilidade e acessibilidade. |
| **`layout_replication`** | Reprodução de Layout | **Skill Personalizada**. Ensina como replicar comportamentos específicos (Logo Viajante, Botões Flutuantes) do projeto OMD. |
| **`tailwind-patterns`** | Tailwind CSS Pro | Melhores práticas para Tailwind v4. Use se estiver estilizando com Tailwind. |
| **`react-best-practices`** | Especialista React/Next.js | Otimizações de performance, estrutura de componentes e hooks para React e Next.js. |

---

## ⚙️ 3. Backend, API e Dados
*A estrutura robusta por trás da aplicação.*

| Skill | Função Principal | Quando Usar |
| :--- | :--- | :--- |
| **`api-patterns`** | Design de API | Decidir entre REST vs GraphQL, versionamento, paginação e formatos de resposta JSON. |
| **`database-design`** | Arquiteto de Banco de Dados | Modelagem de dados (Schema), índices, escolha de ORM e bancos serverless (Supabase/Postgres). |
| **`supabase-auth-setup`** | Setup Supabase Auth | **Skill Personalizada**. Guia passo-a-passo infalível para configurar Login/Cadastro no Supabase sem erros. |
| **`nodejs-best-practices`** | Node.js Expert | Padrões de segurança, async/await e arquitetura para servidores Node.js. |
| **`python-patterns`** | Python Expert | Padrões Pythonicos, tipagem e frameworks (Django/FastAPI). |
| **`rust-pro`** | Rust Expert | Para sistemas de alta performance, concorrência segura e uso do ecossistema Rust moderno. |
| **`mcp-builder`** | Construtor MCP | Para criar novos servidores MCP (Model Context Protocol) e estender as capacidades da IA. |

---

## 🛡️ 4. DevOps, Infraestrutura & Segurança
*Para manter o sistema no ar e seguro.*

| Skill | Função Principal | Quando Usar |
| :--- | :--- | :--- |
| **`deployment-procedures`** | Deploy Seguro | Estratégias de deploy, rollback e CI/CD. "Como colocar isso no ar sem quebrar nada?". |
| **`server-management`** | Gerenciamento de Servidor | Monitoramento e escalabilidade de servidores Linux. |
| **`bash-linux`** | Terminal Linux | Comandos avançados de shell, scripting e automação no Linux/MacOS. |
| **`powershell-windows`** | Terminal Windows | Scripts e comandos para ambientes Windows (PowerShell). |
| **`vulnerability-scanner`** | Scanner de Vulnerabilidades | Análise de segurança (OWASP), dependências perigosas e riscos na cadeia de suprimentos. |
| **`red-team-tactics`** | Táticas Red Team (Hacker) | Simula ataques para testar a defesa do seu sistema (Testes de Penetração Éticos). |

---

## ✅ 5. Qualidade de Código & Testes
*Para garantir que o código funcione e seja mantenível.*

| Skill | Função Principal | Quando Usar |
| :--- | :--- | :--- |
| **`clean-code`** | Código Limpo | Padrões universais de código legível. **Sempre ativo** (Tier 0) para garantir qualidade. |
| **`code-review-checklist`** | Checklist de Review | Use para pedir uma revisão completa do seu código antes de aprovar um PR. |
| **`systematic-debugging`** | Debug Sistemático | Metodologia científica para achar bugs difíceis (Hipótese -> Teste -> Correção). |
| **`tdd-workflow`** | Test-Driven Development | Fluxo "Red-Green-Refactor". Escrever testes antes do código. |
| **`testing-patterns`** | Padrões de Teste | Estratégias de Mocks, Stubs e testes unitários/integração. |
| **`webapp-testing`** | Testes E2E (Web) | Testes ponta-a-ponta (Playwright/Cypress) que simulam o usuário navegando. |
| **`performance-profiling`** | Profiling de Performance | Identificar gargalos de lentidão no código ou no carregamento da página. |

---

## 🚀 6. Marketing & Especialidades
*Recursos específicos para crescimento e nichos.*

| Skill | Função Principal | Quando Usar |
| :--- | :--- | :--- |
| **`seo-fundamentals`** | SEO Técnico | Otimização para Google (Core Web Vitals, Meta tags, Estrutura semântica). |
| **`geo-fundamentals`** | GEO (Generative Engine Opt) | Otimização para ser encontrado por IAs (ChatGPT, Perplexity, etc). |
| **`i18n-localization`** | Internacionalização | Preparar o app para múltiplos idiomas e culturas (traduções, moedas, datas). |
| **`game-development`** | Desenvolvimento de Jogos | Orquestrador para criar jogos. Roteia para engines específicas (Unity, Godot, WebGL). |
| **`documentation-templates`** | Templates de Docs | Modelos prontos para README, API Docs e comentários de código. |

---

### 💡 Dica Pro: Como usar uma Skill
Você não precisa "instalar" nada. Basta mencionar no chat o que deseja, ou usar o comando slash correspondente se houver.
Exemplos:
*   *"Preciso planejar a arquitetura do banco de dados."* (Ativa `database-design`)
*   *"Analise a segurança desse código."* (Ativa `vulnerability-scanner`)
*   *"Crie um plano de testes para o login."* (Ativa `webapp-testing`)
