import { initials } from '../utils/helpers'

export default function Avatar({ name, color, size = 38, src }) {
  const style = {
    width: size,
    height: size,
    fontSize: size * 0.38,
    background: color || 'var(--brand-500)',
  }
  return (
    <span className="avatar" style={style} title={name}>
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', borderRadius: '99px' }} />
      ) : (
        initials(name)
      )}
    </span>
  )
}
