import PageHero from '../components/PageHero'
import PlaceholderImg from '../components/PlaceholderImg'
import { PersonIcon } from '../components/icons'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useBlocs, useTexte } from '../contenu/ContenuContext'
import { Icone } from '../admin/kit/icones'
import { Lignes } from './Carrieres'
import './Fondateur.css'

export default function Fondateur() {
  const t = useTexte()
  const reperes = useBlocs('reperes')

  useDocumentMeta(t('seo.fondateur.titre'), t('seo.fondateur.description'))

  return (
    <div id="page-fondateur">
      <PageHero crumb={t('fondateur.hero.fil')} title={<Lignes texte={t('fondateur.hero.titre')} />}>
        {t('fondateur.hero.soustitre')}
      </PageHero>

      <section className="section section-light">
        <div className="container">
          <div className="fondateur-layout">
            <div className="fondateur-photo">
              <div className="fondateur-img-wrap">
                <PlaceholderImg icon={<PersonIcon />} label="Photo du fondateur" dim="Portrait, 600 × 800 px" />
              </div>
              <div className="fondateur-name-card">
                <div className="fondateur-name">{t('fondateur.nom')}</div>
                <div className="fondateur-title">{t('fondateur.titre')}</div>
              </div>
            </div>

            <div className="fondateur-content">
              <h3>&quot;{t('fondateur.citation')}&quot;</h3>
              <p>{t('fondateur.texte1')}</p>
              <p>{t('fondateur.texte2')}</p>
              <p>{t('fondateur.texte3')}</p>

              <div className="valeurs-grid">
                {reperes.map((r) => (
                  <div className="valeur-item" key={r.id}>
                    <div className="valeur-icon">
                      <Icone nom={r.icone} taille={26} />
                    </div>
                    <div className="valeur-name">{r.titre}</div>
                    <p className="valeur-desc">{r.texte}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
