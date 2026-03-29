import { costTierLabels } from '../data/libraryCatalog.js'

export function LibraryCatalog({ categories }) {
  if (!categories?.length) return null

  return (
    <div className="library-catalog">
      {categories.map((cat) => (
        <section key={cat.title} className="library-catalog__block">
          <h3 className="library-catalog__heading">{cat.title}</h3>
          <div className="library-catalog__scroll">
            <table className="library-table">
              <thead>
                <tr>
                  <th scope="col">Library / service</th>
                  <th scope="col">Typical cost model</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {cat.rows.map((row) => (
                  <tr key={row.name}>
                    <td className="library-table__name">{row.name}</td>
                    <td>
                      <span
                        className={`library-tier library-tier--${row.tier}`}
                        title={costTierLabels[row.tier]}
                      >
                        {costTierLabels[row.tier]}
                      </span>
                    </td>
                    <td className="library-table__notes">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  )
}
