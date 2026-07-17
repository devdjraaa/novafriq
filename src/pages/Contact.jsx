import ContactForm from '../components/ContactForm'
import { useToast } from '../components/ToastContext'
import './Contact.css'

const SOCIALS = [
  { label: 'LinkedIn', path: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></> },
  { label: 'X (Twitter)', path: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/> },
  { label: 'Instagram', path: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> },
]

export default function Contact() {
  const showToast = useToast()

  return (
    <div id="page-contact">
      <section className="section section-dark contact-section">
        <div className="container">
          <div className="breadcrumb contact-breadcrumb">Accueil › <span className="contact-breadcrumb-current">Contact</span></div>

          <div className="contact-heading">
            <div className="section-label">Écrivez-nous</div>
            <h1 className="contact-title">Nous sommes à votre écoute.</h1>
          </div>

          <div className="contact-layout">
            <div className="contact-info">
              <h3>Une question, une opportunité, un projet ?</h3>
              <p>Que vous soyez investisseur, partenaire potentiel, candidat ou simplement curieux de ce que nous construisons — nous répondons à chaque message.</p>

              <div className="contact-details">
                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div className="contact-detail-text">
                    <div className="contact-detail-label">Email</div>
                    <div className="contact-detail-value">direction@novafriq.africa</div>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                  </div>
                  <div className="contact-detail-text">
                    <div className="contact-detail-label">Site web</div>
                    <div className="contact-detail-value">www.novafriq.africa</div>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div className="contact-detail-text">
                    <div className="contact-detail-label">Siège social</div>
                    <div className="contact-detail-value">Sèmè-Podji, Agblangandan, République du Bénin</div>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div className="contact-detail-text">
                    <div className="contact-detail-label">Téléphone</div>
                    <div className="contact-detail-value">+229 00 00 00 00</div>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                  </div>
                  <div className="contact-detail-text">
                    <div className="contact-detail-label">Réseaux sociaux</div>
                    <div className="contact-detail-socials">
                      {SOCIALS.map((s) => (
                        <button
                          key={s.label}
                          type="button"
                          className="contact-social-btn"
                          aria-label={s.label}
                          onClick={() => showToast('Lien réseau social à configurer')}
                        >
                          <svg viewBox="0 0 24 24">{s.path}</svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>

          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps?q=S%C3%A8m%C3%A9-Podji,+Agblangandan,+B%C3%A9nin&output=embed"
              title="Localisation NovafriQ Groupe SAS"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}
