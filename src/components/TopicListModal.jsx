export function TopicListModal({ sections, onPick, onClose }) {
  return (
    <div className="topic-modal" role="dialog" aria-modal="true" aria-label="All topics">
      <button
        type="button"
        className="topic-modal__backdrop"
        aria-label="Close topic list"
        onClick={onClose}
      />
      <div className="topic-modal__sheet">
        <div className="topic-modal__head">
          <h2 className="topic-modal__title">All topics</h2>
          <button type="button" className="topic-modal__close" onClick={onClose}>
            Close
          </button>
        </div>
        <ul className="topic-modal__list">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                className="topic-modal__item"
                onClick={() => onPick(s.id)}
              >
                {s.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
