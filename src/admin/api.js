/**
 * Client de l'API d'administration.
 *
 * Une seule porte d'entrée vers le serveur : le jeton, les erreurs et la
 * déconnexion se traitent à un seul endroit. Répartis dans chaque écran, ils
 * finissent toujours par diverger — un écran qui oublie de traiter le 401
 * laisse l'utilisateur devant un écran vide sans comprendre qu'il a été
 * déconnecté.
 */

const BASE = import.meta.env.VITE_API_URL || 'https://novafriqapi.novafriq.africa/api'
const CLE_JETON = 'novafriq_admin_jeton'

export const jeton = {
  lire: () => {
    try { return localStorage.getItem(CLE_JETON) } catch { return null }
  },
  ecrire: (v) => {
    try { localStorage.setItem(CLE_JETON, v) } catch { /* navigation privée */ }
  },
  effacer: () => {
    try { localStorage.removeItem(CLE_JETON) } catch { /* navigation privée */ }
  },
}

export class ErreurApi extends Error {
  constructor(message, statut, erreurs) {
    super(message)
    this.statut = statut
    this.erreurs = erreurs || {}
  }
}

async function appel(chemin, options = {}) {
  const t = jeton.lire()
  const estFormulaire = options.body instanceof FormData

  const reponse = await fetch(`${BASE}${chemin}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(estFormulaire ? {} : { 'Content-Type': 'application/json' }),
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
      ...options.headers,
    },
  })

  if (reponse.status === 204) return null

  const donnees = await reponse.json().catch(() => ({}))

  if (!reponse.ok) {
    // Session expirée : on efface le jeton et on renvoie à la connexion, au
    // lieu de laisser l'écran se remplir d'erreurs incompréhensibles.
    if (reponse.status === 401) {
      jeton.effacer()
      if (!location.pathname.endsWith('/admin')) location.assign('/admin')
    }
    throw new ErreurApi(
      donnees.message || `Erreur ${reponse.status}`,
      reponse.status,
      donnees.errors,
    )
  }

  return donnees
}

const corps = (d) => JSON.stringify(d)

export const api = {
  connexion: (identifiants) => appel('/connexion', { method: 'POST', body: corps(identifiants) }),
  moi: () => appel('/moi'),
  deconnexion: () => appel('/deconnexion', { method: 'POST' }),
  motDePasse: (d) => appel('/mot-de-passe', { method: 'PUT', body: corps(d) }),

  reglages: () => appel('/reglages'),
  enregistrerReglages: (valeurs) => appel('/reglages', { method: 'PUT', body: corps({ valeurs }) }),

  medias: (params = {}) => appel(`/medias?${new URLSearchParams(params)}`),
  televerser: (formData) => appel('/medias', { method: 'POST', body: formData }),
  modifierMedia: (id, d) => appel(`/medias/${id}`, { method: 'PUT', body: corps(d) }),
  supprimerMedia: (id) => appel(`/medias/${id}`, { method: 'DELETE' }),

  lister: (ressource, params = {}) =>
    appel(`/ressources/${ressource}?${new URLSearchParams(params)}`),
  creer: (ressource, d) => appel(`/ressources/${ressource}`, { method: 'POST', body: corps(d) }),
  modifier: (ressource, id, d) =>
    appel(`/ressources/${ressource}/${id}`, { method: 'PUT', body: corps(d) }),
  supprimer: (ressource, id) => appel(`/ressources/${ressource}/${id}`, { method: 'DELETE' }),
  reordonner: (ressource, ids) =>
    appel(`/ressources/${ressource}/ordre`, { method: 'POST', body: corps({ ids }) }),
}
