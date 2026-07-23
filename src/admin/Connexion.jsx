import { useState } from 'react'
import { api, jeton } from './api'

export default function Connexion({ onConnecte }) {
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState(null)
  const [envoi, setEnvoi] = useState(false)

  const soumettre = async (e) => {
    e.preventDefault()
    setEnvoi(true)
    setErreur(null)
    try {
      const r = await api.connexion({ email, mot_de_passe: motDePasse })
      jeton.ecrire(r.jeton)
      onConnecte(r.utilisateur)
    } catch (err) {
      // Le serveur ne distingue pas « adresse inconnue » de « mot de passe
      // faux » : deux messages permettraient de découvrir les adresses
      // existantes une par une.
      setErreur(err.erreurs?.email?.[0] || err.message)
      setEnvoi(false)
    }
  }

  return (
    <div className="adm adm-connexion">
      <form className="boite" onSubmit={soumettre}>
        <h1>Back-office NovafriQ</h1>
        <p className="sous">Gestion du contenu de novafriq.africa</p>

        {erreur && <div className="adm-bandeau erreur">{erreur}</div>}

        <div className="adm-groupe">
          <label className="adm-libelle" htmlFor="cx-email">Adresse e-mail</label>
          <input
            id="cx-email"
            className="adm-champ"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
            autoFocus
          />
        </div>

        <div className="adm-groupe">
          <label className="adm-libelle" htmlFor="cx-mdp">Mot de passe</label>
          <input
            id="cx-mdp"
            className="adm-champ"
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit" className="adm-btn primaire" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }} disabled={envoi}>
          {envoi ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
