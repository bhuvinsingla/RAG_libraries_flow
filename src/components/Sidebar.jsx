import { useEffect, useState } from 'react'
import { sections } from '../data/ragContent'

export function Sidebar({ onNavigate }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)

    if (nodes.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id)
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    nodes.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <aside className="site-sidebar" aria-label="Table of contents">
      <div className="site-sidebar__sticky">
        <p className="site-sidebar__heading">Contents</p>
        <nav className="site-sidebar__nav">
          <ul className="site-sidebar__list">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  className={
                    activeId === s.id
                      ? 'site-sidebar__link site-sidebar__link--active'
                      : 'site-sidebar__link'
                  }
                  href={`#${s.id}`}
                  onClick={() => onNavigate?.()}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
