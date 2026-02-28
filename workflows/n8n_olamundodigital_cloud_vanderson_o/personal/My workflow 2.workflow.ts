import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : My workflow 2
// Nodes   : 2  |  Connections: 0
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// WhenClickingexecuteWorkflow        manualTrigger
// AnalyzeVideo                       googleGemini               [creds]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: '7pTwApvBE3cCgXGq',
    name: 'My workflow 2',
    active: false,
    settings: { executionOrder: 'v1', availableInMCP: false },
})
export class MyWorkflow2Workflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        name: 'When clicking ‘Execute workflow’',
        type: 'n8n-nodes-base.manualTrigger',
        version: 1,
        position: [-224, -64],
    })
    WhenClickingexecuteWorkflow = {};

    @node({
        name: 'Analyze video',
        type: '@n8n/n8n-nodes-langchain.googleGemini',
        version: 1.1,
        position: [-208, 48],
        credentials: { googlePalmApi: { id: '2HNdBucNSmZ5grNO', name: 'Google Gemini(PaLM) Api account' } },
    })
    AnalyzeVideo = {
        resource: 'video',
        operation: 'analyze',
        modelId: {
            __rl: true,
            value: 'models/gemini-2.5-pro',
            mode: 'list',
            cachedResultName: 'models/gemini-2.5-pro',
        },
        text: 'Qual t3ma principal desse video?',
        videoUrls: 'https://youtu.be/N5QP41_Flbo',
        options: {},
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        // No connections defined
    }
}
