import { Icone, NOMS_ICONES } from './icones'

/**
 * Choix d'une icône dans la bibliothèque du site.
 *
 * On MONTRE les icônes plutôt que de lister leurs noms : « couches » ou
 * « pouls » ne dit rien tant qu'on ne l'a pas vu, et un éditeur qui doit
 * deviner finit par toutes les essayer.
 */
export default function ChoixIcone({ valeur, onChange }) {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {NOMS_ICONES.map((nom) => (
          <button
            key={nom}
            type="button"
            title={nom}
            aria-label={nom}
            aria-pressed={valeur === nom}
            onClick={() => onChange(valeur === nom ? null : nom)}
            className="adm-btn"
            style={{
              padding: 7,
              borderColor: valeur === nom ? 'var(--adm-accent)' : 'var(--adm-bord)',
              background: valeur === nom ? '#DFF6F9' : 'var(--adm-carte)',
              color: valeur === nom ? 'var(--adm-accent-sombre)' : 'var(--adm-doux)',
            }}
          >
            <Icone nom={nom} taille={19} />
          </button>
        ))}
      </div>
      <p className="adm-aide">
        {valeur ? `Icône choisie : ${valeur}` : 'Aucune icône — la vignette restera vide sur le site.'}
      </p>
    </div>
  )
}
