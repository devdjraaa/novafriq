import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useTexte } from '../contenu/ContenuContext'
import './NotFound.css'

export default function NotFound() {
  const t = useTexte()

  useDocumentMeta(
    `${t('erreur404.titre')} — ${t('site.nom')}`,
    t('erreur404.texte'),
  )

  return (
    <div id="page-not-found">
      <div className="container not-found-content">
        <div className="not-found-code">404</div>
        <h1>{t('erreur404.titre')}</h1>
        <p>{t('erreur404.texte')}</p>
        <Link className="btn-primary" to="/">{t('erreur404.bouton')}</Link>
      </div>
    </div>
  )
}
