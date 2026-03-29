/**
 * Node/edge definitions for section flow canvases (React Flow).
 */

const GAP_X = 205
const NODE_TYPE = 'doc'

function chain(labels, y = 0, idPrefix = 'n') {
  const nodes = labels.map((label, i) => ({
    id: `${idPrefix}${i}`,
    type: NODE_TYPE,
    position: { x: i * GAP_X, y },
    data: { label },
  }))
  const edges = []
  for (let i = 0; i < labels.length - 1; i += 1) {
    edges.push({
      id: `e-${idPrefix}${i}`,
      source: `${idPrefix}${i}`,
      target: `${idPrefix}${i + 1}`,
      type: 'smoothstep',
    })
  }
  return { nodes, edges }
}

function mergeDiagrams(...parts) {
  return {
    nodes: parts.flatMap((p) => p.nodes),
    edges: parts.flatMap((p) => p.edges),
  }
}

const architecture = mergeDiagrams(
  chain(
    [
      'Data sources',
      'Ingestion',
      'Parsing',
      'Cleaning',
      'Chunking',
      'Embeddings',
      'Vector database',
    ],
    0,
    'i',
  ),
  chain(
    [
      'User question',
      'Query embedding',
      'Similarity search',
      'Reranking',
      'Prompt assembly',
      'LLM',
      'Response',
    ],
    195,
    'q',
  ),
  {
    nodes: [],
    edges: [
      {
        id: 'arch-bridge',
        source: 'i6',
        target: 'q2',
        type: 'smoothstep',
        label: 'corpus index',
        style: { stroke: '#1e4a8c', strokeWidth: 2 },
        labelStyle: { fill: '#1e4a8c', fontWeight: 600, fontSize: 11 },
      },
    ],
  },
)

const parsing = {
  nodes: [
    {
      id: 'p-pdf',
      type: NODE_TYPE,
      position: { x: 0, y: 0 },
      data: { label: 'PDF / Office' },
    },
    {
      id: 'p-img',
      type: NODE_TYPE,
      position: { x: 0, y: 95 },
      data: { label: 'Images → OCR' },
    },
    {
      id: 'p-av',
      type: NODE_TYPE,
      position: { x: 0, y: 190 },
      data: { label: 'Audio / video → transcript' },
    },
    {
      id: 'p-web',
      type: NODE_TYPE,
      position: { x: 0, y: 285 },
      data: { label: 'Web / APIs' },
    },
    {
      id: 'p-out',
      type: NODE_TYPE,
      position: { x: GAP_X * 2.1, y: 120 },
      data: { label: 'Unified records\n(id, text, metadata)' },
    },
  ],
  edges: [
    { id: 'ep0', source: 'p-pdf', target: 'p-out', type: 'smoothstep' },
    { id: 'ep1', source: 'p-img', target: 'p-out', type: 'smoothstep' },
    { id: 'ep2', source: 'p-av', target: 'p-out', type: 'smoothstep' },
    { id: 'ep3', source: 'p-web', target: 'p-out', type: 'smoothstep' },
  ],
}

const advancedRetrieval = {
  nodes: [
    {
      id: 'a0',
      type: NODE_TYPE,
      position: { x: 0, y: 70 },
      data: { label: 'User query' },
    },
    {
      id: 'a1',
      type: NODE_TYPE,
      position: { x: GAP_X, y: 70 },
      data: { label: 'Query rewrite / expand' },
    },
    {
      id: 'a2',
      type: NODE_TYPE,
      position: { x: GAP_X * 2, y: 0 },
      data: { label: 'BM25 (keywords)' },
    },
    {
      id: 'a3',
      type: NODE_TYPE,
      position: { x: GAP_X * 2, y: 140 },
      data: { label: 'Dense vectors' },
    },
    {
      id: 'a4',
      type: NODE_TYPE,
      position: { x: GAP_X * 3.2, y: 70 },
      data: { label: 'Merge & dedupe' },
    },
    {
      id: 'a5',
      type: NODE_TYPE,
      position: { x: GAP_X * 4.35, y: 70 },
      data: { label: 'Reranker' },
    },
    {
      id: 'a6',
      type: NODE_TYPE,
      position: { x: GAP_X * 5.45, y: 70 },
      data: { label: 'Context for LLM' },
    },
  ],
  edges: [
    { id: 'ea0', source: 'a0', target: 'a1', type: 'smoothstep' },
    { id: 'ea1', source: 'a1', target: 'a2', type: 'smoothstep' },
    { id: 'ea2', source: 'a1', target: 'a3', type: 'smoothstep' },
    { id: 'ea3', source: 'a2', target: 'a4', type: 'smoothstep' },
    { id: 'ea4', source: 'a3', target: 'a4', type: 'smoothstep' },
    { id: 'ea5', source: 'a4', target: 'a5', type: 'smoothstep' },
    { id: 'ea6', source: 'a5', target: 'a6', type: 'smoothstep' },
  ],
}

