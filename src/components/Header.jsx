import { guideMeta } from '../data/ragContent'

export function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="site-header__inner">
        <div className="site-header__titles">
          <p className="site-header__kicker">Technical reference guide</p>
          <h1 className="site-header__title">{guideMeta.title}</h1>
          <p className="site-header__subtitle">{guideMeta.subtitle}</p>
        </div>
      </div>
    </header>
  )
}
