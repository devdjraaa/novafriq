export default function PageHero({ crumb, title, children }) {
  return (
    <div className="page-hero">
      <div className="hero-bg-pattern"></div>
      <div className="container">
        <div className="breadcrumb">Accueil › <span>{crumb}</span></div>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </div>
  )
}
