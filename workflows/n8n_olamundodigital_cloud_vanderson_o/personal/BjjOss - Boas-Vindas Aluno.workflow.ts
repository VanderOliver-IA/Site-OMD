import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : BjjOss - Boas-Vindas Aluno
// Nodes   : 2  |  Connections: 1
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// Webhook                            webhook
// EvolutionApi                       httpRequest
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// Webhook
//    → EvolutionApi
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'W36suF4eribu0SJc',
    name: 'BjjOss - Boas-Vindas Aluno',
    active: false,
    settings: { executionOrder: 'v1', callerPolicy: 'workflowsFromSameOwner', availableInMCP: false },
})
export class BjjossBoasVindasAlunoWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        name: 'Webhook',
        type: 'n8n-nodes-base.webhook',
        version: 1,
        position: [100, 300],
    })
    Webhook = {
        httpMethod: 'POST',
        path: 'new-student',
        options: {},
    };

    @node({
        name: 'Evolution API',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.1,
        position: [400, 300],
    })
    EvolutionApi = {
        method: 'POST',
        url: "={{ $json.evolution_url + '/message/sendText/' + $json.evolution_instance }}",
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'apikey',
                    value: '={{ $json.evolution_apikey }}',
                },
            ],
        },
        sendBody: true,
        specifyBody: 'json',
        jsonBody:
            '={\n  "number": "{{ $json.phone }}",\n  "text": "OSS! 🥋 Bem-vindo à família, *{{ $json.name }}*!\\n\\nSeu cadastro na academia foi realizado com sucesso. Sua faixa atual é: *{{ $json.belt }}*."\n}',
        options: {},
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.Webhook.out(0).to(this.EvolutionApi.in(0));
    }
}