const deployment = {
  nodes: [
    {
      id: 'd0',
      type: NODE_TYPE,
      position: { x: 0, y: 40 },
      data: { label: 'Web client\n(React)' },
    },
    {
      id: 'd1',
      type: NODE_TYPE,
      position: { x: GAP_X * 1.05, y: 40 },
      data: { label: 'API gateway\n(Node / edge)' },
    },
    {
      id: 'd2',
      type: NODE_TYPE,
      position: { x: GAP_X * 2.1, y: 40 },
      data: { label: 'Workers\n(parse · embed)' },
    },
    {
      id: 'd3',
      type: NODE_TYPE,
      position: { x: GAP_X * 3.15, y: 40 },
      data: { label: 'Vector DB' },
    },
    {
      id: 'd4',
      type: NODE_TYPE,
      position: { x: GAP_X * 4.2, y: 40 },
      data: { label: 'LLM provider' },
    },
  ],
  edges: [
    { id: 'ed0', source: 'd0', target: 'd1', type: 'smoothstep' },
    { id: 'ed1', source: 'd1', target: 'd2', type: 'smoothstep' },
    { id: 'ed2', source: 'd2', target: 'd3', type: 'smoothstep' },
    { id: 'ed3', source: 'd1', target: 'd4', type: 'smoothstep', label: 'chat' },
  ],
}

const production = {
  nodes: [
    {
      id: 'pr0',
      type: NODE_TYPE,
      position: { x: 0, y: 60 },
      data: { label: 'Incoming traffic' },
    },
    {
      id: 'pr1',
      type: NODE_TYPE,
      position: { x: GAP_X * 1, y: 0 },
      data: { label: 'Cache\n(Redis)' },
    },
    {
      id: 'pr2',
      type: NODE_TYPE,
      position: { x: GAP_X * 1, y: 120 },
      data: { label: 'Rate limits' },
    },
    {
      id: 'pr3',
      type: NODE_TYPE,
      position: { x: GAP_X * 2.15, y: 60 },
      data: { label: 'PII & ACL checks' },
    },
    {
      id: 'pr4',
      type: NODE_TYPE,
      position: { x: GAP_X * 3.25, y: 60 },
      data: { label: 'RAG pipeline' },
    },
  ],
  edges: [
    { id: 'epr0', source: 'pr0', target: 'pr1', type: 'smoothstep' },
    { id: 'epr1', source: 'pr0', target: 'pr2', type: 'smoothstep' },
    { id: 'epr2', source: 'pr1', target: 'pr3', type: 'smoothstep' },
    { id: 'epr3', source: 'pr2', target: 'pr3', type: 'smoothstep' },
    { id: 'epr4', source: 'pr3', target: 'pr4', type: 'smoothstep' },
  ],
}

const advancedRag = {
  nodes: [
    {
      id: 'ar0',
      type: NODE_TYPE,
      position: { x: 0, y: 80 },
      data: { label: 'Baseline RAG' },
    },
    {
      id: 'ar1',
      type: NODE_TYPE,
      position: { x: GAP_X * 1.3, y: 0 },
      data: { label: 'Graph RAG\n(entities & relations)' },
    },
    {
      id: 'ar2',
      type: NODE_TYPE,
      position: { x: GAP_X * 1.3, y: 160 },
      data: { label: 'Agentic RAG\n(tools · multi-step)' },
    },
    {
      id: 'ar3',
      type: NODE_TYPE,
      position: { x: GAP_X * 2.75, y: 80 },
      data: { label: 'Richer answers\n(higher ops cost)' },
    },
  ],
  edges: [
    { id: 'ear0', source: 'ar0', target: 'ar1', type: 'smoothstep' },
    { id: 'ear1', source: 'ar0', target: 'ar2', type: 'smoothstep' },
    { id: 'ear2', source: 'ar1', target: 'ar3', type: 'smoothstep' },
    { id: 'ear3', source: 'ar2', target: 'ar3', type: 'smoothstep' },
  ],
}

