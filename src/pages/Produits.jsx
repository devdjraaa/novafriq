import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import ProduitCard from '../components/ProduitCard'
import './Produits.css'

export default function Produits() {
  return (
    <div id="page-produits">
      <PageHero crumb="Nos Produits" title={<>Notre portefeuille<br />de produits.</>}>
        Chaque produit NovafriQ est une réponse précise à un besoin réel. Gextimo est le premier. D'autres suivront.
      </PageHero>

      <section className="section section-light">
        <div className="container">
          <div className="produits-grid">
            <ProduitCard
              href="https://gextimo.novafriq.africa"
              active
              bannerClassName="gextimo-bg"
              banner={<div className="produit-logo-gextimo">Gextimo</div>}
              status="live"
              statusLabel="En ligne"
              tagline="Mode & Artisanat numérique"
              name="Gextimo"
              desc="La marketplace panafricaine qui connecte designers, tailleurs et artisans à leurs clients. Un espace pour créer, gérer et rayonner."
              linkLabel="Visiter Gextimo"
            />

            <ProduitCard
              status="coming"
              statusLabel="À venir"
              banner={(
                <div className="produit-logo-ph">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(200,169,110,0.4)" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                  <span>Logo</span>
                </div>
              )}
              tagline="SaaS Métier"
              name="Produit 2"
              desc="Un outil SaaS dédié aux PME africaines pour simplifier leur gestion opérationnelle et accélérer leur croissance."
              linkLabel="Bientôt disponible"
            />

            <ProduitCard
              status="coming"
              statusLabel="À venir"
              banner={(
                <div className="produit-logo-ph">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(200,169,110,0.4)" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                  <span>Logo</span>
                </div>
              )}
              tagline="FinTech"
              name="Produit 3"
              desc="Une solution financière pensée pour les entrepreneurs africains : paiements, transferts et gestion multi-devises sans barrières."
              linkLabel="Bientôt disponible"
            />
          </div>

          <div className="produits-cta">
            <div className="section-label" style={{ justifyContent: 'center' }}>Vous construisez quelque chose ?</div>
            <h3>Rejoignez l'écosystème NovafriQ.</h3>
            <p>Si vous avez un projet numérique à fort potentiel pour l'Afrique, nous sommes ouverts à la discussion.</p>
            <Link className="btn-primary" to="/contact">Discutons de votre projet</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
