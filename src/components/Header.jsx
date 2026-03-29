import { guideMeta } from '../data/ragContent'

export function Header({ onOpenTopics }) {
  return (
    <header className="site-header site-header--roadmap" role="banner">
      <div className="site-header__inner site-header__inner--roadmap">
        <div className="site-header__titles">
          <h1 className="site-header__title">{guideMeta.title}</h1>
          {/* <p className="site-header__subtitle">{guideMeta.subtitle}</p> */}
        </div>
        {onOpenTopics ? (
          <button
            type="button"
            className="site-header__topics-btn"
            onClick={onOpenTopics}
          >
            All topics
          </button>
        ) : null}
      </div>
    </header>
  )
}
