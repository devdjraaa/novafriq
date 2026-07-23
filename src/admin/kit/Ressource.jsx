import { useCallback, useEffect, useRef, useState } from 'react'
import { api } from '../api'
import Champ from './Champ'
import Modale from './Modale'

/**
 * L'écran générique d'une ressource.
 *
 * C'est ce qui rend le kit « façon Filament » : on ne code pas un écran par
 * type de contenu, on DÉCLARE une ressource et la liste, le formulaire, la
 * recherche, les filtres, le réordonnancement et la suppression en découlent.
 *
 * Conséquence voulue : un défaut corrigé ici disparaît partout à la fois, et
 * un nouveau type de contenu ne peut pas oublier un garde-fou que les autres
 * appliquent.
 */
export default function Ressource({ def }) {
  const [donnees, setDonnees] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [recherche, setRecherche] = useState('')
  const [filtres, setFiltres] = useState({})
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  const [edite, setEdite] = useState(null)   // objet en cours, ou {} pour une création
  const [aSupprimer, setASupprimer] = useState(null)

  const charger = useCallback(async () => {
    setChargement(true)
    setErreur(null)
    try {
      const r = await api.lister(def.cle, { page, q: recherche, ...filtres, ...(def.parametres || {}) })
      setDonnees(r.donnees)
      setTotal(r.total)
      setPages(r.pages)
    } catch (e) {
      setErreur(e.message)
    } finally {
      setChargement(false)
    }
  }, [def.cle, def.parametres, page, recherche, filtres])

  // La recherche attend que la frappe s'arrête : une requête par caractère
  // ferait revenir les réponses dans le désordre, et l'affichage sauterait.
  useEffect(() => {
    const t = setTimeout(charger, recherche ? 300 : 0)
    return () => clearTimeout(t)
  }, [charger, recherche])

  return (
    <>
      <div className="adm-tete">
        <div>
          <h1>{def.titre}</h1>
          {def.description && <p>{def.description}</p>}
        </div>
        {!def.lectureSeule && (
          <div className="actions">
            <button type="button" className="adm-btn primaire" onClick={() => setEdite({})}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              {def.libelleCreation || 'Ajouter'}
            </button>
          </div>
        )}
      </div>

      {erreur && <div className="adm-bandeau erreur">{erreur}</div>}

      <div className="adm-outils">
        <input
          className="adm-champ recherche"
          type="search"
          placeholder={`Rechercher dans ${def.titre.toLowerCase()}…`}
          value={recherche}
          onChange={(e) => { setPage(1); setRecherche(e.target.value) }}
        />
        {(def.filtres || []).map((f) => (
          <select
            key={f.champ}
            className="adm-filtre"
            value={filtres[f.champ] ?? ''}
            onChange={(e) => {
              setPage(1)
              setFiltres((x) => {
                const suite = { ...x }
                if (e.target.value === '') delete suite[f.champ]
                else suite[f.champ] = e.target.value
                return suite
              })
            }}
          >
            <option value="">{f.libelle}</option>
            {f.options.map((o) => (
              <option key={o.valeur} value={o.valeur}>{o.libelle}</option>
            ))}
          </select>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12.5, color: 'var(--adm-doux)' }}>
          {total} élément{total > 1 ? 's' : ''}
        </span>
      </div>

      <Tableau
        def={def}
        donnees={donnees}
        chargement={chargement}
        onEditer={setEdite}
        onSupprimer={setASupprimer}
        onReordonner={async (ids) => {
          const avant = donnees
          setDonnees(ids.map((id) => donnees.find((d) => d.id === id)))
          try {
            await api.reordonner(def.cle, ids)
          } catch (e) {
            // On remet l'ordre précédent : laisser l'écran afficher un ordre
            // que le serveur a refusé ferait croire l'inverse de la vérité.
            setDonnees(avant)
            setErreur(e.message)
          }
        }}
      />

      {pages > 1 && (
        <div className="adm-pagination">
          <button className="adm-btn discret" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Précédent</button>
          <span>Page {page} sur {pages}</span>
          <button className="adm-btn discret" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Suivant</button>
        </div>
      )}

      {edite && (
        <Formulaire
          def={def}
          objet={edite}
          onFermer={() => setEdite(null)}
          onEnregistre={() => { setEdite(null); charger() }}
        />
      )}

      {aSupprimer && (
        <Confirmation
          def={def}
          objet={aSupprimer}
          onFermer={() => setASupprimer(null)}
          onSupprime={() => { setASupprimer(null); charger() }}
        />
      )}
    </>
  )
}

/* ── Tableau ─────────────────────────────────────────────────────────────── */

function Tableau({ def, donnees, chargement, onEditer, onSupprimer, onReordonner }) {
  const tire = useRef(null)

  if (chargement) {
    return <div className="adm-carte"><div className="adm-vide">Chargement…</div></div>
  }

  if (!donnees.length) {
    return (
      <div className="adm-carte">
        <div className="adm-vide">
          <strong>{def.vide?.titre || 'Rien pour le moment'}</strong>
          {def.vide?.texte || 'Les éléments ajoutés apparaîtront ici.'}
        </div>
      </div>
    )
  }

  const deposer = (cible) => {
    const depart = tire.current
    tire.current = null
    if (!depart || depart === cible) return
    const ids = donnees.map((d) => d.id)
    const i = ids.indexOf(depart)
    const j = ids.indexOf(cible)
    ids.splice(j, 0, ids.splice(i, 1)[0])
    onReordonner(ids)
  }

  return (
    <div className="adm-carte">
      <div className="adm-defile">
        <table className="adm-tableau">
          <thead>
            <tr>
              {def.reordonnable && <th aria-label="Ordre" />}
              {def.colonnes.map((c) => <th key={c.champ}>{c.libelle}</th>)}
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donnees.map((ligne) => (
              <tr
                key={ligne.id}
                draggable={def.reordonnable}
                onDragStart={() => { tire.current = ligne.id }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => deposer(ligne.id)}
              >
                {def.reordonnable && (
                  <td className="poignee" title="Glisser pour réordonner">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <circle cx="9" cy="6" r="1.6" /><circle cx="15" cy="6" r="1.6" />
                      <circle cx="9" cy="12" r="1.6" /><circle cx="15" cy="12" r="1.6" />
                      <circle cx="9" cy="18" r="1.6" /><circle cx="15" cy="18" r="1.6" />
                    </svg>
                  </td>
                )}

                {def.colonnes.map((c) => (
                  <td key={c.champ} className={c.principal ? 'principal' : c.coupe ? 'coupe' : undefined}>
                    <Cellule colonne={c} ligne={ligne} />
                  </td>
                ))}

                <td className="actions">
                  <button type="button" className="adm-btn discret" onClick={() => onEditer(ligne)}>
                    {def.lectureSeule ? 'Ouvrir' : 'Modifier'}
                  </button>
                  {!def.suppressionInterdite && (
                    <button type="button" className="adm-btn discret" style={{ color: 'var(--adm-danger)' }} onClick={() => onSupprimer(ligne)}>
                      Supprimer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Cellule({ colonne, ligne }) {
  const brut = colonne.champ.split('.').reduce((o, k) => o?.[k], ligne)

  if (colonne.rendu) return colonne.rendu(ligne)

  if (colonne.type === 'booleen') {
    return <span className={`adm-etiquette ${brut ? 'vert' : 'gris'}`}>{brut ? 'Oui' : 'Non'}</span>
  }

  if (colonne.type === 'etiquette') {
    const o = (colonne.options || []).find((x) => x.valeur === brut)
    return <span className={`adm-etiquette ${o?.couleur || 'gris'}`}>{o?.libelle || brut || '—'}</span>
  }

  if (colonne.type === 'image') {
    return brut
      ? <img src={brut} alt="" style={{ width: 38, height: 38, borderRadius: 8, objectFit: 'cover' }} />
      : <span style={{ color: 'var(--adm-faible)' }}>—</span>
  }

  if (colonne.type === 'date') {
    return brut
      ? new Date(brut).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
      : <span style={{ color: 'var(--adm-faible)' }}>—</span>
  }

  if (brut === null || brut === undefined || brut === '') {
    return <span style={{ color: 'var(--adm-faible)' }}>—</span>
  }

  return String(brut)
}

/* ── Formulaire ──────────────────────────────────────────────────────────── */

/** Lit et écrit un champ imbriqué (« donnees.items ») aussi bien qu'un champ plat. */
const lireChemin = (objet, chemin) => chemin.split('.').reduce((o, k) => o?.[k], objet)

function ecrireChemin(cible, chemin, valeur) {
  const cles = chemin.split('.')
  const derniere = cles.pop()
  let noeud = cible
  for (const k of cles) {
    // On recrée le nœud s'il manque : sinon écrire « donnees.items » sur un
    // objet qui n'a pas encore de `donnees` perdrait la valeur en silence.
    if (typeof noeud[k] !== 'object' || noeud[k] === null) noeud[k] = {}
    noeud = noeud[k]
  }
  noeud[derniere] = valeur
}

function Formulaire({ def, objet, onFermer, onEnregistre }) {
  const nouveau = !objet.id
  const [valeurs, setValeurs] = useState(() => {
    const depart = {}
    for (const c of def.champs) {
      if (c.type === 'section') continue
      const existant = lireChemin(objet, c.nom)
      depart[c.nom] = existant ?? c.defaut
        ?? (c.type === 'booleen' ? false : c.type === 'textes' ? [] : '')
    }
    return depart
  })
  const [erreurs, setErreurs] = useState({})
  const [message, setMessage] = useState(null)
  const [envoi, setEnvoi] = useState(false)

  const enregistrer = async (e) => {
    e.preventDefault()
    setEnvoi(true)
    setErreurs({})
    setMessage(null)

    // Les chemins imbriqués sont recomposés en objets avant l'envoi : le
    // serveur attend `donnees: { items: [...] }`, pas une clé littérale
    // « donnees.items » — qu'il ignorerait sans rien dire.
    const charge = {}
    for (const [chemin, v] of Object.entries(valeurs)) ecrireChemin(charge, chemin, v)

    try {
      if (nouveau) await api.creer(def.cle, charge)
      else await api.modifier(def.cle, objet.id, charge)
      onEnregistre()
    } catch (err) {
      // Les messages du serveur sont posés SOUS leur champ. Un bandeau global
      // « des erreurs sont survenues » oblige à chercher lequel.
      setErreurs(Object.fromEntries(Object.entries(err.erreurs || {}).map(([k, v]) => [k, v[0]])))
      setMessage(Object.keys(err.erreurs || {}).length ? 'Corrigez les champs signalés.' : err.message)
    } finally {
      setEnvoi(false)
    }
  }

  // Les champs marqués `cache` portent une valeur imposée (la collection d'une
  // liste, par exemple) : elle part au serveur sans encombrer le formulaire.
  const champs = def.champs.filter((c) => !c.cache)

  return (
    <Modale
      titre={nouveau ? `${def.libelleCreation || 'Ajouter'}` : def.titreEdition?.(objet) || `Modifier — ${objet[def.champTitre || 'nom'] || ''}`}
      taille={def.tailleModale || 'lg'}
      onFermer={onFermer}
      pied={
        <>
          <button type="button" className="adm-btn" onClick={onFermer}>Annuler</button>
          <button type="submit" form="adm-formulaire" className="adm-btn primaire" disabled={envoi}>
            {envoi ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </>
      }
    >
      {message && <div className="adm-bandeau erreur">{message}</div>}

      {def.lectureSeule && def.apercu && (
        <div style={{ marginBottom: 16 }}>{def.apercu(objet)}</div>
      )}

      <form id="adm-formulaire" onSubmit={enregistrer} className="adm-grille">
        {champs.map((c) =>
          c.type === 'section' ? (
            <div key={c.libelle} className="adm-section">{c.libelle}</div>
          ) : (
            <Champ
              key={c.nom}
              def={c}
              valeur={valeurs[c.nom]}
              erreur={erreurs[c.nom]}
              onChange={(v) => setValeurs((x) => ({ ...x, [c.nom]: v }))}
            />
          ),
        )}
      </form>
    </Modale>
  )
}

/* ── Suppression ─────────────────────────────────────────────────────────── */

function Confirmation({ def, objet, onFermer, onSupprime }) {
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState(null)

  const supprimer = async () => {
    setEnvoi(true)
    setErreur(null)
    try {
      await api.supprimer(def.cle, objet.id)
      onSupprime()
    } catch (e) {
      setErreur(e.message)
      setEnvoi(false)
    }
  }

  return (
    <Modale
      titre="Confirmer la suppression"
      taille="sm"
      onFermer={onFermer}
      pied={
        <>
          <button type="button" className="adm-btn" onClick={onFermer}>Annuler</button>
          <button type="button" className="adm-btn danger" onClick={supprimer} disabled={envoi}>
            {envoi ? 'Suppression…' : 'Supprimer'}
          </button>
        </>
      }
    >
      {erreur && <div className="adm-bandeau erreur">{erreur}</div>}
      <p>
        Supprimer <strong>{objet[def.champTitre || 'nom'] || 'cet élément'}</strong> ?
      </p>
      <p className="adm-aide">
        L'élément disparaît du site immédiatement. Il reste récupérable en base :
        rien n'est effacé définitivement.
      </p>
    </Modale>
  )
}
