import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastProvider } from './components/ToastContext'
import { ContenuProvider } from './contenu/ContenuContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Vision from './pages/Vision'
import Produits from './pages/Produits'
import Fondateur from './pages/Fondateur'
import Equipe from './pages/Equipe'
import Carrieres from './pages/Carrieres'
import Partenaires from './pages/Partenaires'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Actualites from './pages/Actualites'
import Article from './pages/Article'
import NotFound from './pages/NotFound'

/**
 * Le back-office est chargé À LA DEMANDE.
 *
 * C'est la contrepartie du choix de le loger dans le site plutôt que sur un
 * domaine séparé : un visiteur qui ne va jamais sur /admin ne télécharge pas
 * une ligne de son code.
 */
const AdminApp = lazy(() => import('./admin/AdminApp'))

function App() {
  return (
    <ContenuProvider>
      <ToastProvider>
        <BrowserRouter>
        <Routes>
          {/* Le back-office est hors du gabarit public : il a sa propre
              barre latérale, et l'en-tête du site n'a rien à y faire. */}
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div style={{ padding: 40 }}>Chargement…</div>}>
                <AdminApp />
              </Suspense>
            }
          />
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="vision" element={<Vision />} />
            <Route path="produits" element={<Produits />} />
            <Route path="fondateur" element={<Fondateur />} />
            <Route path="equipe" element={<Equipe />} />
            <Route path="carrieres" element={<Carrieres />} />
            <Route path="partenaires" element={<Partenaires />} />
            <Route path="faq" element={<Faq />} />
            <Route path="actualites" element={<Actualites />} />
            <Route path="actualites/:slug" element={<Article />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ContenuProvider>
  )
}

export default App
