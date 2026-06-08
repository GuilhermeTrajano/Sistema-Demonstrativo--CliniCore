import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BadgeCheck,
  CalendarPlus,
  Mail,
  MapPin,
  Phone,
  Search,
  Star,
  Users,
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { REFERENCE_DATE } from '../data/mockData'
import Avatar from '../components/Avatar'
import '../styles/pages.css'
import './Doctors.css'

export default function Doctors() {
  const { doctors, appointments } = useData()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const todayCountByDoctor = useMemo(() => {
    const map = {}
    appointments
      .filter((a) => a.date === REFERENCE_DATE && a.status !== 'cancelada')
      .forEach((a) => (map[a.doctorId] = (map[a.doctorId] || 0) + 1))
    return map
  }, [appointments])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return doctors
      .filter((d) => (filter === 'all' ? true : filter === 'available' ? d.available : !d.available))
      .filter((d) => !q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q))
  }, [doctors, query, filter])

  return (
    <div className="page">
      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={17} />
            <input
              placeholder="Buscar médico ou especialidade..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="filter-pills">
            <button className={`filter-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              Todos
            </button>
            <button className={`filter-pill ${filter === 'available' ? 'active' : ''}`} onClick={() => setFilter('available')}>
              Disponíveis
            </button>
            <button className={`filter-pill ${filter === 'off' ? 'active' : ''}`} onClick={() => setFilter('off')}>
              Indisponíveis
            </button>
          </div>
        </div>
        <span className="count-tag">{filtered.length} médicos</span>
      </div>

      <div className="doctor-grid">
        {filtered.map((d) => (
          <div className="card doctor-card fade-up" key={d.id}>
            <div className="doc-banner" style={{ background: d.color }} />
            <div className="doc-head">
              <Avatar name={d.name} size={62} color={d.color} />
              <span className={`avail-badge ${d.available ? 'on' : 'off'}`}>
                <span className="dot" />
                {d.available ? 'Disponível' : 'Indisponível'}
              </span>
            </div>

            <div className="doc-body">
              <div className="doc-name">
                {d.name}
                <BadgeCheck size={16} className="verified" />
              </div>
              <div className="doc-spec" style={{ color: d.color }}>{d.specialty}</div>
              <div className="doc-crm">{d.crm}</div>

              <div className="doc-stats">
                <div className="doc-stat">
                  <Star size={15} className="star" />
                  <span className="fw-700">{d.rating}</span>
                  <span className="soft text-xs">avaliação</span>
                </div>
                <div className="doc-stat">
                  <Users size={15} className="soft" />
                  <span className="fw-700">{d.patients}</span>
                  <span className="soft text-xs">pacientes</span>
                </div>
              </div>

              <div className="doc-meta">
                <div className="dm-row"><MapPin size={14} className="soft" /> {d.room}</div>
                <div className="dm-row"><Phone size={14} className="soft" /> {d.phone}</div>
                <div className="dm-row"><Mail size={14} className="soft" /> {d.email}</div>
              </div>

              <div className="doc-footer">
                <div className="doc-today">
                  <strong>{todayCountByDoctor[d.id] || 0}</strong> consultas hoje
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/agendamento')}>
                  <CalendarPlus size={15} /> Agendar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card">
          <div className="empty">
            <Users size={40} />
            <div className="fw-600">Nenhum médico encontrado</div>
          </div>
        </div>
      )}
    </div>
  )
}