const keyPoints = {
  nodes: [
    {
      id: 'k0',
      type: NODE_TYPE,
      position: { x: 0, y: 0 },
      data: { label: 'Chunk overlap\n→ continuity' },
    },
    {
      id: 'k1',
      type: NODE_TYPE,
      position: { x: GAP_X * 1.15, y: 0 },
      data: { label: 'Same embed model\nindex + query' },
    },
    {
      id: 'k2',
      type: NODE_TYPE,
      position: { x: GAP_X * 2.3, y: 0 },
      data: { label: 'Hybrid search\nlexical + semantic' },
    },
    {
      id: 'k3',
      type: NODE_TYPE,
      position: { x: GAP_X * 1.15, y: 110 },
      data: { label: 'Reliable production RAG' },
    },
  ],
  edges: [
    { id: 'ek0', source: 'k0', target: 'k3', type: 'smoothstep' },
    { id: 'ek1', source: 'k1', target: 'k3', type: 'smoothstep' },
    { id: 'ek2', source: 'k2', target: 'k3', type: 'smoothstep' },
  ],
}

const summary = chain(
  [
    'Data engineering',
    'Search & retrieval',
    'Prompt & LLM',
    'Governance',
    'Production AI assistant',
  ],
  0,
  's',
)

/** @type {Record<string, { nodes: object[]; edges: object[]; minHeight?: number }>} */
export const flowDiagramsBySectionId = {
  'what-is-rag': { ...chain([
    'Private & public documents',
    'Retrieve relevant passages',
    'Inject context into prompt',
    'Large language model',
    'Grounded answer',
  ]) },

  architecture: { ...architecture, minHeight: 420 },

  ingestion: {
    ...chain([
      'PDFs · images · audio · video',
      'Connectors & uploads',
      'Validated raw payloads',
      'Handoff to parsers',
    ]),
  },

  parsing: { ...parsing, minHeight: 400 },

  cleaning: {
    ...chain([
      'Raw extracted text',
      'Strip noise (headers / footers)',
      'Normalize whitespace & encoding',
      'Optional NLP cleanup',
      'Clean text for chunking',
    ]),
  },

  chunking: {
    ...chain([
      'Clean document',
      'Choose strategy\n(fixed · recursive · semantic)',
      'Split with overlap',
      'Text chunks ready to embed',
    ]),
  },

  embeddings: {
    ...chain([
      'Text chunk',
      'Embedding model\n(same at query time)',
      'Vector (high-dimensional)',
    ]),
  },

  'vector-db': {
    ...chain([
      'Vectors + metadata',
      'Index (e.g. HNSW)',
      'Similarity queries',
      'Top-k chunk IDs',
    ]),
  },

  'query-pipeline': {
    ...chain([
      'User question',
      'Embed query',
      'Search vector store',
      'Retrieve top-k chunks',
      'Pass to prompt builder',
    ]),
  },

  'advanced-retrieval': { ...advancedRetrieval, minHeight: 320 },

  'prompt-augmentation': {
    ...chain([
      'System instructions',
      'Retrieved context blocks',
      'User question',
      'Augmented prompt',
    ]),
  },

  generation: {
    ...chain(['Augmented prompt', 'LLM inference', 'Draft answer', 'Optional citations']),
  },

  'source-highlighting': {
    ...chain([
      'Answer text',
      'Chunk metadata\n(page · time · id)',
      'Span mapping',
      'UI: highlights & sources',
    ]),
  },

  evaluation: {
    ...chain([
      'Test questions',
      'Retrieval + answers',
      'Metrics\n(relevance · faithfulness · latency)',
      'Dashboards & regression sets',
    ]),
  },

  deployment: { ...deployment, minHeight: 340 },

  production: { ...production, minHeight: 320 },

  'advanced-rag': { ...advancedRag, minHeight: 340 },

  'key-points': { ...keyPoints, minHeight: 300 },

  'libraries-and-cost': {
    ...chain([
      'List tools by pipeline stage',
      'Classify: OSS vs API vs managed',
      'Check license & data residency',
      'Estimate TCO\n(infra + tokens + seats)',
      'Pilot → production choice',
    ]),
  },

  summary: { ...summary },
}

export function getFlowDiagram(sectionId) {
  return flowDiagramsBySectionId[sectionId] ?? null
}
