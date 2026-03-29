import { librariesAndCostSection } from './libraryCatalog.js'

/**
 * Guide structure and narrative derived from the attached production RAG reference.
 * Wording expanded for a general audience while staying technically accurate.
 */

export const guideMeta = {
  title: 'Retrieval-Augmented Generation',
  subtitle:
    'A roadmap.sh-style path from concepts to production — click a node to study that stage',
  documentNote:
    'Pan and zoom the roadmap (drag background, scroll to zoom). Click any box to open flows, library costs, and full notes.',
}

export const sections = [
  {
    id: 'what-is-rag',
    title: 'What is Retrieval-Augmented Generation?',
    paragraphs: [
      'Retrieval-Augmented Generation, abbreviated RAG, is a way of building question-answering systems that combine two ideas: looking up relevant information from your own materials, and then asking a large language model to write a careful answer using that information as support.',
      'In everyday terms, imagine a careful researcher. Before answering, they pull the right pages from a filing cabinet, read them, and only then draft a reply that stays faithful to those pages. RAG automates that pattern: software retrieves passages, places them into a structured prompt, and the model generates text that should respect what was retrieved.',
      'The main goals are practical. Organizations want responses that are less likely to invent facts (a failure mode often called hallucination), that can cite private or proprietary documents the model was never trained on, and that can be updated when files change without retraining the entire model.',
    ],
  },
  {
    id: 'architecture',
    title: 'End-to-end architecture',
    paragraphs: [
      'A full RAG system is a pipeline, not a single button. Data moves through ingestion, conversion to clean text, splitting into manageable pieces, embedding into numerical vectors, and storage in a database designed for similarity search. When a user asks a question, the same pipeline runs in reverse on the query side: the question becomes a vector, similar chunks are retrieved, the prompt is augmented with those chunks, and a language model produces the final response.',
      'Conceptually: data sources feed an ingestion layer; parsing and cleaning normalize diverse inputs; chunking and embeddings prepare searchable units; a vector database holds those units. At query time: the user question is embedded, retrieval returns candidate passages, optional reranking improves ordering, the prompt is assembled, the model answers, and downstream features may highlight which sources supported each part of the answer.',
    ],
  },
  {
    id: 'ingestion',
    title: 'Data ingestion layer',
    paragraphs: [
      'Ingestion is how raw information enters the system. Sources may include PDFs, scanned or digital images, audio recordings, video files, structured databases, web pages, and internal APIs. Each source type needs an appropriate connector: file uploads, crawlers, scheduled imports, or event-driven hooks when documents change.',
      'Implementation stacks differ by language but serve the same purpose. For example, a Node.js service might use stream-friendly file handling and HTML parsing libraries, while a Python service might rely on HTTP clients and mature scraping or extraction tooling. The outcome should be a reliable path from “file arrived” to “text and metadata are available for the next stage.”',
    ],
    bulletIntro: 'Common source categories referenced in production designs:',
    bullets: [
      'Documents such as PDFs and office formats',
      'Images that require optical character recognition',
      'Audio and video that must be transcribed',
      'Databases and APIs that expose structured or semi-structured records',
    ],
  },
  {
    id: 'parsing',
    title: 'Parsing layer (including multi-modal content)',
    paragraphs: [
      'Parsing turns heterogeneous inputs into plain text plus metadata. PDF parsing differs from web scraping; images require OCR; audio and video are usually reduced to transcripts. The objective is not only to extract characters but to preserve enough structure—page numbers, section titles, timestamps—that answers can be traced back to evidence.',
      'For images, a typical flow is preprocessing (for clarity), OCR to obtain text, and optional layout analysis so reading order is sensible. For video, practitioners often extract an audio track, transcribe it with a speech model, and align text to time codes. For web content, parsers balance completeness with noise: navigation menus and boilerplate should usually be removed.',
      'A disciplined team defines a unified output schema so every parser yields comparable records. For example, each item might include an identifier, the textual content, and metadata such as source URI, page index, capture time, and original file type. Consistency here simplifies indexing, retrieval, and later auditing.',
    ],
    codeNote:
      'Example shape (conceptual): { id, content, metadata: { source, page?, timestamp?, fileType } }',
    bulletIntro:
      'Reference stacks sometimes cite the following categories of tools (names are illustrative, not endorsements):',
    bullets: [
      'PDF text extraction in Python ecosystems: libraries such as PyMuPDF, pdfplumber, or unstructured-style pipelines; in Node.js, lightweight PDF parsers may be used for text-only extraction.',
      'Image OCR: Python tooling around Tesseract or learning-based OCR, and JavaScript clients such as tesseract.js for browser or server use.',
      'Speech: high-quality transcription models (for example Whisper-class models) via local inference or API, sometimes after isolating audio from video with ffmpeg or similar utilities.',
      'Web: HTML parsing with BeautifulSoup or trafilatura in Python, or cheerio and headless browsing with puppeteer in Node.js when JavaScript-rendered pages must be captured.',
    ],
  },
  {
    id: 'cleaning',
    title: 'Cleaning and normalization',
    paragraphs: [
      'Extracted text is rarely perfect. Headers, footers, page numbers, watermarks, and repeated legal disclaimers can dilute embeddings and confuse retrieval. Cleaning removes or softens that noise.',
      'Normalization standardizes whitespace, line breaks, and sometimes Unicode representations so that the same passage does not appear as multiple unrelated chunks. Optional natural-language processing can normalize casing for specific domains, remove boilerplate phrases, or strip segments that carry no informational value.',
      'The level of cleaning is a trade-off: aggressive rules may delete nuance; permissive rules may retain distracting repetition. Production systems often add logging so operators can inspect what was removed and tune rules with evidence.',
    ],
  },
  {
    id: 'chunking',
    title: 'Chunking (a critical design choice)',
    paragraphs: [
      'Chunking splits long documents into smaller units that fit embedding models and the context window of the generator. If chunks are too large, they may mix unrelated ideas and dilute relevance signals. If they are too small, they may lose context that humans would consider essential.',
      'Three patterns appear often in documentation and practice. Fixed-size chunking uses a steady token or character budget (for example near five hundred tokens per segment). Recursive chunking walks a hierarchy—trying paragraphs first, then sentences, then words—so breaks align with natural seams when possible. Semantic chunking, more sophisticated, groups text by inferred topic boundaries before embedding, which can reduce “mixed-topic” slices at the cost of more preprocessing.',
      'Overlap between adjacent chunks is common. A typical range might be tens to low hundreds of tokens of overlap so that an idea split across a boundary still appears in full in at least one chunk. Interview-style intuition still applies: overlap preserves continuity; identical embedding models for indexing and querying preserve geometry in vector space.',
    ],
    bullets: [
      'Illustrative parameter ranges: chunk sizes often fall between roughly three hundred and one thousand tokens; overlap might sit between about fifty and one hundred fifty tokens, tuned per corpus.',
    ],
  },
  {
    id: 'embeddings',
    title: 'Embeddings',
    paragraphs: [
      'An embedding is a list of numbers—a vector—that represents text in a high-dimensional space. Texts with similar meaning are placed nearer to each other than unrelated texts, as learned by a model trained on large corpora.',
      'Choosing an embedding model is a dependency worth fixing early. Different models yield different geometries; mixing models between indexing and querying breaks retrieval quality. Teams often compare hosted APIs (for example newer compact embedding models designed for retrieval) against open families such as sentence-transformers, measuring retrieval precision on a labeled sample of questions from their domain.',
      'The output is typically a long array of floating-point values. Those vectors are what the vector database indexes for fast approximate nearest-neighbor search.',
    ],
  },
  {
    id: 'vector-db',
    title: 'Vector databases and indexing',
    paragraphs: [
      'A vector database stores embeddings and supports similarity queries at scale. Options include managed engines (for example Pinecone or Weaviate), PostgreSQL with the pgvector extension (sometimes via providers such as Supabase), and in-process libraries such as FAISS for experiments before moving to managed infrastructure.',
      'Behind the scenes, indexing structures such as HNSW (Hierarchical Navigable Small World) graphs enable fast approximate search. The system trades a small amount of recall for large gains in latency, which matters when every user question triggers a search.',
      'Operational concerns include replication, backup, dimension limits per collection, and access control so that sensitive embeddings are not exposed to unauthorized callers.',
    ],
  },
  {
    id: 'query-pipeline',
    title: 'Query pipeline',
    paragraphs: [
      'When a user submits a question, the pipeline embeddings the query using the same model family as the corpus, queries the vector store for the top few similar chunks (top-k), and passes those chunks forward. “Top-k” is a knob: higher k increases recall but adds noise and consumes more of the model context window.',
      'This stage is also where latency budgets are spent. Caching frequent queries, precomputing embeddings for templated questions, or serving smaller models for embedding can all be part of cost and performance planning.',
    ],
  },
  {
    id: 'advanced-retrieval',
    title: 'Advanced retrieval techniques',
    paragraphs: [
      'Dense vector search captures paraphrase and conceptual similarity well but can miss rare exact strings that keyword search finds easily. Hybrid search combines traditional lexical methods such as BM25 with dense retrieval, then merges or reranks results so both precision and recall improve.',
      'Reranking models score each candidate chunk against the question more expensively than the initial vector search but only on a short list. Services and open models exist for this second pass. Query rewriting or expansion generates alternative phrasings of the user question to recover relevant passages even when the user’s wording differs from the document’s wording.',
      'These techniques are optional for prototypes but often necessary when the knowledge base is large, noisy, or full of specialized terminology.',
    ],
  },
  {
    id: 'prompt-augmentation',
    title: 'Prompt augmentation',
    paragraphs: [
      'Augmentation is the step where retrieved text becomes part of the instructions to the model. A common pattern separates roles clearly: the system message sets behavior (for example, “answer from the context only”), a context block lists retrieved passages with labels, and the user message states the question.',
      'Templates should discourage the model from quoting irrelevant retrieved material and should ask for citations or explicit statements when evidence is insufficient. Well-structured prompts reduce the chance that the model fills gaps with speculation.',
    ],
    bullets: [
      'Illustrative template skeleton: expert role statement; a “Context:” section; a “Question:” line; an “Answer:” instruction that requires grounding.',
    ],
  },
  {
    id: 'generation',
    title: 'Generation',
    paragraphs: [
      'The language model reads the augmented prompt and produces natural language. Quality depends on the model, the clarity of instructions, the fidelity of retrieval, and the size of the context window. Reasoning-capable models may chain steps internally, but the external contract remains: the visible answer should be justified by retrieved sources unless the product explicitly allows general knowledge.',
      'Operators monitor not only textual quality but also token usage, latency, and failure modes such as refusals or empty responses when context is contradictory.',
    ],
  },
  {
    id: 'source-highlighting',
    title: 'Highlighting and provenance',
    paragraphs: [
      'Production systems often expose provenance: which page, timestamp, or chunk identifier supported a sentence in the answer. That requires retaining metadata through retrieval and mapping spans in the generated text back to source passages where feasible.',
      'For PDFs, highlighting might mean page and paragraph references. For video, time ranges in the transcript. Proof-of-concept demos frequently emphasize this feature because it builds trust with subject-matter experts who must verify outputs.',
    ],
  },
  {
    id: 'evaluation',
    title: 'Evaluation',
    paragraphs: [
      'RAG systems should be measured beyond subjective reading. Relevance asks whether retrieved passages match the question. Faithfulness asks whether the answer is supported by those passages rather than invented. Latency and cost matter for user experience and budgets.',
      'Frameworks and benchmarks exist to automate parts of this process—for example RAG-oriented evaluation toolkits are used to score batches of question–answer pairs. Teams also maintain golden sets of questions with expected citations for regression testing after model or pipeline changes.',
    ],
  },
  {
    id: 'deployment',
    title: 'Deployment architecture (illustrative)',
    paragraphs: [
      'A typical layered deployment separates concerns. A React (or other) front end talks to a Node API responsible for authentication, orchestration, and rate limits. Behind that API, a Python or polyglot service may own heavy parsing, embedding batches, and integrations with storage. The vector database sits close to that service on the network, and the language model is invoked via a managed API or self-hosted endpoint.',
      'This separation allows independent scaling: web traffic, embedding workers, and model inference often have different resource profiles.',
    ],
  },
  {
    id: 'production',
    title: 'Production concerns',
    paragraphs: [
      'Beyond correctness, production demands caching (for example with Redis) to absorb repeated queries, rate limiting to protect cost and availability, careful handling of personally identifiable information, and access control aligned with document permissions. A user who may not read a file in the source system should not receive it through RAG.',
      'Monitoring should cover ingestion failures, embedding queue depth, search latency, model errors, and data drift when document collections change character over time.',
    ],
  },
  {
    id: 'advanced-rag',
    title: 'Advanced directions',
    paragraphs: [
      'Research and industry continue to extend the basic pattern. Graph RAG enriches retrieval with relationships between entities—useful when answers require connecting facts scattered across many documents. Agentic and multi-agent designs let systems iteratively retrieve, critique, and refine answers, sometimes calling tools or external APIs under policy constraints.',
      'These approaches grow complexity and operational cost; they are most appropriate when baseline RAG is already reliable and product requirements demand deeper reasoning or automation.',
    ],
  },
  {
    id: 'key-points',
    title: 'Key concepts to remember',
    paragraphs: [
      'Several design choices recur in discussion and interviews because they materially affect outcomes.',
    ],
    bullets: [
      'Chunk overlap helps preserve continuity when an idea spans a boundary.',
      'Using the same embedding approach for indexing and querying keeps vector geometry consistent.',
      'Hybrid search combines strengths of keyword and semantic retrieval, often improving both recall and precision.',
    ],
  },
  librariesAndCostSection,
  {
    id: 'summary',
    title: 'Summary',
    paragraphs: [
      'RAG is not merely “search plus a chatbot.” It is an integrated discipline spanning data engineering, parsing, information retrieval, prompt design, model serving, and governance. Mastering the full pipeline—not only the final language model call—is what distinguishes production-grade intelligent assistants from improvised prototypes.',
    ],
  },
]
