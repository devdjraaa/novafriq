import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useTexte } from '../contenu/ContenuContext'
import './Actualites.css'

const API = import.meta.env.VITE_API_URL || 'https://novafriqapi.novafriq.africa/api'

/**
 * Un article du blog.
 *
 * Le contenu est du texte, rendu paragraphe par paragraphe. On n'injecte
 * volontairement AUCUN balisage : même écrit par un rédacteur de confiance, du
 * HTML collé depuis un traitement de texte finit par contenir n'importe quoi,
 * et l'injecter tel quel exposerait toutes les pages du site.
 */
export default function Article() {
  const { slug } = useParams()
  const t = useTexte()
  const [article, setArticle] = useState(null)
  const [etat, setEtat] = useState('chargement')

  useEffect(() => {
    let vivant = true
    setEtat('chargement')

    fetch(`${API}/articles/${slug}`, { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((d) => { if (vivant) { setArticle(d); setEtat('ok') } })
      .catch(() => { if (vivant) setEtat('introuvable') })

    return () => { vivant = false }
  }, [slug])

  useDocumentMeta(
    article ? `${article.seo_titre || article.titre} — NovafriQ` : t('seo.actualites.titre'),
    article?.seo_description || article?.chapo || t('seo.actualites.description'),
  )

  if (etat === 'chargement') {
    return <div className="section section-light"><div className="container">Chargement…</div></div>
  }

  if (etat === 'introuvable') {
    return (
      <div className="section section-light">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="section-title">{t('erreur404.titre')}</h1>
          <p>{t('erreur404.texte')}</p>
          <Link className="btn-primary" to="/actualites">Retour aux actualités</Link>
        </div>
      </div>
    )
  }

  return (
    <div id="page-article">
      <PageHero crumb={article.categorie || t('actualites.hero.fil')} title={article.titre}>
        {article.chapo}
      </PageHero>

      <section className="section section-light">
        <div className="container article-contenu">
          {article.publie_le && (
            <time className="actualite-date" dateTime={article.publie_le}>
              {new Date(article.publie_le).toLocaleDateString('fr-FR', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
              {article.auteur && ` · ${article.auteur}`}
            </time>
          )}

          {article.couverture && (
            <img className="article-couverture" src={article.couverture} alt="" />
          )}

          {String(article.contenu || '')
            .split(/\n{2,}/)
            .filter((p) => p.trim())
            .map((p, i) => <p key={i}>{p}</p>)}

          <div style={{ marginTop: 36 }}>
            <Link className="btn-secondary on-light" to="/actualites">← Toutes les actualités</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
