import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : OMD CRM - Lead Ingestor Inteligente
// Nodes   : 4  |  Connections: 3
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
// SiteWebhook
//    → IaAnalysis
//      → EvolutionWhatsapp
//      → SaveToSupabase
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
        responseMode: 'responseNode',
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
        model: 'gpt-4o',
        messages: {
            messageValues: [
                {
                    role: 'system',
                    content:
                        'Você é um analista de CRM da agência Olá Mundo Digital. Receba dados de um lead e retorne APENAS um JSON válido com:\n{\n  "score": <número de 0 a 100 baseado no potencial de fechamento>,\n  "summary": "<uma frase resumindo a dor/necessidade do lead>",\n  "category": "<Hot|Warm|Cold>"\n}\nCritérios de Score:\n- 80-100 (Hot): Menciona urgência, orçamento, ou problema claro de vendas\n- 50-79 (Warm): Tem interesse mas sem urgência clara\n- 0-49 (Cold): Curiosidade geral, sem dor específica',
                },
                {
                    role: 'user',
                    content:
                        '=LEAD RECEBIDO:\nNome: {{ $json.body.name }}\nEmail: {{ $json.body.email }}\nTelefone: {{ $json.body.phone }}\nMensagem: {{ $json.body.message }}\nOrigem: {{ $json.body.source }}',
                },
            ],
        },
        options: {
            responseFormat: 'json_object',
        },
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
        operation: 'create',
        tableId: 'leads',
        dataToSend: 'defineBelow',
        fieldsUi: {
            fieldValues: [
                {
                    fieldName: 'full_name',
                    fieldValue: '={{ $node["Site Webhook"].json.body.name }}',
                },
                {
                    fieldName: 'email',
                    fieldValue: '={{ $node["Site Webhook"].json.body.email }}',
                },
                {
                    fieldName: 'phone',
                    fieldValue: '={{ $node["Site Webhook"].json.body.phone }}',
                },
                {
                    fieldName: 'message_raw',
                    fieldValue: '={{ $node["Site Webhook"].json.body.message }}',
                },
                {
                    fieldName: 'source',
                    fieldValue: '={{ $node["Site Webhook"].json.body.source || "site_omd" }}',
                },
                {
                    fieldName: 'ia_score',
                    fieldValue: '={{ JSON.parse($node["IA Analysis"].json.choices[0].message.content).score }}',
                },
                {
                    fieldName: 'ia_summary',
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
        this.SiteWebhook.out(0).to(this.IaAnalysis.in(0));
        this.IaAnalysis.out(0).to(this.EvolutionWhatsapp.in(0));
        this.IaAnalysis.out(0).to(this.SaveToSupabase.in(0));
    }
}
