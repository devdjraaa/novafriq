import { useEffect, useState } from 'react'
import { api } from './api'

/**
 * Les textes du site, groupés par page.
 *
 * Ils ne passent pas par le kit de ressources : ce n'est pas une liste d'objets
 * qu'on crée et supprime, mais un formulaire où l'on modifie des valeurs
 * existantes. Présenter deux cents lignes avec un bouton « supprimer »
 * inviterait à casser l'affichage du site.
 *
 * Les groupes sont des ONGLETS avec compteur : une page unique de deux cents
 * champs est illisible, et sans compteur rien n'indique qu'il y a d'autres
 * rubriques plus loin.
 */
export default function Reglages() {
  const [groupes, setGroupes] = useState([])
  const [reglages, setReglages] = useState({})
  const [actif, setActif] = useState(null)
  const [modifs, setModifs] = useState({})
  const [etat, setEtat] = useState({ chargement: true, envoi: false, message: null, erreur: null })

  useEffect(() => {
    api.reglages()
      .then((r) => {
        setGroupes(r.groupes)
        setReglages(r.reglages)
        setActif(r.groupes[0]?.cle ?? null)
        setEtat((e) => ({ ...e, chargement: false }))
      })
      .catch((e) => setEtat({ chargement: false, envoi: false, message: null, erreur: e.message }))
  }, [])

  const valeurDe = (r) => (r.cle in modifs ? modifs[r.cle] : (r.valeur ?? ''))
  const nbModifs = Object.keys(modifs).length

  const enregistrer = async () => {
    setEtat((e) => ({ ...e, envoi: true, message: null, erreur: null }))
    try {
      await api.enregistrerReglages(modifs)
      // On répercute sur la copie locale : recharger toute la page ferait
      // perdre l'onglet ouvert et la position de lecture.
      setReglages((tout) =>
        Object.fromEntries(
          Object.entries(tout).map(([g, liste]) => [
            g,
            liste.map((r) => (r.cle in modifs ? { ...r, valeur: modifs[r.cle] } : r)),
          ]),
        ),
      )
      setModifs({})
      setEtat({ chargement: false, envoi: false, erreur: null, message: 'Enregistré. Le site affiche déjà les nouveaux textes.' })
    } catch (e) {
      setEtat({ chargement: false, envoi: false, message: null, erreur: e.message })
    }
  }

  if (etat.chargement) return <p className="adm-aide">Chargement…</p>

  const liste = reglages[actif] || []

  return (
    <>
      <div className="adm-tete">
        <div>
          <h1>Textes du site</h1>
          <p>
            Tous les textes affichés sur novafriq.africa. Aucune de ces phrases n'est
            écrite dans le code : ce que vous modifiez ici part sur le site immédiatement.
          </p>
        </div>
      </div>

      {etat.erreur && <div className="adm-bandeau erreur">{etat.erreur}</div>}
      {etat.message && <div className="adm-bandeau succes">{etat.message}</div>}

      <div className="adm-onglets">
        {groupes.map((g) => {
          // Le compteur de modifications non enregistrées par onglet : sans lui,
          // on quitte une page en croyant avoir tout enregistré.
          const enAttente = (reglages[g.cle] || []).filter((r) => r.cle in modifs).length
          return (
            <button
              key={g.cle}
              type="button"
              className={g.cle === actif ? 'actif' : ''}
              onClick={() => setActif(g.cle)}
            >
              {g.libelle}
              <span className="compte">{(reglages[g.cle] || []).length}</span>
              {enAttente > 0 && <span className="compte" style={{ color: 'var(--adm-alerte)' }}>● {enAttente}</span>}
            </button>
          )
        })}
      </div>

      <div className="adm-carte" style={{ padding: 20 }}>
        <div className="adm-grille">
          {liste.map((r) => {
            const long = r.type === 'texte_long' || r.type === 'markdown'
            return (
              <div key={r.cle} className={`adm-groupe${long ? ' pleine' : ''}`}>
                <label className="adm-libelle" htmlFor={`r-${r.cle}`}>{r.libelle}</label>
                {long ? (
                  <textarea
                    id={`r-${r.cle}`}
                    className="adm-zone"
                    rows={3}
                    value={valeurDe(r)}
                    onChange={(e) => setModifs((m) => ({ ...m, [r.cle]: e.target.value }))}
                  />
                ) : (
                  <input
                    id={`r-${r.cle}`}
                    className="adm-champ"
                    value={valeurDe(r)}
                    onChange={(e) => setModifs((m) => ({ ...m, [r.cle]: e.target.value }))}
                  />
                )}
                {r.aide && <p className="adm-aide">{r.aide}</p>}
              </div>
            )
          })}
        </div>
      </div>

      {nbModifs > 0 && (
        <div className="adm-barre-enreg">
          <span className="info">
            <strong>{nbModifs}</strong> texte{nbModifs > 1 ? 's' : ''} modifié{nbModifs > 1 ? 's' : ''},
            pas encore enregistré{nbModifs > 1 ? 's' : ''}.
          </span>
          <button type="button" className="adm-btn" onClick={() => setModifs({})} disabled={etat.envoi}>
            Annuler
          </button>
          <button type="button" className="adm-btn primaire" onClick={enregistrer} disabled={etat.envoi}>
            {etat.envoi ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </div>
      )}
    </>
  )
}
