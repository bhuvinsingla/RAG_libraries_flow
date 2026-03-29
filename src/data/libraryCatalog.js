/**
 * Typical cost / license posture for tools named in this guide.
 * Pricing and terms change; always confirm on the vendor or project site before procurement.
 *
 * tier: 'free' | 'freemium' | 'paid' | 'mixed'
 */

export const costTierLabels = {
  free: 'Open source / self-host',
  freemium: 'Free tier + paid plans',
  paid: 'Paid (API, cloud, or license)',
  mixed: 'Mixed (OSS + paid options)',
}

/** @type {{ id: string; title: string; paragraphs: string[]; libraryCategories: { title: string; rows: { name: string; tier: keyof typeof costTierLabels; notes: string }[] }[] }}} */
export const librariesAndCostSection = {
  id: 'libraries-and-cost',
  title: 'Libraries, services, and typical cost',
  paragraphs: [
    'The tables below list libraries and services commonly referenced when building RAG systems. “Cost” describes the usual economic model, not a price quote. Open-source software may still require a commercial license depending on how you distribute or host it (for example AGPL). Cloud products often charge by storage, queries, or tokens. Verify current terms on each project or vendor website.',
    'This UI stack uses React, Vite, and React Flow (@xyflow/react)—all commonly used under permissive open-source licenses for building front ends and diagrams.',
  ],
  libraryCategories: [
    {
      title: 'Ingestion (Node.js ecosystem)',
      rows: [
        {
          name: 'multer',
          tier: 'free',
          notes: 'MIT-style OSS; file upload middleware for Express. No usage fee; you pay for your own servers.',
        },
        {
          name: 'Node fs / streams',
          tier: 'free',
          notes: 'Built into Node; no license fee for your runtime beyond infrastructure.',
        },
        {
          name: 'pdf-parse',
          tier: 'free',
          notes: 'Common npm PDF text extraction; check package license on npm (often MIT).',
        },
      ],
    },
    {
      title: 'Ingestion & HTTP (Python)',
      rows: [
        {
          name: 'requests',
          tier: 'free',
          notes: 'Apache-2.0; HTTP client. Costs are only compute and egress you incur.',
        },
        {
          name: 'Scrapy',
          tier: 'free',
          notes: 'BSD-3-Clause crawling framework; self-hosted scraping has infra cost only.',
        },
      ],
    },
    {
      title: 'PDF & document parsing (Python)',
      rows: [
        {
          name: 'PyMuPDF (fitz)',
          tier: 'mixed',
          notes: 'AGPL-3.0 open core; commercial license from Artifex for many proprietary deployments. Read license before production.',
        },
        {
          name: 'pdfplumber',
          tier: 'free',
          notes: 'MIT; PDF table/text extraction. Self-host; no per-page API fee.',
        },
        {
          name: 'Unstructured',
          tier: 'mixed',
          notes: 'Apache-2.0 OSS libraries; vendor also offers hosted APIs and enterprise features (typically paid).',
        },
      ],
    },
    {
      title: 'OCR & images',
      rows: [
        {
          name: 'Tesseract / pytesseract',
          tier: 'free',
          notes: 'Apache-2.0 OCR engine; local inference is free aside from hardware.',
        },
        {
          name: 'EasyOCR',
          tier: 'free',
          notes: 'Apache-2.0; deep-learning OCR. GPU infra may add cost.',
        },
        {
          name: 'OpenCV',
          tier: 'free',
          notes: 'Apache-2.0; preprocessing and vision utilities.',
        },
        {
          name: 'tesseract.js',
          tier: 'free',
          notes: 'Apache-2.0; OCR in browser or Node; no vendor API fee unless you wrap it in paid hosting.',
        },
      ],
    },
    {
      title: 'Speech, audio, and video',
      rows: [
        {
          name: 'OpenAI Whisper (model, local)',
          tier: 'free',
          notes: 'Model weights released under MIT; running locally costs only compute.',
        },
        {
          name: 'Whisper API (OpenAI or others)',
          tier: 'paid',
          notes: 'Usage-priced transcription APIs; billed by audio duration or tokens.',
        },
        {
          name: 'speech_recognition (Python)',
          tier: 'free',
          notes: 'Library wrapping various engines; underlying cloud engines may be paid.',
        },
        {
          name: 'ffmpeg',
          tier: 'free',
          notes: 'LGPL/GPL build-dependent; widely used for audio/video extraction. Compliance review for distribution.',
        },
        {
          name: 'MoviePy',
          tier: 'free',
          notes: 'MIT; video editing/transcoding in Python; ffmpeg often a backend dependency.',
        },
      ],
    },
    {
      title: 'Web content',
      rows: [
        {
          name: 'BeautifulSoup',
          tier: 'free',
          notes: 'MIT; HTML parsing.',
        },
        {
          name: 'trafilatura',
          tier: 'free',
          notes: 'Apache-2.0 / GPL dual-licensed depending on package variant—confirm for your use case.',
        },
        {
          name: 'cheerio',
          tier: 'free',
          notes: 'MIT; server-side jQuery-like HTML parsing in Node.',
        },
        {
          name: 'Puppeteer',
          tier: 'free',
          notes: 'Apache-2.0; headless Chrome automation. You pay for browsers, memory, and any proxy infrastructure.',
        },
      ],
    },
    {
      title: 'Cleaning & NLP',
      rows: [
        {
          name: 'NLTK',
          tier: 'free',
          notes: 'Apache-2.0; corpora may have separate licenses.',
        },
        {
          name: 'spaCy',
          tier: 'mixed',
          notes: 'MIT library; Explosion offers paid Prodigy annotation and support. Models are free to use with spaCy.',
        },
        {
          name: 'Regular expressions (built-in)',
          tier: 'free',
          notes: 'No third-party cost.',
        },
      ],
    },
    {
      title: 'Embeddings',
      rows: [
        {
          name: 'OpenAI text-embedding-3 (and similar APIs)',
          tier: 'paid',
          notes: 'Usage-based pricing per tokens embedded; requires API key and network egress policies.',
        },
        {
          name: 'sentence-transformers',
          tier: 'free',
          notes: 'Apache-2.0; run models locally or on your GPUs—cost is infrastructure only.',
        },
        {
          name: 'Other cloud embedding APIs (Cohere, Voyage, etc.)',
          tier: 'paid',
          notes: 'Generally metered; many offer small free tiers for development.',
        },
      ],
    },
    {
      title: 'Vector databases & similarity search',
      rows: [
        {
          name: 'FAISS (Meta)',
          tier: 'free',
          notes: 'MIT; in-process or self-hosted index library; you manage persistence and scaling.',
        },
        {
          name: 'pgvector (PostgreSQL extension)',
          tier: 'free',
          notes: 'Open-source extension; hosting cost depends on RDS/managed Postgres or Supabase tier.',
        },
        {
          name: 'Supabase (hosted Postgres + pgvector)',
          tier: 'freemium',
          notes: 'Generous free tier for prototypes; production workloads move to paid plans.',
        },
        {
          name: 'Pinecone',
          tier: 'freemium',
          notes: 'Managed vector DB; free starter capacity with paid tiers at scale.',
        },
        {
          name: 'Weaviate',
          tier: 'mixed',
          notes: 'BSD-3-Clause open-source; Weaviate Cloud and enterprise support are paid.',
        },
      ],
    },
    {
      title: 'Lexical search & hybrid retrieval',
      rows: [
        {
          name: 'BM25 (algorithm; e.g. rank_bm25, Lucene, Elasticsearch)',
          tier: 'mixed',
          notes: 'Algorithms and many libraries are free; managed search services (Elastic Cloud, etc.) are paid.',
        },
      ],
    },
    {
      title: 'Reranking & query expansion',
      rows: [
        {
          name: 'Cohere Rerank (API)',
          tier: 'paid',
          notes: 'Commercial reranking API; often usage-priced; promotional credits may apply.',
        },
        {
          name: 'Open-source cross-encoders (e.g. sentence-transformers rerankers)',
          tier: 'free',
          notes: 'Run locally; pay only for GPUs/CPUs.',
        },
      ],
    },
    {
      title: 'Generation (LLMs)',
      rows: [
        {
          name: 'OpenAI, Anthropic, Google Gemini, Azure OpenAI, etc.',
          tier: 'paid',
          notes: 'Token-based or subscription; enterprise agreements vary. Some models expose limited free tiers for testing.',
        },
        {
          name: 'Self-hosted open weights (Llama, Mistral, etc.)',
          tier: 'mixed',
          notes: 'Weights often free for qualified use; hardware, electricity, and compliance are your costs. Some licenses restrict certain commercial uses.',
        },
      ],
    },
    {
      title: 'Evaluation',
      rows: [
        {
          name: 'RAGAS',
          tier: 'free',
          notes: 'Apache-2.0 evaluation framework; if you call external LLMs for scoring, those calls are usually paid.',
        },
      ],
    },
    {
      title: 'Production infrastructure',
      rows: [
        {
          name: 'Redis (OSS)',
          tier: 'free',
          notes: 'BSD-3-Clause; self-managed. Managed Redis (ElastiCache, Redis Cloud) is paid by instance size.',
        },
        {
          name: 'React',
          tier: 'free',
          notes: 'MIT UI library.',
        },
        {
          name: 'Vite',
          tier: 'free',
          notes: 'MIT build tool.',
        },
        {
          name: '@xyflow/react (React Flow)',
          tier: 'free',
          notes: 'MIT / xyflow ecosystem; diagrams in this application.',
        },
      ],
    },
  ],
}
