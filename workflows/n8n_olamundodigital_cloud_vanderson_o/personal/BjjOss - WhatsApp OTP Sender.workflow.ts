import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : BjjOss - WhatsApp OTP Sender
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
    id: 'Px0rMZmn1h1rP3T2',
    name: 'BjjOss - WhatsApp OTP Sender',
    active: false,
    settings: {
        executionOrder: 'v1',
        callerPolicy: 'workflowsFromSameOwner',
        availableInMCP: false,
        timeSavedMode: 'fixed',
        binaryMode: 'separate',
    },
})
export class BjjossWhatsappOtpSenderWorkflow {
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
        path: 'otp-send',
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
        url: '={{ $json.evolution_url + "/message/sendText/" + $json.evolution_instance }}',
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
            '={\n  "number": "{{ $json.phone }}",\n  "text": "Seu c\\u00f3digo BjjOss: *{{ $json.code }}*. Expira em 10 min."\n}',
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
