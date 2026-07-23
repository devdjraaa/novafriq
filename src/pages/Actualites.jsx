import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import PlaceholderImg from '../components/PlaceholderImg'
import Reveal from '../components/Reveal'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useContenu, useTexte } from '../contenu/ContenuContext'
import './Actualites.css'

const API = import.meta.env.VITE_API_URL || 'https://novafriqapi.novafriq.africa/api'

/**
 * Le blog.
 *
 * La page l'annonçait depuis la mise en ligne sans qu'il existe : trois cartes
 * « bientôt disponible » qui ne menaient nulle part. Elle affiche désormais les
 * articles réels.
 *
 * Les trois premiers arrivent avec le contenu du site — donc immédiatement,
 * même hors ligne. La suite est paginée et demandée à part : le blog grossit,
 * contrairement au reste du site.
 */
export default function Actualites() {
  const t = useTexte()
  const contenu = useContenu()
  const [articles, setArticles] = useState(contenu.articles || [])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)

  useDocumentMeta(t('seo.actualites.titre'), t('seo.actualites.description'))

  useEffect(() => {
    let vivant = true

    fetch(`${API}/articles?page=${page}`, { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((d) => {
        if (!vivant) return
        setArticles(d.donnees)
        setPages(d.pages)
      })
      .catch(() => {
        // On garde ce qui est déjà affiché : les trois articles livrés avec le
        // contenu du site. Une liste qui se vide sur une panne réseau serait
        // pire que rien.
      })

    return () => { vivant = false }
  }, [page])

  return (
    <div id="page-actualites">
      <PageHero crumb={t('actualites.hero.fil')} title={t('actualites.hero.titre')}>
        {t('actualites.hero.soustitre')}
      </PageHero>

      <section className="section section-light">
        <div className="container">
          {articles.length === 0 ? (
            <p className="actualites-vide">{t('actualites.vide')}</p>
          ) : (
            <div className="actualites-grid">
              {articles.map((a, i) => (
                <Reveal className="actualite-card" index={i} key={a.id}>
                  <Link to={`/actualites/${a.slug}`}>
                    {a.couverture
                      ? <img className="actualite-image" src={a.couverture} alt="" loading="lazy" />
                      : <PlaceholderImg variant="wide" label={a.categorie || 'Article'} />}
                    <div className="actualite-body">
                      {a.categorie && <span className="produit-status status-coming">{a.categorie}</span>}
                      <h3>{a.titre}</h3>
                      {a.chapo && <p>{a.chapo}</p>}
                      {a.publie_le && (
                        <time className="actualite-date" dateTime={a.publie_le}>
                          {new Date(a.publie_le).toLocaleDateString('fr-FR', {
                            day: 'numeric', month: 'long', year: 'numeric',
                          })}
                        </time>
                      )}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          {pages > 1 && (
            <div className="actualites-pagination">
              <button type="button" className="btn-secondary on-light" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                Précédent
              </button>
              <span>Page {page} sur {pages}</span>
              <button type="button" className="btn-secondary on-light" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>
                Suivant
              </button>
            </div>
          )}

          <div className="actualites-cta">
            <div className="section-label" style={{ justifyContent: 'center' }}>{t('actualites.cta.label')}</div>
            <h3>{t('actualites.cta.titre')}</h3>
            <p>{t('actualites.cta.texte')}</p>
            <Link className="btn-primary" to="/contact">{t('actualites.cta.bouton')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
