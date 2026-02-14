# 🤖 Manual de Agentes do Sistema Antigravity

Este documento complementa o [Manual de Skills](manual_skills_agentes.md), detalhando as "Personas" (Agentes) especializadas que operam no seu sistema. Cada agente possui um conjunto de **Skills** nativas e regras de comportamento específicas.

---

## 👑 1. Liderança & Orquestração
*Estes agentes coordenam o trabalho dos outros e garantem que o projeto não saia dos trilhos.*

| Agente | Função ("Quem sou eu?") | Quando Ativar |
| :--- | :--- | :--- |
| **`orchestrator`** | **O Chefe**. Gerente de Projeto Técnico. | **Sempre que o pedido for complexo.** Ele quebra o pedido, delega para Frontend/Backend e garante a entrega final. |
| **`product-manager`** | Gerente de Produto. Foco no "O Quê" e "Por Quê". | Para definir **features**, priorizar backlog e alinhar o desenvolvimento com as necessidades do negócio. |
| **`product-owner`** | Dono do Produto. Foco no Valor. | Para refinar histórias de usuário, critérios de aceite e garantir que o time está construindo a coisa certa. |
| **`project-planner`** | O Planejador Metódico. | Para estruturar cronogramas, criar planos de implementação (`implementation_plan.md`) e roadmaps. **Não codifica**, apenas planeja. |

---

## 💻 2. Desenvolvimento Core (Coders)
*Os especialistas que "põem a mão na massa".*

| Agente | Função ("Quem sou eu?") | Quando Ativar |
| :--- | :--- | :--- |
| **`frontend-specialist`** | Especialista em Interfaces Web. | Para criar **componentes**, páginas, animações CSS e lógica JS no navegador (React, Next.js, HTML/CSS). 🎨 *Possui "Design Eye".* |
| **`backend-specialist`** | Especialista em Servidores e Lógica. | Para APIS, bancos de dados, autenticação, filas e lógica de negócios pesada (Node, Python, Go). |
| **`mobile-developer`** | Especialista Mobile Nativo/Híbrido. | Para Apps iOS (Swift), Android (Kotlin) ou Cross-Platform (React Native/Flutter). Conhece regras da Apple/Google. |
| **`game-developer`** | Desenvolvedor de Jogos. | Para lógica de jogos, física, renderização gráfica e engines (Unity, Godot). 🎮 |
| **`full-stack`** *(Implícito)* | O Generalista. | Quando a tarefa é simples e toca em tudo um pouco. (Geralmente o `orchestrator` assume esse papel em tarefas menores). |

---

## 🔍 3. Qualidade & Análise Técnica
*Agentes focados em garantir que o código funcione, seja seguro e performe bem.*

| Agente | Função ("Quem sou eu?") | Quando Ativar |
| :--- | :--- | :--- |
| **`debugger`** | **O Detetive de Bugs**. | Quando algo quebrou e ninguém sabe porquê. Usa metodologia sistemática para encontrar a raiz do problema. 🐛 |
| **`code-archaeologist`** | O Arqueólogo de Código Legado. | Para entender bases de código antigas, sem documentação ou "espaguete". Ele explica "o que isso faz". 📜 |
| **`qa-automation-engineer`** | Engenheiro de Testes Automatizados. | Para criar scripts de teste (E2E, Unitários), configurar CI de testes e garantir cobertura de código. |
| **`test-engineer`** | Engenheiro de Testes (Estratégia). | Foca no *plano de teste*, cenários de borda e garantia de qualidade geral. |
| **`performance-optimizer`** | Otimizador de Performance. | Para fazer o site carregar em <1s. Analisa gargalos, queries lentas e bundle sizes. ⚡ |
| **`security-auditor`** | Auditor de Segurança. | Para revisar código em busca de falhas (XSS, Injection) e sugerir correções de segurança. 🛡️ |
| **`penetration-tester`** | Pentester (Hacker Ético). | Simula ataques reais para provar que o sistema é vulnerável. (Use com cuidado!). |

---

## 🏗️ 4. Infraestrutura & Operações
*Agentes que cuidam do ambiente onde o código roda.*

| Agente | Função ("Quem sou eu?") | Quando Ativar |
| :--- | :--- | :--- |
| **`devops-engineer`** | Engenheiro DevOps. | Para configurar servidores, Docker, Kubernetes, CI/CD pipelines e Cloud (AWS/GCP). |
| **`database-architect`** | Arquiteto de Dados. | Para modelagem complexa de banco, otimização de queries SQL e migrações de dados sensíveis. |

---

## 📚 5. Documentação & Especialidades
*Agentes de suporte e documentação.*

| Agente | Função ("Quem sou eu?") | Quando Ativar |
| :--- | :--- | :--- |
| **`documentation-writer`** | Escritor Técnico. | Para criar READMEs incríveis, documentação de API, manuais de usuário e wikis internas. 📝 |
| **`seo-specialist`** | Especialista em SEO/GEO. | Para garantir que o site apareça no topo do Google e seja "lido" corretamente por IAs. |
| **`explorer-agent`** | O Explorador. | Para navegar em novos diretórios, entender a estrutura de arquivos e mapear o território desconhecido. 🗺️ |

---

### 🧩 Como eles trabalham juntos?
Geralmente, você fala com o **`orchestrator`** (ou comigo, seu assistente principal), e nós "convocamos" esses especialistas conforme a necessidade.
*   *Exemplo:* "Preciso criar um app de delivery".
    *   -> `project-planner` cria o plano.
    *   -> `backend-specialist` faz a API.
    *   -> `mobile-developer` faz o App.
    *   -> `qa-automation` testa tudo.
