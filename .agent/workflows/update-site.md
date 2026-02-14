---
description: Atualizar site OMD em produção após alterações locais
---

# Workflow: Atualizar Site em Produção

Este workflow atualiza o site OláMundoDigital após fazer alterações locais.

## Pré-requisitos
- Alterações feitas e testadas localmente
- Git configurado corretamente

## Passos

### 1. Commitar alterações localmente
// turbo
```powershell
git add .
git commit -m "Descrição da alteração"
```

### 2. Push para GitHub
// turbo
```powershell
git push origin main
```

### 3. Trigger deploy no Coolify (via MCP)
O Antigravity executará automaticamente:
```
mcp_coolify_deploy com tag_or_uuid='eksok8koc48go4wkcs40coc8'
```

### 4. Monitorar deploy
O Antigravity verificará o status até completar:
```
mcp_coolify_deployment com action='get' e uuid do deployment
```

### 5. Validar
Acessar a URL do site e verificar se as mudanças estão visíveis.

## Tempo Estimado
- **Total:** ~3-5 minutos
- Commit + Push: ~30 segundos
- Build no Coolify: ~2-4 minutos

## Troubleshooting
- **Build falhou:** Verificar logs com `mcp_coolify_application_logs`
- **Mudanças não aparecem:** Limpar cache do navegador (Ctrl+Shift+R)
- **Erro de autenticação Git:** Executar `git credential-manager delete https://github.com`
