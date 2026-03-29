import { useState } from 'react'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Sidebar } from './components/Sidebar.jsx'
import { SectionFlowDiagram } from './components/flow/SectionFlowDiagram.jsx'
import { LibraryCatalog } from './components/LibraryCatalog.jsx'
import { getFlowDiagram } from './data/flowDiagrams.js'
import { guideMeta, sections } from './data/ragContent.js'
import './App.css'

function SectionBlock({ section }) {
  const hasFlow = Boolean(getFlowDiagram(section.id))

  return (
    <article id={section.id} className="doc-section">
      <h2 className="doc-section__title">{section.title}</h2>
      {hasFlow ? (
        <div className="doc-section__flow">
          <p className="doc-section__flow-hint">
            Interactive flow: drag nodes, pan and zoom (scroll), use the
            minimap and corner controls.
          </p>
          <SectionFlowDiagram sectionId={section.id} />
        </div>
      ) : null}
      {section.libraryCategories?.length ? (
        <div className="doc-section__catalog">
          <LibraryCatalog categories={section.libraryCategories} />
        </div>
      ) : null}
      <details
        className="doc-section__details"
        open={!hasFlow}
      >
        <summary className="doc-section__summary">
          {hasFlow ? 'Full written explanation' : 'Details'}
        </summary>
        <div className="doc-section__details-body">
          {section.paragraphs.map((p, i) => (
            <p key={`${section.id}-p-${i}`} className="doc-section__p">
              {p}
            </p>
          ))}
          {section.bulletIntro ? (
            <p className="doc-section__p doc-section__p--intro">
              {section.bulletIntro}
            </p>
          ) : null}
          {section.bullets?.length ? (
            <ul className="doc-section__list">
              {section.bullets.map((b, i) => (
                <li key={`${section.id}-b-${i}`}>{b}</li>
              ))}
            </ul>
          ) : null}
          {section.codeNote ? (
            <p className="doc-section__code-note">
              <code>{section.codeNote}</code>
            </p>
          ) : null}
        </div>
      </details>
    </article>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app">
      <Header />

      <div className="app__toolbar">
        <button
          type="button"
          className="app__menu-btn"
          aria-expanded={menuOpen}
          aria-controls="sidebar-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? 'Close contents' : 'Open contents'}
        </button>
      </div>

      <div className="app__shell">
        <div
          id="sidebar-nav"
          className={`app__sidebar-wrap ${menuOpen ? 'app__sidebar-wrap--open' : ''}`}
        >
          <Sidebar onNavigate={() => setMenuOpen(false)} />
        </div>
        {menuOpen ? (
          <button
            type="button"
            className="app__overlay"
            aria-label="Close table of contents"
            onClick={() => setMenuOpen(false)}
          />
        ) : null}

        <main className="app__main" role="main">
          <div className="app__main-inner">
            <p className="doc-preface">{guideMeta.documentNote}</p>
            {sections.map((section) => (
              <SectionBlock key={section.id} section={section} />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
