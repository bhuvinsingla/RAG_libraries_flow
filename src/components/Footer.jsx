export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__inner">
        <p className="site-footer__primary">
          Institutional knowledge, responsibly retrieved and clearly attributed.
        </p>
        <p className="site-footer__meta">
          Content aligned with production RAG pipeline documentation.
          <span className="site-footer__sep" aria-hidden="true">
            {' '}
            ·{' '}
          </span>
          <span className="site-footer__copy">© {year}</span>
        </p>
      </div>
    </footer>
  )
}
