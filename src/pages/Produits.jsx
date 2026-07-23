import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import ProduitCard from '../components/ProduitCard'
import PlaceholderImg from '../components/PlaceholderImg'
import Timeline from '../components/Timeline'
import Reveal from '../components/Reveal'
import { ExternalLinkIcon } from '../components/icons'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useBlocs, useRubrique, useTexte } from '../contenu/ContenuContext'
import { Icone } from '../admin/kit/icones'
import { Lignes } from './Carrieres'
import './Produits.css'

export default function Produits() {
  const t = useTexte()
  const produits = useRubrique('produits')
  const services = useBlocs('services')
  const methode = useBlocs('methode')

  useDocumentMeta(t('seo.produits.titre'), t('seo.produits.description'))

  const detaille = produits.find((p) => p.vedette)
    || produits.find((p) => p.statut === 'en_ligne')

  return (
    <div id="page-produits">
      <PageHero crumb={t('produits.hero.fil')} title={<Lignes texte={t('produits.hero.titre')} />}>
        {t('produits.hero.soustitre')}
      </PageHero>

      <section className="section section-light">
        <div className="container">
          <div className="produits-grid">
            {produits.map((p, i) => (
              <ProduitCard
                key={p.id}
                index={i}
                href={p.lien || undefined}
                active={p.statut === 'en_ligne'}
                bannerClassName={p.statut === 'en_ligne' ? 'gextimo-bg' : undefined}
                banner={
                  p.image
                    ? <img className="produit-visuel" src={p.image} alt={p.image_alt || p.nom} />
                    : p.statut === 'en_ligne'
                      ? <div className="produit-logo-gextimo">{p.nom}</div>
                      : <ProduitSansVisuel />
                }
                status={p.statut === 'en_ligne' ? 'live' : 'coming'}
                statusLabel={p.statut_libelle}
                tagline={p.accroche}
                name={p.nom}
                desc={p.description}
                linkLabel={p.lien_libelle}
              />
            ))}
          </div>
        </div>
      </section>

      {detaille && (
        <section className="section section-gray">
          <div className="container">
            <div className="section-label">{t('produits.detail.label')}</div>
            <h2 className="section-title">{t('produits.detail.titre')}</h2>
            <p className="section-intro">{t('produits.detail.intro')}</p>

            <div className="gextimo-spotlight-layout">
              <div className="gextimo-shots">
                {detaille.image
                  ? <img className="gextimo-shot" src={detaille.image} alt={detaille.image_alt || detaille.nom} />
                  : <PlaceholderImg variant="wide" label={`Aperçu ${detaille.nom}`} dim="Aperçu, 1200 × 750 px" />}
              </div>
              <div className="gextimo-info">
                <h3>{t('produits.detail.slogan')}</h3>
                {detaille.caracteristiques?.length > 0 && (
                  <ul className="gextimo-features">
                    {detaille.caracteristiques.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                )}
                <p className="gextimo-benefits">{t('produits.detail.benefices')}</p>
                {detaille.lien && (
                  <a className="btn-primary" href={detaille.lien} target="_blank" rel="noreferrer">
                    {detaille.lien_libelle}
                    <ExternalLinkIcon />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section section-light">
        <div className="container">
          <div className="section-label">{t('produits.services.label')}</div>
          <h2 className="section-title"><Lignes texte={t('produits.services.titre')} /></h2>
          <p className="section-intro">{t('produits.services.intro')}</p>

          <div className="valeurs-grid cols-3">
            {services.map((s, i) => (
              <Reveal className="valeur-item" index={i} key={s.id}>
                <div className="valeur-icon">
                  <Icone nom={s.icone} taille={26} />
                </div>
                <div className="valeur-name">{s.titre}</div>
                <p className="valeur-desc">{s.texte}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="section-label">{t('produits.methode.label')}</div>
          <h2 className="section-title">{t('produits.methode.titre')}</h2>
          <p className="section-intro">{t('produits.methode.intro')}</p>

          <Timeline
            orientation="vertical"
            items={methode.map((m) => ({ marker: m.etiquette, title: m.titre, desc: m.texte }))}
          />
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="produits-cta">
            <div className="section-label" style={{ justifyContent: 'center' }}>{t('produits.cta.label')}</div>
            <h3>{t('produits.cta.titre')}</h3>
            <p>{t('produits.cta.texte')}</p>
            <Link className="btn-primary" to="/contact">{t('produits.cta.bouton')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

/** Emplacement réservé d'un produit sans visuel, plutôt qu'une bannière nue. */
function ProduitSansVisuel() {
  return (
    <div className="produit-logo-ph">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(39,198,217,0.4)" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 8v8M8 12h8" />
      </svg>
      <span>Logo</span>
    </div>
  )
}
