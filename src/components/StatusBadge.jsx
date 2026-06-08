import { STATUS } from '../data/mockData'

export default function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.pendente
  return (
    <span className={`badge ${s.badge}`}>
      <span className="dot" />
      {s.label}
    </span>
  )
}
