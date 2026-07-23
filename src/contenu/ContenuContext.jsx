import { createContext, useContext, useEffect, useState } from 'react'
import secours from './secours.json'

/**
 * Le contenu du site.
 *
 * Deux sources, dans cet ordre :
 *  1. la COPIE intégrée au paquet — affichée immédiatement, sans attendre le
 *     réseau. Le site est donc lisible dès la première image ;
 *  2. l'API — interrogée en arrière-plan, et qui remplace la copie dès qu'elle
 *     répond. C'est ce qui rend une modification visible tout de suite.
 *
 * Si l'API ne répond pas, la copie reste. Le site ne peut pas devenir blanc
 * parce qu'un serveur est tombé — c'est la contrepartie exacte du choix de
 * publication immédiate.
 */

const ContexteContenu = createContext(secours)

const API = import.meta.env.VITE_API_URL || 'https://novafriqapi.novafriq.africa/api'

export function ContenuProvider({ children }) {
  const [contenu, setContenu] = useState(secours)

  useEffect(() => {
    let vivant = true

    fetch(`${API}/contenu`, { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((frais) => {
        // On ne remplace que par un contenu manifestement complet : une réponse
        // tronquée viderait des sections entières du site sans prévenir.
        if (vivant && frais?.reglages && Object.keys(frais.reglages).length > 20) {
          setContenu(frais)
        }
      })
      .catch(() => {
        // Silence volontaire : le visiteur voit déjà le site grâce à la copie,
        // lui signaler une panne dont il ne subit rien n'a aucun intérêt.
      })

    return () => { vivant = false }
  }, [])

  return <ContexteContenu.Provider value={contenu}>{children}</ContexteContenu.Provider>
}

export const useContenu = () => useContext(ContexteContenu)

/**
 * Un texte, par sa clé.
 *
 * Le repli est la copie intégrée, puis la chaîne vide — jamais la clé
 * technique. Afficher « accueil.hero.titre » en pleine page est le défaut
 * classique, et il finit toujours par arriver sous les yeux d'un visiteur.
 */
export function useTexte() {
  const contenu = useContenu()

  return (cle, defaut = '') =>
    contenu?.reglages?.[cle] ?? secours?.reglages?.[cle] ?? defaut
}

/** Une des listes illustrées, par sa collection. */
export function useBlocs(collection) {
  const contenu = useContenu()

  return contenu?.blocs?.[collection] ?? secours?.blocs?.[collection] ?? []
}

/** Une rubrique de contenu : produits, membres, postes, faqs, partenaires. */
export function useRubrique(nom) {
  const contenu = useContenu()

  return contenu?.[nom] ?? secours?.[nom] ?? []
}
