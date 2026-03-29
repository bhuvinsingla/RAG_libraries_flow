/**
 * Roadmap-style layout (inspired by roadmap.sh): columns = phases, vertical stacks per phase.
 */

const COL_W = 228
const ROW_H = 72
const TOP = 108
const LEFT = 32

/** Column meta: phase title + section ids in order (top → bottom). */
export const ROADMAP_COLUMNS = [
  { track: 'concept', title: 'Concept', ids: ['what-is-rag', 'architecture'] },
  { track: 'ingest', title: 'Ingest', ids: ['ingestion', 'parsing'] },
  { track: 'prepare', title: 'Prepare text', ids: ['cleaning', 'chunking'] },
  { track: 'index', title: 'Index', ids: ['embeddings', 'vector-db'] },
  { track: 'retrieve', title: 'Retrieve', ids: ['query-pipeline', 'advanced-retrieval'] },
  { track: 'generate', title: 'Generate', ids: ['prompt-augmentation', 'generation', 'source-highlighting'] },
  { track: 'ship', title: 'Ship', ids: ['evaluation', 'deployment', 'production'] },
  { track: 'tools', title: 'Tools & cost', ids: ['libraries-and-cost'] },
  { track: 'grow', title: 'Go deeper', ids: ['advanced-rag', 'key-points', 'summary'] },
]

/** Short labels for roadmap nodes (readable on small boxes). */
const LABELS = {
  'what-is-rag': 'What is RAG?',
  architecture: 'Architecture',
  ingestion: 'Data ingestion',
  parsing: 'Parsing (multi-modal)',
  cleaning: 'Cleaning & normalization',
  chunking: 'Chunking',
  embeddings: 'Embeddings',
  'vector-db': 'Vector database',
  'query-pipeline': 'Query pipeline',
  'advanced-retrieval': 'Advanced retrieval',
  'prompt-augmentation': 'Prompt augmentation',
  generation: 'Generation (LLM)',
  'source-highlighting': 'Sources & highlights',
  evaluation: 'Evaluation',
  deployment: 'Deployment',
  production: 'Production',
  'libraries-and-cost': 'Libraries & cost',
  'advanced-rag': 'Advanced RAG',
  'key-points': 'Key concepts',
  summary: 'Summary',
}

function labelFor(sectionId, fallbackTitle) {
  return LABELS[sectionId] ?? fallbackTitle.slice(0, 34)
}

/**
 * @param {{ id: string; title: string }[]} sections
 * @returns {{ nodes: import('@xyflow/react').Node[]; edges: import('@xyflow/react').Edge[] }}
 */
export function buildRoadmapGraph(sections) {
  const titleById = Object.fromEntries(sections.map((s) => [s.id, s.title]))
  const nodes = []
  const edges = []

  const columnNodeIds = []

  ROADMAP_COLUMNS.forEach((col, colIndex) => {
    const x = LEFT + colIndex * COL_W
    const labelId = `col-label-${colIndex}`
    nodes.push({
      id: labelId,
      type: 'roadmapLabel',
      position: { x, y: 24 },
      draggable: false,
      selectable: false,
      data: { label: col.title, track: col.track },
    })

    const ids = col.ids.filter((id) => titleById[id])
    const colIds = []
    ids.forEach((sectionId, rowIndex) => {
      const nid = `rm-${sectionId}`
      colIds.push(nid)
      nodes.push({
        id: nid,
        type: 'roadmap',
        position: { x: x + 4, y: TOP + rowIndex * ROW_H },
        data: {
          sectionId,
          label: labelFor(sectionId, titleById[sectionId] ?? ''),
          track: col.track,
        },
      })
    })
    columnNodeIds.push(colIds)

    for (let i = 0; i < colIds.length - 1; i += 1) {
      edges.push({
        id: `e-v-${colIds[i]}-${colIds[i + 1]}`,
        source: colIds[i],
        sourceHandle: 'b',
        target: colIds[i + 1],
        targetHandle: 't',
        type: 'smoothstep',
        style: { stroke: '#6b7280', strokeWidth: 2 },
      })
    }
  })

  for (let c = 0; c < columnNodeIds.length - 1; c += 1) {
    const fromCol = columnNodeIds[c]
    const toCol = columnNodeIds[c + 1]
    if (fromCol.length === 0 || toCol.length === 0) continue
    const source = fromCol[fromCol.length - 1]
    const target = toCol[0]
    edges.push({
      id: `e-h-${source}-${target}`,
      source,
      sourceHandle: 'r',
      target,
      targetHandle: 'l',
      type: 'smoothstep',
      style: { stroke: '#9ca3af', strokeWidth: 2 },
    })
  }

  return { nodes, edges }
}
