import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { api, jeton } from './api'
import { RESSOURCES, trouverRessource } from './ressources'
import Connexion from './Connexion'
import Reglages from './Reglages'
import Ressource from './kit/Ressource'
import './admin.css'

/**
 * Le back-office.
 *
 * Chargé à la demande depuis App.jsx : un visiteur du site public ne télécharge
 * pas une ligne de ce code.
 */
export default function AdminApp() {
  const [utilisateur, setUtilisateur] = useState(null)
  const [verifie, setVerifie] = useState(false)

  useEffect(() => {
    if (!jeton.lire()) { setVerifie(true); return }
    // Un jeton présent ne prouve pas qu'il est encore valide : on le confronte
    // au serveur avant d'afficher quoi que ce soit, sinon chaque écran
    // découvrirait l'expiration de son côté.
    api.moi()
      .then(setUtilisateur)
      .catch(() => jeton.effacer())
      .finally(() => setVerifie(true))
  }, [])

  if (!verifie) return <div className="adm" style={{ padding: 40 }}>Chargement…</div>
  if (!utilisateur) return <Connexion onConnecte={setUtilisateur} />

  return (
    <div className="adm">
      <div className="adm-shell">
        <Barre utilisateur={utilisateur} onDeconnexion={() => { jeton.effacer(); setUtilisateur(null) }} />
        <main className="adm-corps">
          <Routes>
            <Route index element={<Navigate to="produits" replace />} />
            <Route path="textes" element={<Reglages />} />
            <Route path=":ressource" element={<EcranRessource utilisateur={utilisateur} />} />
            <Route path="*" element={<Navigate to="produits" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function EcranRessource({ utilisateur }) {
  const { pathname } = useLocation()
  const id = pathname.split('/').filter(Boolean).pop()
  const def = trouverRessource(id)

  if (!def) return <Navigate to="/admin/produits" replace />

  // Le cloisonnement est aussi appliqué par le serveur (403). Ici, on évite
  // seulement d'afficher un écran qui répondrait « interdit » à chaque appel.
  if (def.reserveAdmin && utilisateur.role !== 'admin') {
    return (
      <div className="adm-bandeau erreur">
        Cette section est réservée aux administrateurs.
      </div>
    )
  }

  // La clé force le remontage au changement de ressource : sans elle, l'état
  // interne (recherche, page, filtres) survivrait au passage d'un écran à
  // l'autre et afficherait des filtres qui n'ont plus de sens.
  return <Ressource key={id} def={def} />
}

function Barre({ utilisateur, onDeconnexion }) {
  const { pathname } = useLocation()
  const [nouveaux, setNouveaux] = useState(0)

  // Le nombre de messages non lus, rafraîchi périodiquement : sans pastille,
  // personne n'ouvre une boîte de réception qu'il croit vide.
  useEffect(() => {
    const relever = () => api.lister('messages', { statut: 'nouveau', par_page: 1 })
      .then((r) => setNouveaux(r.total))
      .catch(() => {})
    relever()
    const t = setInterval(relever, 60000)
    return () => clearInterval(t)
  }, [])

  const groupes = RESSOURCES
    .map((g) => ({
      ...g,
      entrees: g.entrees.filter((e) => !e.reserveAdmin || utilisateur.role === 'admin'),
    }))
    .filter((g) => g.entrees.length)

  return (
    <aside className="adm-barre">
      <div className="adm-marque">
        NovafriQ
        <span>Back-office</span>
      </div>

      <nav className="adm-nav">
        <div className="adm-nav-titre">Site</div>
        <Link to="/admin/textes" className={pathname.endsWith('/textes') ? 'actif' : ''}>
          Textes du site
        </Link>

        {groupes.map((g) => (
          <div key={g.groupe}>
            <div className="adm-nav-titre">{g.groupe}</div>
            {g.entrees.map((e) => {
              const id = e.id || e.cle
              return (
                <Link key={id} to={`/admin/${id}`} className={pathname.endsWith(`/${id}`) ? 'actif' : ''}>
                  {e.titre}
                  {e.pastille === 'messages_nouveaux' && nouveaux > 0 && (
                    <span className="pastille">{nouveaux}</span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}

        <div className="adm-nav-titre">Site public</div>
        <a href="/" target="_blank" rel="noreferrer">Voir le site</a>
      </nav>

      <div className="adm-pied">
        <div className="qui">
          {utilisateur.nom}
          <br />
          {utilisateur.role === 'admin' ? 'Administrateur' : 'Éditeur'}
        </div>
        <button type="button" onClick={onDeconnexion}>Se déconnecter</button>
      </div>
    </aside>
  )
}
