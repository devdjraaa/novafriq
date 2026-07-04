import PageHero from '../components/PageHero'
import PlaceholderImg from '../components/PlaceholderImg'
import './Vision.css'

const ENGAGEMENTS = [
  {
    name: 'Souveraineté numérique',
    desc: 'Nos produits sont conçus pour donner aux Africains le contrôle de leurs données, de leur commerce et de leur identité numérique.',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    name: 'Impact continental',
    desc: 'Chaque produit que nous lançons est pensé pour fonctionner à travers les frontières et les cultures du continent africain.',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </>
    ),
  },
  {
    name: "Excellence d'exécution",
    desc: 'Nous refusons les compromis sur la qualité. Un produit NovafriQ doit être aussi bien conçu qu\'un produit de niveau mondial.',
    icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
  },
  {
    name: "Communauté d'abord",
    desc: 'Nos utilisateurs ne sont pas des clients. Ce sont des membres d\'un écosystème que nous construisons ensemble.',
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    name: 'Confiance & sécurité',
    desc: 'La conformité légale et la protection des données ne sont pas des contraintes pour nous — elles sont des fondements.',
    icon: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
  },
  {
    name: 'Expérience utilisateur',
    desc: 'Un produit difficile à utiliser est un produit qui ne remplit pas sa mission. Nous concevons pour la simplicité et la fluidité.',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </>
    ),
  },
]

export default function Vision() {
  return (
    <div id="page-vision">
      <PageHero crumb="Notre Vision" title="Pourquoi NovafriQ existe.">
        Une conviction profonde : l'Afrique n'a pas besoin de copier. Elle a besoin d'outils conçus pour elle, par elle.
      </PageHero>

      <section className="section section-light">
        <div className="container">
          <div className="vision-layout">
            <div className="vision-text">
              <div className="section-label">Notre raison d'être</div>
              <h2 className="section-title">Bâtir l'infrastructure numérique de l'Afrique.</h2>

              <div className="vision-quote">
                <p>"L'Afrique est le continent qui compte le plus grand nombre de jeunes au monde. Leur donner les bons outils numériques, c'est libérer une énergie sans équivalent."</p>
                <cite>— Patrick Dona Adjaho, Président & Fondateur, NovafriQ Groupe SAS</cite>
              </div>

              <p>NovafriQ est né d'un constat simple : les solutions numériques disponibles sur le marché africain sont rarement pensées pour ses réalités. Elles ignorent les contraintes de connectivité, les habitudes de paiement, les langues locales et les dynamiques communautaires qui font la richesse de ce continent.</p>
              <p>Nous construisons différemment. Chaque produit NovafriQ part du terrain, des besoins réels des entrepreneurs, créateurs, apprenants et professionnels africains. Nous croyons que la technologie n'a de valeur que si elle est adoptée, et qu'elle n'est adoptée que si elle répond à une réalité vécue.</p>
              <p>Notre ambition est de devenir le groupe technologique de référence en Afrique francophone et au-delà — en faisant de chaque produit un levier de souveraineté numérique pour ceux qui l'utilisent.</p>
            </div>

            <div className="vision-image">
              <div className="fondateur-img-wrap">
                <PlaceholderImg label="Photo ou visuel" dim="Portrait ou illustration — 600 × 800 px" />
                <div className="vision-badge">
                  <span className="vision-badge-num">2024</span>
                  <span className="vision-badge-txt">Année de création</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="section-label">Nos engagements</div>
          <h2 className="section-title">Ce en quoi nous croyons.</h2>

          <div className="valeurs-grid cols-3">
            {ENGAGEMENTS.map((e) => (
              <div className="valeur-item" key={e.name}>
                <div className="valeur-icon">
                  <svg viewBox="0 0 24 24">{e.icon}</svg>
                </div>
                <div className="valeur-name">{e.name}</div>
                <p className="valeur-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
