import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { ArrowRightIcon } from '../components/icons'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useRubrique, useTexte } from '../contenu/ContenuContext'
import { Lignes } from './Carrieres'
import './Partenaires.css'

export default function Partenaires() {
  const t = useTexte()
  const partenaires = useRubrique('partenaires')

  useDocumentMeta(t('seo.partenaires.titre'), t('seo.partenaires.description'))

  return (
    <div id="page-partenaires">
      <PageHero crumb={t('partenaires.hero.fil')} title={<Lignes texte={t('partenaires.hero.titre')} />}>
        {t('partenaires.hero.soustitre')}
      </PageHero>

      <section className="section section-light">
        <div className="container">
          <div className="section-label">{t('partenaires.label')}</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>{t('partenaires.titre')}</h2>

          {/* Tant qu'aucun partenariat n'est officialisé, la page montre des
              emplacements réservés — et l'annonce, comme aujourd'hui. Inventer
              des logos pour faire nombre serait mentir. */}
          {partenaires.length === 0 ? (
            <>
              <p className="partenaires-intro">{t('partenaires.intro')}</p>
              <div className="partenaires-grid">
                {[1, 2, 3, 4].map((i) => (
                  <Reveal as="div" className="partenaire-ph" index={i - 1} key={i}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                    </svg>
                    <span>Logo partenaire</span>
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <div className="partenaires-grid">
              {partenaires.map((p, i) => {
                const Balise = p.lien ? 'a' : 'div'
                const props = p.lien ? { href: p.lien, target: '_blank', rel: 'noreferrer' } : {}
                return (
                  <Reveal as={Balise} className="partenaire-logo" index={i} key={p.id} {...props}>
                    {p.logo
                      ? <img src={p.logo} alt={p.nom} />
                      : <span>{p.nom}</span>}
                  </Reveal>
                )
              })}
            </div>
          )}

          <div className="investisseurs-cta">
            <div className="section-label" style={{ justifyContent: 'center' }}>{t('partenaires.investisseurs.label')}</div>
            <h3>{t('partenaires.investisseurs.titre')}</h3>
            <p>{t('partenaires.investisseurs.texte')}</p>
            <Link className="btn-primary" to="/contact">
              {t('partenaires.investisseurs.bouton')}
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
