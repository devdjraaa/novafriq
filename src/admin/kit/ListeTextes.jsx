/**
 * Une liste de textes courts — les arguments d'un produit, les éléments d'un
 * pôle.
 *
 * Une zone de saisie « une ligne = un élément » aurait été plus simple à
 * écrire, mais elle rend l'ordre invisible et une ligne vide indétectable.
 * Ici chaque élément est une ligne réelle, qu'on ajoute et retire.
 */
export default function ListeTextes({ valeur, onChange, indice }) {
  const items = Array.isArray(valeur) ? valeur : []

  const modifier = (i, v) => onChange(items.map((x, j) => (j === i ? v : x)))
  const retirer = (i) => onChange(items.filter((_, j) => j !== i))
  const ajouter = () => onChange([...items, ''])

  return (
    <div className="adm-lignes">
      {items.map((item, i) => (
        <div className="adm-ligne" key={i}>
          <input
            className="adm-champ"
            value={item}
            placeholder={indice}
            onChange={(e) => modifier(i, e.target.value)}
          />
          <button
            type="button"
            className="adm-btn discret"
            onClick={() => retirer(i)}
            aria-label={`Retirer l'élément ${i + 1}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ))}

      <button type="button" className="adm-btn" onClick={ajouter} style={{ alignSelf: 'flex-start' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Ajouter
      </button>
    </div>
  )
}
