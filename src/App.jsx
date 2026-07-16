import logo from './assets/novafriq-logo.png'
import './App.css'

// Page d'attente NOVAFRIQ GROUPE — le site complet arrive.
function App() {
  return (
    <main className="soon">
      <img src={logo} alt="NovAfriq" className="soon-logo" />
      <h1 className="soon-title">NOVAFRIQ</h1>
      <p className="soon-badge">Bientôt disponible</p>
      <p className="soon-text">
        L&apos;écosystème technologique africain se prépare.
        <br />
        Notre site officiel arrive très prochainement.
      </p>
      <div className="soon-links">
        <a href="https://gextimo.novafriq.africa" className="soon-btn">
          Découvrir Gextimo
        </a>
        <a href="mailto:contact@novafriq.africa" className="soon-btn ghost">
          Nous contacter
        </a>
      </div>
      <footer className="soon-footer">
        © {new Date().getFullYear()} NOVAFRIQ GROUPE — Sèmè-Podji, Bénin
      </footer>
    </main>
  )
}

export default App
