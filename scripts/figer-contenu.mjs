/**
 * Fige une copie du contenu du site.
 *
 * Le site lit l'API au chargement pour que toute modification soit visible
 * immédiatement. Mais une API indisponible ne doit JAMAIS produire un site
 * blanc : cette copie, intégrée au paquet, est ce qui s'affiche en attendant la
 * réponse du serveur — et ce qui reste affiché s'il ne répond pas.
 *
 * À rejouer après une modification de fond du contenu :
 *     npm run contenu:figer
 *
 * Le script NE FAIT PAS ÉCHOUER la construction si l'API est injoignable : il
 * garde la copie précédente et le dit. Sinon, une API en maintenance
 * empêcherait de déployer un correctif sans rapport.
 */
import { writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ici = dirname(fileURLToPath(import.meta.url))
const cible = resolve(ici, '../src/contenu/secours.json')

const API = process.env.VITE_API_URL || 'https://novafriqapi.novafriq.africa/api'

try {
  const reponse = await fetch(`${API}/contenu`, { headers: { Accept: 'application/json' } })
  if (!reponse.ok) throw new Error(`réponse ${reponse.status}`)

  const contenu = await reponse.json()

  // Un contenu vide serait pire que l'ancien : on refuse d'écraser une copie
  // valide par une réponse dégradée.
  if (!contenu?.reglages || Object.keys(contenu.reglages).length < 20) {
    throw new Error('contenu incomplet, copie précédente conservée')
  }

  writeFileSync(cible, JSON.stringify(contenu, null, 2) + '\n', 'utf8')
  console.log(`Copie de secours mise à jour : ${Object.keys(contenu.reglages).length} réglages.`)
} catch (e) {
  if (existsSync(cible)) {
    console.warn(`API injoignable (${e.message}) — la copie de secours existante est conservée.`)
  } else {
    console.error(`API injoignable (${e.message}) et AUCUNE copie de secours n'existe.`)
    process.exit(1)
  }
}
