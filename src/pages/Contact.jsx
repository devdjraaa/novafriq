import ContactForm from '../components/ContactForm'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useTexte } from '../contenu/ContenuContext'
import './Contact.css'

export default function Contact() {
  const t = useTexte()

  useDocumentMeta(t('seo.contact.titre'), t('seo.contact.description'))

  return (
    <div id="page-contact">
      <section className="section section-dark contact-section">
        <div className="container">
          <div className="breadcrumb contact-breadcrumb">Accueil › <span className="contact-breadcrumb-current">Contact</span></div>

          <div className="contact-heading">
            <div className="section-label">{t('contact.hero.label')}</div>
            <h1 className="contact-title">{t('contact.hero.titre')}</h1>
          </div>

          <div className="contact-layout">
            <div className="contact-info">
              <h3>{t('contact.intro.titre')}</h3>
              <p>{t('contact.intro.texte')}</p>

              <div className="contact-details">
                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div className="contact-detail-text">
                    <div className="contact-detail-label">Email</div>
                    <div className="contact-detail-value">{t('contact.email')}</div>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                  </div>
                  <div className="contact-detail-text">
                    <div className="contact-detail-label">Site web</div>
                    <div className="contact-detail-value">{t('contact.site')}</div>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div className="contact-detail-text">
                    <div className="contact-detail-label">Siège social</div>
                    <div className="contact-detail-value">{t('contact.siege')}</div>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div className="contact-detail-text">
                    <div className="contact-detail-label">Téléphone</div>
                    <div className="contact-detail-value">{t('contact.telephone')}</div>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </div>
                  <div className="contact-detail-text">
                    <div className="contact-detail-label">Réseaux sociaux</div>
                    <div className="contact-detail-socials">
                      <a
                        href={t('social.linkedin')}
                        target="_blank"
                        rel="noreferrer"
                        className="contact-social-btn"
                        aria-label="LinkedIn"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                      </a>
                      <a
                        href={t('social.facebook')}
                        target="_blank"
                        rel="noreferrer"
                        className="contact-social-btn"
                        aria-label="Facebook"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>

          <div className="contact-map">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(t('contact.carte'))}&output=embed`}
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
