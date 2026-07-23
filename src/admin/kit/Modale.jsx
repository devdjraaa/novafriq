import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * Fenêtre modale du back-office.
 *
 * Structure imposée, et c'est tout l'intérêt : hauteur plafonnée, en-tête et
 * pied fixes, corps qui défile. Le défaut corrigé sur Gextimo venait de
 * l'absence de ces trois règles — une fenêtre sans plafond, centrée
 * verticalement, rend le HAUT de son contenu inatteignable dès qu'il dépasse
 * l'écran. On ne peut plus le reproduire en passant par ici.
 *
 * Rendue dans un portail : à l'intérieur de la page, un parent avec
 * `overflow: hidden` ou un empilement de contextes suffit à la rogner.
 */
export default function Modale({ titre, sous, taille = 'md', onFermer, pied, children }) {
  const boite = useRef(null)

  useEffect(() => {
    const auClavier = (e) => { if (e.key === 'Escape') onFermer?.() }
    document.addEventListener('keydown', auClavier)

    // Le fond ne doit pas défiler sous la fenêtre : on se retrouve sinon à
    // faire glisser la page en croyant faire défiler le formulaire.
    const avant = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    boite.current?.focus()

    return () => {
      document.removeEventListener('keydown', auClavier)
      document.body.style.overflow = avant
    }
  }, [onFermer])

  return createPortal(
    <div
      className="adm-voile"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onFermer?.() }}
    >
      <div
        className={`adm-modale ${taille}`}
        role="dialog"
        aria-modal="true"
        aria-label={titre}
        tabIndex={-1}
        ref={boite}
      >
        <header>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2>{titre}</h2>
            {sous && <p>{sous}</p>}
          </div>
          <button type="button" className="adm-btn discret" onClick={onFermer} aria-label="Fermer">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="contenu">{children}</div>

        {pied && <footer>{pied}</footer>}
      </div>
    </div>,
    document.body,
  )
}
