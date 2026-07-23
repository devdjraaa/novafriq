import { useState } from 'react'
import { useToast } from './ToastContext'
import { useTexte } from '../contenu/ContenuContext'
import './ContactForm.css'

/**
 * Le formulaire de contact.
 *
 * Il postait vers `formspree.io/f/VOTRE_ID_FORMSPREE` — l'identifiant
 * d'exemple n'avait jamais été remplacé. Depuis la mise en ligne, CHAQUE
 * message échouait et retombait sur un lien `mailto` que le visiteur devait
 * cliquer lui-même : personne ne pouvait nous écrire depuis le site.
 *
 * Les messages arrivent maintenant dans notre propre boîte de réception, en
 * base. Le repli par e-mail reste là, mais il ne sert plus qu'en cas de panne
 * réelle.
 */

const API = import.meta.env.VITE_API_URL || 'https://novafriqapi.novafriq.africa/api'
const VIDE = { prenom: '', nom: '', email: '', objet: '', message: '' }

export default function ContactForm() {
  const showToast = useToast()
  const t = useTexte()
  const [form, setForm] = useState(VIDE)
  const [envoi, setEnvoi] = useState(false)
  const [echec, setEchec] = useState(false)
  const [erreurs, setErreurs] = useState({})

  const email = t('contact.email', 'direction@novafriq.africa')
  const objets = t('contact.objets', '').split('\n').map((o) => o.trim()).filter(Boolean)

  const lienSecours = () => {
    const sujet = encodeURIComponent(`NovafriQ — ${form.objet || 'Nouveau message'}`)
    const corps = encodeURIComponent(
      `Nom : ${form.prenom} ${form.nom}\nEmail : ${form.email}\n\n${form.message}`,
    )
    return `mailto:${email}?subject=${sujet}&body=${corps}`
  }

  const changer = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setEchec(false)
    setErreurs((x) => ({ ...x, [name]: undefined }))
  }

  const envoyer = async (e) => {
    e.preventDefault()
    setEnvoi(true)
    setErreurs({})

    try {
      const reponse = await fetch(`${API}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          // Champ piège : rempli seulement par un robot. Un humain ne le voit
          // pas, il reste donc toujours vide.
          site_web: e.target.site_web?.value || '',
        }),
      })

      const donnees = await reponse.json().catch(() => ({}))

      if (reponse.ok) {
        showToast(donnees.message || t('contact.succes', 'Message envoyé.'))
        setForm(VIDE)
        setEchec(false)
      } else if (reponse.status === 422) {
        // Les messages du serveur sont posés SOUS leur champ : un bandeau
        // global obligerait le visiteur à chercher lequel est en cause.
        setErreurs(
          Object.fromEntries(Object.entries(donnees.errors || {}).map(([k, v]) => [k, v[0]])),
        )
        showToast('Vérifiez les champs signalés.')
      } else if (reponse.status === 429) {
        showToast('Trop de messages envoyés. Réessayez dans une minute.')
      } else {
        showToast(t('contact.echec', "L'envoi a échoué."))
        setEchec(true)
      }
    } catch {
      showToast(t('contact.echec', "L'envoi a échoué."))
      setEchec(true)
    } finally {
      setEnvoi(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={envoyer}>
      <input type="text" name="site_web" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-prenom">{t('contact.champ.prenom', 'Prénom')}</label>
          <input
            type="text" id="contact-prenom" name="prenom"
            placeholder={t('contact.champ.prenom_indice', 'Votre prénom')}
            value={form.prenom} onChange={changer} required
          />
          {erreurs.prenom && <span className="form-error">{erreurs.prenom}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="contact-nom">{t('contact.champ.nom', 'Nom')}</label>
          <input
            type="text" id="contact-nom" name="nom"
            placeholder={t('contact.champ.nom_indice', 'Votre nom')}
            value={form.nom} onChange={changer} required
          />
          {erreurs.nom && <span className="form-error">{erreurs.nom}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contact-email">{t('contact.champ.email', 'Email')}</label>
        <input
          type="email" id="contact-email" name="email"
          placeholder={t('contact.champ.email_indice', 'votre@email.com')}
          value={form.email} onChange={changer} required
        />
        {erreurs.email && <span className="form-error">{erreurs.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="contact-objet">{t('contact.champ.objet', 'Objet')}</label>
        <select id="contact-objet" name="objet" value={form.objet} onChange={changer} required>
          <option value="" disabled>{t('contact.champ.objet_indice', 'Sélectionnez un objet')}</option>
          {objets.map((o) => <option key={o}>{o}</option>)}
        </select>
        {erreurs.objet && <span className="form-error">{erreurs.objet}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">{t('contact.champ.message', 'Message')}</label>
        <textarea
          id="contact-message" name="message"
          placeholder={t('contact.champ.message_indice', '')}
          value={form.message} onChange={changer} required
        />
        {erreurs.message && <span className="form-error">{erreurs.message}</span>}
      </div>

      <button className="btn-primary contact-submit" type="submit" disabled={envoi}>
        <span>{envoi ? t('contact.bouton_envoi', 'Envoi en cours…') : t('contact.bouton', 'Envoyer le message')}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>

      {echec && (
        <p className="contact-form-fallback">
          {t('contact.echec', "L'envoi a échoué.")}{' '}
          <a href={lienSecours()}>Écrivez-nous directement à {email}</a>
        </p>
      )}
    </form>
  )
}
