import { useState } from 'react'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { SectionDetail } from './components/SectionDetail.jsx'
import { TopicListModal } from './components/TopicListModal.jsx'
import { RagRoadmap } from './components/roadmap/RagRoadmap.jsx'
import { guideMeta, sections } from './data/ragContent.js'
import './App.css'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)
  const [topicMenuOpen, setTopicMenuOpen] = useState(false)

  const selectedSection = selectedId
    ? sections.find((s) => s.id === selectedId)
    : null

  return (
    <div className="app app--roadmap">
      <Header onOpenTopics={() => setTopicMenuOpen(true)} />

      <p className="app__roadmap-hint">{guideMeta.documentNote}</p>

      <main className="app__roadmap-main" role="main">
        <RagRoadmap sections={sections} onSelectTopic={setSelectedId} />
      </main>

      {topicMenuOpen ? (
        <TopicListModal
          sections={sections}
          onPick={(id) => {
            setSelectedId(id)
            setTopicMenuOpen(false)
          }}
          onClose={() => setTopicMenuOpen(false)}
        />
      ) : null}

      {selectedSection ? (
        <>
          <button
            type="button"
            className="topic-panel__backdrop"
            aria-label="Close topic panel"
            onClick={() => setSelectedId(null)}
          />
          <aside className="topic-panel" aria-labelledby="topic-panel-title">
            <div className="topic-panel__toolbar">
              <button
                type="button"
                className="topic-panel__dismiss"
                onClick={() => setSelectedId(null)}
              >
                ← Back to roadmap
              </button>
            </div>
            <h2 id="topic-panel-title" className="visually-hidden">
              {selectedSection.title}
            </h2>
            <div className="topic-panel__scroll">
              <SectionDetail section={selectedSection} />
            </div>
          </aside>
        </>
      ) : null}

      <Footer />
    </div>
  )
}
