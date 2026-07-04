import { Link } from 'react-router-dom'
import { ArrowRightIcon, ExternalLinkIcon } from '../components/icons'
import PlaceholderImg from '../components/PlaceholderImg'
import './Home.css'

const PILIERS = [
  {
    name: 'Mode & Artisanat',
    desc: "Des plateformes dédiées aux créateurs de mode, designers et artisans africains pour valoriser leur savoir-faire à l'échelle mondiale.",
    icon: <path d="M20 7l-8-4-8 4m16 0-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
  },
  {
    name: 'SaaS Métier',
    desc: "Des outils de gestion, d'automatisation et de productivité adaptés aux réalités et contraintes des entreprises africaines.",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
  },
  {
    name: 'FinTech',
    desc: 'Des solutions de paiement, de transfert et de gestion financière conçues pour les marchés africains, y compris les populations non bancarisées.',
    icon: (
      <>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </>
    ),
  },
  {
    name: 'Éducation',
    desc: "Des plateformes d'apprentissage en ligne et de formation professionnelle pour démocratiser l'accès aux compétences numériques et techniques.",
    icon: (
      <>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </>
    ),
  },
]

export default function Home() {
  return (
    <div id="page-home">
      <section className="hero">
        <div className="hero-bg-pattern"></div>
        <div className="hero-grid-lines"></div>
        <div className="hero-content">
          <div className="hero-eyebrow">NovafriQ Groupe SAS</div>
          <h1 className="hero-title">
            Nous construisons<br />
            les outils numériques<br />
            de <em>l'Afrique de demain.</em>
          </h1>
          <p className="hero-subtitle">
            NovafriQ est un groupe technologique panafricain qui conçoit, développe et déploie des plateformes numériques à fort impact pour les entrepreneurs, créateurs et professionnels africains.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" to="/produits">
              Découvrir nos produits
              <ArrowRightIcon />
            </Link>
            <Link className="btn-secondary" to="/vision">Notre vision</Link>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">1</span>
            <span className="hero-stat-label">Produit actif</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">4</span>
            <span className="hero-stat-label">Piliers stratégiques</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">∞</span>
            <span className="hero-stat-label">Ambition africaine</span>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-label">Nos domaines</div>
          <h2 className="section-title">Quatre piliers.<br />Un écosystème.</h2>
          <p className="section-intro">NovafriQ intervient là où le numérique peut transformer durablement la vie des Africains : le commerce, la finance, le savoir et les outils métier.</p>

          <div className="piliers-grid">
            {PILIERS.map((p) => (
              <div className="pilier-card" key={p.name}>
                <div className="pilier-icon">
                  <svg viewBox="0 0 24 24">{p.icon}</svg>
                </div>
                <div className="pilier-name">{p.name}</div>
                <p className="pilier-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="section-label">Notre flagship</div>
          <h2 className="section-title">Gextimo, notre premier<br />produit en ligne.</h2>
          <p className="section-intro">La marketplace dédiée aux créateurs de mode africains — designers, tailleurs et artisans.</p>

          <div className="produit-apercu">
            <div>
              <PlaceholderImg variant="wide" label="Bannière Gextimo" dim="1200 × 450 px recommandé" />
            </div>
            <div>
              <div className="produit-apercu-title">
                <div className="gextimo-wordmark">Gextimo</div>
                <span className="produit-status status-live">En ligne</span>
              </div>
              <p className="produit-apercu-desc">
                La première marketplace panafricaine dédiée aux créateurs de mode. Gextimo connecte designers, tailleurs et artisans à une clientèle qui valorise l'authenticité et le savoir-faire africain.
              </p>
              <p className="produit-apercu-quote">
                "Créez — Gérez — Rayonnez."
              </p>
              <a className="btn-primary" href="https://gextimo.novafriq.africa" target="_blank" rel="noreferrer">
                Visiter Gextimo
                <ExternalLinkIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Travaillons ensemble</div>
          <h2 className="section-title light" style={{ maxWidth: 600, margin: '0 auto 20px' }}>Vous avez un projet.<br />Nous avons les outils.</h2>
          <p className="section-intro light" style={{ margin: '0 auto 40px' }}>Que vous soyez investisseur, partenaire stratégique ou entrepreneur, NovafriQ est ouvert à toute collaboration porteuse d'impact.</p>
          <Link className="btn-primary" to="/contact">Prendre contact</Link>
        </div>
      </section>
    </div>
  )
}
