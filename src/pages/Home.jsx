import { Link } from 'react-router-dom'
import { ArrowRightIcon, ExternalLinkIcon } from '../components/icons'
import StatCounter from '../components/StatCounter'
import AfriqueConstellation from '../components/AfriqueConstellation'
import Reveal from '../components/Reveal'
import useInViewport from '../hooks/useInViewport'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useBlocs, useRubrique, useTexte } from '../contenu/ContenuContext'
import { Icone } from '../admin/kit/icones'
import { Lignes } from './Carrieres'
import './Home.css'

export default function Home() {
  const t = useTexte()
  const piliers = useBlocs('piliers')
  const pourquoi = useBlocs('pourquoi')
  const produits = useRubrique('produits')

  useDocumentMeta(t('seo.accueil.titre'), t('seo.accueil.description'))
  const { ref: pourquoiRef, inView: pourquoiInView } = useInViewport()

  // Le produit mis en avant est choisi en administration. À défaut, le premier
  // produit en ligne — la section ne doit jamais rester vide sur l'accueil.
  const vedette = produits.find((p) => p.vedette)
    || produits.find((p) => p.statut === 'en_ligne')
    || produits[0]

  // Le titre porte une portion mise en valeur, saisie séparément : la repérer
  // dans le texte évite d'imposer du balisage à l'éditeur.
  const titre = t('accueil.hero.titre')
  const accent = t('accueil.hero.accent')
  const [avant, apres] = accent && titre.includes(accent)
    ? [titre.slice(0, titre.indexOf(accent)), titre.slice(titre.indexOf(accent) + accent.length)]
    : [titre, '']

  return (
    <div id="page-home">
      <section className="hero">
        <div className="hero-halo hero-halo-cyan" aria-hidden="true"></div>
        <div className="hero-halo hero-halo-bleu" aria-hidden="true"></div>
        <div className="hero-bg-pattern"></div>
        <div className="hero-grid-lines"></div>
        <div className="hero-content">
          <div className="hero-eyebrow">{t('accueil.hero.surtitre')}</div>
          <h1 className="hero-title">
            <Lignes texte={avant} />
            {accent && <em>{accent}</em>}
            {apres && <Lignes texte={apres} />}
          </h1>
          <p className="hero-subtitle">{t('accueil.hero.soustitre')}</p>
          <div className="hero-actions">
            <Link className="btn-primary" to={t('accueil.hero.bouton1_lien', '/produits')}>
              {t('accueil.hero.bouton1')}
              <ArrowRightIcon />
            </Link>
            <Link className="btn-secondary on-light" to={t('accueil.hero.bouton2_lien', '/vision')}>
              {t('accueil.hero.bouton2')}
            </Link>
          </div>
        </div>

        <div className="hero-illustration" aria-hidden="true">
          <AfriqueConstellation />
        </div>

        <div className="hero-stats">
          <Chiffre valeur={t('accueil.stat1_valeur')} libelle={t('accueil.stat1_libelle')} />
          <Chiffre valeur={t('accueil.stat2_valeur')} libelle={t('accueil.stat2_libelle')} />
          <Chiffre valeur={t('accueil.stat3_valeur')} libelle={t('accueil.stat3_libelle')} />
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="qui-sommes-nous">
            <div className="section-label">{t('accueil.qui.label')}</div>
            <h2 className="section-title"><Lignes texte={t('accueil.qui.titre')} /></h2>
            <p>{t('accueil.qui.texte1')}</p>
            <p>{t('accueil.qui.texte2')}</p>
            <Link className="btn-secondary on-light" to="/vision">
              {t('accueil.qui.bouton')} <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="section-label">{t('accueil.piliers.label')}</div>
          <h2 className="section-title"><Lignes texte={t('accueil.piliers.titre')} /></h2>
          <p className="section-intro">{t('accueil.piliers.intro')}</p>

          <div className="piliers-grid">
            {piliers.map((p, i) => (
              <Reveal className="pilier-card" index={i} key={p.id}>
                <div className="pilier-icon">
                  <Icone nom={p.icone} taille={26} />
                </div>
                <div className="pilier-name">{p.titre}</div>
                <p className="pilier-desc">{p.texte}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-label">{t('accueil.pourquoi.label')}</div>
          <h2 className="section-title"><Lignes texte={t('accueil.pourquoi.titre')} /></h2>
          <p className="section-intro">{t('accueil.pourquoi.intro')}</p>

          <div className="valeurs-grid cols-3" ref={pourquoiRef}>
            {pourquoi.map((p, i) => (
              <div
                className={`valeur-item reveal${pourquoiInView ? ' in-view' : ''}`}
                key={p.id}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="valeur-icon">
                  <Icone nom={p.icone} taille={26} />
                </div>
                <div className="valeur-name">{p.titre}</div>
                <p className="valeur-desc">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {vedette && (
        <section className="section section-gray">
          <div className="container">
            <div className="section-label">{t('accueil.vedette.label')}</div>
            <h2 className="section-title"><Lignes texte={t('accueil.vedette.titre')} /></h2>
            <p className="section-intro">{t('accueil.vedette.intro')}</p>

            <div className="produit-apercu">
              <div>
                <div className="produit-cover-card">
                  <img
                    src={vedette.image || '/logo/Couverture_Gextimo_1.png'}
                    alt={vedette.image_alt || `${vedette.nom} — ${vedette.accroche || ''}`}
                  />
                </div>
              </div>
              <div>
                <div className="produit-apercu-title">
                  <div className="gextimo-wordmark">{vedette.nom}</div>
                  <span className={`produit-status status-${vedette.statut === 'en_ligne' ? 'live' : 'coming'}`}>
                    {vedette.statut_libelle}
                  </span>
                </div>
                <p className="produit-apercu-desc">
                  {t('accueil.vedette.description') || vedette.description}
                </p>
                {vedette.citation && (
                  <p className="produit-apercu-quote">&quot;{vedette.citation}&quot;</p>
                )}
                {vedette.lien && (
                  <a className="btn-primary" href={vedette.lien} target="_blank" rel="noreferrer">
                    {vedette.lien_libelle}
                    <ExternalLinkIcon />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section section-dark">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>{t('accueil.cta.label')}</div>
          <h2 className="section-title light" style={{ maxWidth: 600, margin: '0 auto 20px' }}>
            <Lignes texte={t('accueil.cta.titre')} />
          </h2>
          <p className="section-intro light" style={{ margin: '0 auto 40px' }}>{t('accueil.cta.texte')}</p>
          <Link className="btn-primary" to="/contact">{t('accueil.cta.bouton')}</Link>
        </div>
      </section>
    </div>
  )
}

/**
 * Un chiffre du bandeau.
 *
 * Le compteur animé ne fonctionne que sur un nombre : « ∞ » est légitime et ne
 * doit pas être forcé à zéro par une conversion silencieuse.
 */
function Chiffre({ valeur, libelle }) {
  const nombre = Number(valeur)

  if (Number.isFinite(nombre) && String(valeur).trim() !== '') {
    return <StatCounter value={nombre} label={libelle} />
  }

  return (
    <div className="hero-stat">
      <span className="hero-stat-num">{valeur}</span>
      <span className="hero-stat-label">{libelle}</span>
    </div>
  )
}
