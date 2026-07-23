import PageHero from '../components/PageHero'
import MembreCard from '../components/MembreCard'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useRubrique, useTexte } from '../contenu/ContenuContext'
import { Lignes } from './Carrieres'
import './Equipe.css'

export default function Equipe() {
  const t = useTexte()
  const membres = useRubrique('membres')

  useDocumentMeta(t('seo.equipe.titre'), t('seo.equipe.description'))

  return (
    <div id="page-equipe">
      <PageHero crumb={t('equipe.hero.fil')} title={<Lignes texte={t('equipe.hero.titre')} />}>
        {t('equipe.hero.soustitre')}
      </PageHero>

      <section className="section section-light">
        <div className="container">
          <div className="equipe-intro">
            <div className="section-label">{t('equipe.intro.label')}</div>
            <h2 className="section-title"><Lignes texte={t('equipe.intro.titre')} /></h2>
            <p>{t('equipe.intro.texte')}</p>
          </div>

          <div className="equipe-grid">
            {membres.map((m, i) => (
              <MembreCard
                key={m.id}
                index={i}
                nom={m.nom}
                poste={m.poste}
                desc={m.description}
                badge={m.badge}
                photo={m.photo}
              />
            ))}
          </div>

          <div className="equipe-note">
            {t('equipe.note')}
          </div>
        </div>
      </section>
    </div>
  )
}
