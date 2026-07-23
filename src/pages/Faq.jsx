import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useRubrique, useTexte } from '../contenu/ContenuContext'
import './Faq.css'

export default function Faq() {
  const t = useTexte()
  const faqs = useRubrique('faqs')

  useDocumentMeta(t('seo.faq.titre'), t('seo.faq.description'))

  return (
    <div id="page-faq">
      <PageHero crumb={t('faq.hero.fil')} title={t('faq.hero.titre')}>
        {t('faq.hero.soustitre')}
      </PageHero>

      <section className="section section-light">
        <div className="container">
          <div className="faq-list">
            {faqs.map((item) => (
              <details className="faq-item" name="faq" key={item.id}>
                <summary>
                  <span>{item.question}</span>
                  <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <p>{item.reponse}</p>
              </details>
            ))}
          </div>

          <div className="faq-cta">
            <p>{t('faq.cta.texte')}</p>
            <Link className="btn-primary" to="/contact">{t('faq.cta.bouton')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
