import { ImageIcon } from './icons'

export default function PlaceholderImg({ variant, icon, label, dim, className = '' }) {
  const classes = ['placeholder-img', variant, className].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      {icon ?? <ImageIcon />}
      <span>{label}</span>
      {dim && <span className="ph-dim">{dim}</span>}
    </div>
  )
}
