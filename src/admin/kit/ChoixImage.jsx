import { useEffect, useState } from 'react'
import { api } from '../api'
import Modale from './Modale'

/**
 * Choix d'une image dans la bibliothèque, ou envoi d'une nouvelle.
 *
 * La bibliothèque existe pour qu'une même photo ne soit pas téléversée trois
 * fois — sur Gextimo, la recopie du même fichier à plusieurs endroits a déjà
 * produit des doublons sur le disque et des versions divergentes.
 */
export default function ChoixImage({ valeur, onChange }) {
  const [ouvert, setOuvert] = useState(false)
  const [medias, setMedias] = useState([])
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState(null)
  const [apercu, setApercu] = useState(null)

  const charger = async () => {
    setChargement(true)
    setErreur(null)
    try {
      const r = await api.medias({ par_page: 60 })
      setMedias(r.donnees)
    } catch (e) {
      setErreur(e.message)
    } finally {
      setChargement(false)
    }
  }

  useEffect(() => { if (ouvert) charger() }, [ouvert])

  // L'aperçu du champ : on cherche l'image dans la liste déjà chargée, sinon
  // on la demande. Sans ça, rouvrir une fiche montrerait « aucune image »
  // alors qu'une image est bien rattachée.
  useEffect(() => {
    if (!valeur) { setApercu(null); return }
    const connue = medias.find((m) => m.id === valeur)
    if (connue) { setApercu(connue); return }
    api.medias({ par_page: 100 })
      .then((r) => setApercu(r.donnees.find((m) => m.id === valeur) || null))
      .catch(() => setApercu(null))
  }, [valeur, medias])

  const envoyer = async (fichier) => {
    if (!fichier) return
    setChargement(true)
    setErreur(null)
    try {
      const fd = new FormData()
      fd.append('fichier', fichier)
      const media = await api.televerser(fd)
      setMedias((m) => [media, ...m])
      onChange(media.id)
      setOuvert(false)
    } catch (e) {
      setErreur(e.erreurs?.fichier?.[0] || e.message)
    } finally {
      setChargement(false)
    }
  }

  return (
    <>
      <div className="adm-image">
        <div
          className="apercu"
          style={apercu ? { backgroundImage: `url(${apercu.url})` } : undefined}
        >
          {!apercu && 'Aucune image'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <button type="button" className="adm-btn" onClick={() => setOuvert(true)}>
            {valeur ? "Changer l'image" : 'Choisir une image'}
          </button>
          {valeur && (
            <button type="button" className="adm-btn discret" onClick={() => onChange(null)}>
              Retirer
            </button>
          )}
        </div>
      </div>

      {ouvert && (
        <Modale
          titre="Bibliothèque d'images"
          sous="Choisissez une image existante, ou envoyez-en une nouvelle."
          taille="lg"
          onFermer={() => setOuvert(false)}
          pied={
            <>
              <label className="adm-btn" style={{ marginRight: 'auto' }}>
                Envoyer une image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => envoyer(e.target.files?.[0])}
                />
              </label>
              <button type="button" className="adm-btn" onClick={() => setOuvert(false)}>Fermer</button>
            </>
          }
        >
          {erreur && <div className="adm-bandeau erreur">{erreur}</div>}

          {chargement && <p className="adm-aide">Chargement…</p>}

          {!chargement && medias.length === 0 && (
            <div className="adm-vide">
              <strong>Aucune image</strong>
              Envoyez la première avec le bouton en bas à gauche.
            </div>
          )}

          <div className="adm-galerie">
            {medias.map((m) => (
              <button
                key={m.id}
                type="button"
                className={m.id === valeur ? 'choisi' : ''}
                title={m.nom}
                onClick={() => { onChange(m.id); setOuvert(false) }}
              >
                <img src={m.url} alt={m.alt || m.nom} loading="lazy" />
              </button>
            ))}
          </div>
        </Modale>
      )}
    </>
  )
}
