import ChoixImage from './ChoixImage'
import ChoixIcone from './ChoixIcone'
import ListeTextes from './ListeTextes'

/**
 * Un champ de formulaire, choisi d'après sa DÉCLARATION.
 *
 * C'est le cœur du principe : l'écran ne décide pas comment afficher un champ,
 * il lit son type. Ajouter un type de contenu ne demande donc aucune ligne
 * d'affichage, et deux champs du même type ne peuvent pas diverger — la
 * recopie de styles d'un écran à l'autre avait produit quatre variantes du même
 * champ sur Gextimo.
 */
export default function Champ({ def, valeur, onChange, erreur }) {
  const id = `champ-${def.nom}`
  const commun = {
    id,
    value: valeur ?? '',
    onChange: (e) => onChange(e.target.value),
    'aria-invalid': erreur ? 'true' : undefined,
    'aria-describedby': erreur ? `${id}-err` : def.aide ? `${id}-aide` : undefined,
  }

  let controle

  switch (def.type) {
    case 'texte_long':
      controle = <textarea {...commun} className="adm-zone" rows={def.lignes || 4} placeholder={def.indice} />
      break

    case 'markdown':
      controle = <textarea {...commun} className="adm-zone" rows={def.lignes || 14} placeholder={def.indice} style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13 }} />
      break

    case 'liste':
      controle = (
        <select {...commun} className="adm-liste">
          {!def.requis && <option value="">—</option>}
          {(def.options || []).map((o) => (
            <option key={o.valeur} value={o.valeur}>{o.libelle}</option>
          ))}
        </select>
      )
      break

    case 'booleen':
      return (
        <div className="adm-groupe">
          <label className="adm-bascule">
            <input
              type="checkbox"
              checked={!!valeur}
              onChange={(e) => onChange(e.target.checked)}
            />
            <span className="piste" />
            <span>{def.libelle}</span>
          </label>
          {def.aide && <p className="adm-aide" id={`${id}-aide`}>{def.aide}</p>}
        </div>
      )

    case 'nombre':
      controle = <input {...commun} type="number" className="adm-champ" min={def.min} max={def.max} />
      break

    case 'date':
      controle = (
        <input
          id={id}
          type="datetime-local"
          className="adm-champ"
          // Le serveur parle ISO, le champ attend « AAAA-MM-JJThh:mm ».
          // Sans cette coupe, le champ reste vide sur une valeur pourtant
          // présente — et l'éditeur croit avoir perdu sa date.
          value={valeur ? String(valeur).slice(0, 16) : ''}
          onChange={(e) => onChange(e.target.value || null)}
        />
      )
      break

    case 'image':
      controle = <ChoixImage valeur={valeur} onChange={onChange} />
      break

    case 'icone':
      controle = <ChoixIcone valeur={valeur} onChange={onChange} />
      break

    case 'textes':
      controle = <ListeTextes valeur={valeur} onChange={onChange} indice={def.indice} />
      break

    default:
      controle = <input {...commun} type={def.html || 'text'} className="adm-champ" placeholder={def.indice} autoComplete={def.autocomplete || 'off'} />
  }

  return (
    <div className={`adm-groupe${def.pleine ? ' pleine' : ''}`}>
      <label className="adm-libelle" htmlFor={id}>
        {def.libelle}
        {def.requis && <span className="requis" aria-hidden="true">*</span>}
      </label>
      {controle}
      {erreur
        ? <p className="adm-erreur" id={`${id}-err`}>{erreur}</p>
        : def.aide && <p className="adm-aide" id={`${id}-aide`}>{def.aide}</p>}
    </div>
  )
}
