import { SectionFlowDiagram } from './flow/SectionFlowDiagram.jsx'
import { LibraryCatalog } from './LibraryCatalog.jsx'
import { getFlowDiagram } from '../data/flowDiagrams.js'

export function SectionDetail({ section }) {
  const hasFlow = Boolean(getFlowDiagram(section.id))

  return (
    <article id={section.id} className="doc-section doc-section--panel">
      <h2 className="doc-section__title">{section.title}</h2>
      {hasFlow ? (
        <div className="doc-section__flow">
          <p className="doc-section__flow-hint">
            Topic flow: drag nodes, pan and zoom, minimap and controls.
          </p>
          <SectionFlowDiagram sectionId={section.id} />
        </div>
      ) : null}
      {section.libraryCategories?.length ? (
        <div className="doc-section__catalog">
          <LibraryCatalog categories={section.libraryCategories} />
        </div>
      ) : null}
      <details className="doc-section__details" open={!hasFlow}>
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
