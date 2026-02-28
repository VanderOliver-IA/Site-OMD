import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : OMD CRM - Lead Ingestor Inteligente
// Nodes   : 4  |  Connections: 2
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// SiteWebhook                        webhook
// IaAnalysis                         openAi                     [creds]
// EvolutionWhatsapp                  httpRequest
// SaveToSupabase                     supabase                   [creds]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// IaAnalysis
//    → EvolutionWhatsapp
//    → SaveToSupabase
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'Wv5ilqrvOQuF1FjD',
    name: 'OMD CRM - Lead Ingestor Inteligente',
    active: true,
    settings: { callerPolicy: 'workflowsFromSameOwner', availableInMCP: false, executionOrder: 'v1' },
})
export class OmdCrmLeadIngestorInteligenteWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        name: 'Site Webhook',
        type: 'n8n-nodes-base.webhook',
        version: 1,
        position: [112, 304],
    })
    SiteWebhook = {
        path: 'omd-leads',
        httpMethod: 'POST',
        responseMode: 'lastNode',
        options: {},
    };

    @node({
        name: 'IA Analysis',
        type: 'n8n-nodes-base.openAi',
        version: 1.1,
        position: [320, 304],
        credentials: { openAiApi: { id: 'ujK1370CzAZ0iWjd', name: 'ApiKeytest' } },
    })
    IaAnalysis = {
        resource: 'chat',
        operation: 'message',
        requestOptions: {},
    };

    @node({
        name: 'Evolution WhatsApp',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.1,
        position: [560, 208],
    })
    EvolutionWhatsapp = {
        method: 'POST',
        url: 'https://evolutionapi.olamundodigital.cloud/message/sendText/crm-omd',
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'apikey',
                    value: 'AB3242D87B9B-47B6-859D-8A5FB07ECF92',
                },
            ],
        },
        sendBody: true,
        specifyBody: 'json',
        jsonBody:
            '={\n  "number": "5521998743504",\n  "text": "🔥 *Novo Lead OMD CRM!*\\n\\n👤 *Nome:* {{ $node[\\"Site Webhook\\"].json.body.name }}\\n📧 *Email:* {{ $node[\\"Site Webhook\\"].json.body.email }}\\n📱 *Fone:* {{ $node[\\"Site Webhook\\"].json.body.phone }}\\n\\n📊 *Score IA:* {{ JSON.parse($node[\\"IA Analysis\\"].json.choices[0].message.content).score }}/100\\n🌡️ *Temp:* {{ JSON.parse($node[\\"IA Analysis\\"].json.choices[0].message.content).category }}\\n📝 *Resumo:* {{ JSON.parse($node[\\"IA Analysis\\"].json.choices[0].message.content).summary }}\\n\\n💬 *Msg Original:* {{ $node[\\"Site Webhook\\"].json.body.message }}\\n\\n🔗 Gerencie no CRM: https://olamundodigital.cloud/crm/"\n}',
        options: {},
    };

    @node({
        name: 'Save to Supabase',
        type: 'n8n-nodes-base.supabase',
        version: 1,
        position: [560, 432],
        credentials: { supabaseApi: { id: 'gePjrjRBkzjpPVxa', name: 'Supabase account' } },
    })
    SaveToSupabase = {
        tableId: 'leads',
        fieldsUi: {
            fieldValues: [
                {
                    fieldId: 'full_name',
                    fieldValue: '={{ $node["Site Webhook"].json.body.name }}',
                },
                {
                    fieldId: 'email',
                    fieldValue: '={{ $node["Site Webhook"].json.body.email }}',
                },
                {
                    fieldId: 'phone',
                    fieldValue: '={{ $node["Site Webhook"].json.body.phone }}',
                },
                {
                    fieldId: 'message_raw',
                    fieldValue: '={{ $node["Site Webhook"].json.body.message }}',
                },
                {
                    fieldId: 'source',
                    fieldValue: '={{ $node["Site Webhook"].json.body.source || "site_omd" }}',
                },
                {
                    fieldId: 'ia_score',
                    fieldValue: '={{ JSON.parse($node["IA Analysis"].json.choices[0].message.content).score }}',
                },
                {
                    fieldId: 'ia_summary',
                    fieldValue: '={{ JSON.parse($node["IA Analysis"].json.choices[0].message.content).summary }}',
                },
            ],
        },
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.IaAnalysis.out(0).to(this.EvolutionWhatsapp.in(0));
        this.IaAnalysis.out(0).to(this.SaveToSupabase.in(0));
    }
}
