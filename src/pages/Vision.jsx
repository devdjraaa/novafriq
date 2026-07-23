import PageHero from '../components/PageHero'
import PlaceholderImg from '../components/PlaceholderImg'
import PoleCard from '../components/PoleCard'
import Timeline from '../components/Timeline'
import Reveal from '../components/Reveal'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useBlocs, useImage, useTexte } from '../contenu/ContenuContext'
import { Icone } from '../admin/kit/icones'
import { Lignes } from './Carrieres'
import './Vision.css'

export default function Vision() {
  const t = useTexte()
  const engagements = useBlocs('engagements')
  const poles = useBlocs('poles')
  const route = useBlocs('feuille_route')
  const image = useImage()
  const visuel = image('vision.image')

  useDocumentMeta(t('seo.vision.titre'), t('seo.vision.description'))

  return (
    <div id="page-vision">
      <PageHero crumb={t('vision.hero.fil')} title={t('vision.hero.titre')}>
        {t('vision.hero.soustitre')}
      </PageHero>

      <section className="section section-light">
        <div className="container">
          <div className="vision-layout">
            <div className="vision-text">
              <div className="section-label">{t('vision.raison.label')}</div>
              <h2 className="section-title">{t('vision.raison.titre')}</h2>

              <div className="vision-quote">
                <p>&quot;{t('vision.citation')}&quot;</p>
                <cite>— {t('vision.citation_auteur')}</cite>
              </div>

              <p>{t('vision.texte1')}</p>
              <p>{t('vision.texte2')}</p>
              <p>{t('vision.texte3')}</p>
            </div>

            <div className="vision-image">
              <div className="fondateur-img-wrap">
                {visuel
                  ? <img src={visuel} alt="" className="fondateur-photo-img" />
                  : <PlaceholderImg label="Photo ou visuel" dim="Portrait ou illustration, 600 × 800 px" />}
                <div className="vision-badge">
                  <span className="vision-badge-num">{t('vision.badge_valeur')}</span>
                  <span className="vision-badge-txt">{t('vision.badge_libelle')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="section-label">{t('vision.engagements.label')}</div>
          <h2 className="section-title">{t('vision.engagements.titre')}</h2>

          <div className="valeurs-grid cols-3">
            {engagements.map((e, i) => (
              <Reveal className="valeur-item" index={i} key={e.id}>
                <div className="valeur-icon">
                  <Icone nom={e.icone} taille={26} />
                </div>
                <div className="valeur-name">{e.titre}</div>
                <p className="valeur-desc">{e.texte}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-label">{t('vision.mission.label')}</div>
          <h2 className="section-title"><Lignes texte={t('vision.mission.titre')} /></h2>
          <p className="section-intro">{t('vision.mission.intro')}</p>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="section-label">{t('vision.poles.label')}</div>
          <h2 className="section-title">{t('vision.poles.titre')}</h2>
          <p className="section-intro">{t('vision.poles.intro')}</p>

          <div className="poles-grid">
            {poles.map((p, i) => (
              <PoleCard
                key={p.id}
                index={i}
                name={p.titre}
                items={p.donnees?.items || []}
                color="var(--or)"
                icon={<Icone nom={p.icone} taille={26} />}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-label">{t('vision.route.label')}</div>
          <h2 className="section-title"><Lignes texte={t('vision.route.titre')} /></h2>
          <p className="section-intro">{t('vision.route.intro')}</p>

          <Timeline
            orientation="horizontal"
            items={route.map((r) => ({ marker: r.etiquette, title: r.titre, desc: r.texte }))}
          />
        </div>
      </section>
    </div>
  )
}
