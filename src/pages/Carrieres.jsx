import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import PosteItem from '../components/PosteItem'
import { ArrowRightIcon } from '../components/icons'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useRubrique, useTexte } from '../contenu/ContenuContext'
import './Carrieres.css'

export default function Carrieres() {
  const t = useTexte()
  const postes = useRubrique('postes')

  useDocumentMeta(t('seo.carrieres.titre'), t('seo.carrieres.description'))

  const email = t('contact.email', 'direction@novafriq.africa')

  const candidature = (titre) => {
    const sujet = encodeURIComponent(`Candidature — ${titre}`)
    const corps = encodeURIComponent(
      `Bonjour,\n\nJe souhaite postuler au poste de ${titre}.\n\nMerci de trouver mon CV et ma motivation ci-joint.\n`,
    )
    return `mailto:${email}?subject=${sujet}&body=${corps}`
  }

  return (
    <div id="page-carrieres">
      <PageHero crumb={t('carrieres.hero.fil')} title={<Lignes texte={t('carrieres.hero.titre')} />}>
        {t('carrieres.hero.soustitre')}
      </PageHero>

      <section className="section section-light">
        <div className="container">
          <div className="carrieres-header">
            <div>
              <div className="section-label">{t('carrieres.pourquoi.label')}</div>
              <h2 className="section-title">{t('carrieres.pourquoi.titre')}</h2>
            </div>
            <p className="carrieres-header-text">{t('carrieres.pourquoi.texte')}</p>
          </div>

          <div className="section-label">{t('carrieres.postes.label')}</div>
          <h3 className="postes-heading">{t('carrieres.postes.titre')}</h3>

          {/* Aucune offre ouverte n'est un cas NORMAL, pas une panne : la page
              le dit au lieu de laisser une zone vide qu'on prend pour un bug. */}
          {postes.length === 0 ? (
            <p className="postes-vide">{t('carrieres.postes.vide')}</p>
          ) : (
            <div className="postes-liste">
              {postes.map((p) => (
                <PosteItem
                  key={p.id}
                  titre={p.titre}
                  lieu={p.lieu}
                  type={p.type_contrat}
                  onClick={() => { window.location.href = candidature(p.titre) }}
                />
              ))}
            </div>
          )}

          <div className="spontanee-box">
            <div>
              <h3>{t('carrieres.spontanee.titre')}</h3>
              <p>{t('carrieres.spontanee.texte')}</p>
            </div>
            <Link className="btn-primary" to="/contact">
              {t('carrieres.spontanee.bouton')}
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

/**
 * Rend les sauts de ligne d'un titre saisi en administration.
 *
 * Le retour à la ligne fait partie de la composition typographique des titres :
 * le perdre casserait l'équilibre voulu. `white-space` ne suffit pas, le JSX
 * n'interprète pas « \n ».
 */
export function Lignes({ texte }) {
  const lignes = String(texte || '').split('\n')

  return lignes.map((l, i) => (
    <span key={i}>
      {l}
      {i < lignes.length - 1 && <br />}
    </span>
  ))
}
