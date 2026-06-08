import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, CalendarPlus, Check, ChevronLeft, ChevronRight, Clock, Lightbulb, Stethoscope, X } from 'lucide-react'
import { useData } from '../context/DataContext'
import { REFERENCE_DATE, STATUS, TIME_SLOTS } from '../data/mockData'
import { formatDateLong } from '../utils/helpers'
import Avatar from '../components/Avatar'
import StatusBadge from '../components/StatusBadge'
import './Agenda.css'

const shiftDate = (iso, days) => {
  const d = new Date(iso + 'T00:00:00')
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default function Agenda() {
  const { appointments, doctors, getPatient, getDoctor, updateAppointmentStatus } = useData()
  const navigate = useNavigate()
  const [date, setDate] = useState(REFERENCE_DATE)
  const [doctorFilter, setDoctorFilter] = useState('all')

  const dayAppts = useMemo(() => appointments
    .filter((a) => a.date === date)
    .filter((a) => doctorFilter === 'all' || a.doctorId === doctorFilter), [appointments, date, doctorFilter])

  const byTime = useMemo(() => {
    const map = {}
    dayAppts.forEach((a) => {
      ;(map[a.time] = map[a.time] || []).push(a)
    })
    return map
  }, [dayAppts])

  const stats = useMemo(() => {
    const s = { total: dayAppts.length, confirmada: 0, pendente: 0, cancelada: 0 }
    dayAppts.forEach((a) => (s[a.status] = (s[a.status] || 0) + 1))
    return s
  }, [dayAppts])

  return (
    <div className="page">
      <div className="agenda-bar card">
        <div className="agenda-nav">
          <button className="btn btn-secondary btn-icon" onClick={() => setDate(shiftDate(date, -1))}><ChevronLeft size={18} /></button>
          <div className="agenda-date">
            <CalendarDays size={18} className="brand-ico" />
            <div>
              <div className="agenda-date-main">{formatDateLong(date)}</div>
              <div className="agenda-date-sub">{date === REFERENCE_DATE ? 'Hoje' : 'Outro dia'} - {stats.total} consultas</div>
            </div>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={() => setDate(shiftDate(date, 1))}><ChevronRight size={18} /></button>
          {date !== REFERENCE_DATE && <button className="btn btn-ghost btn-sm" onClick={() => setDate(REFERENCE_DATE)}>Hoje</button>}
        </div>

        <div className="agenda-actions">
          <select className="select agenda-select" value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)}>
            <option value="all">Todos os médicos</option>
            {doctors.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <button className="btn btn-primary" onClick={() => navigate('/agendamento')}><CalendarPlus size={17} /> Agendar</button>
        </div>
      </div>

      <div className="agenda-stats">
        <div className="agenda-stat"><span className="as-num">{stats.total}</span><span className="as-lbl">Total</span></div>
        <div className="agenda-stat" style={{ borderColor: STATUS.confirmada.color }}><span className="as-num" style={{ color: STATUS.confirmada.color }}>{stats.confirmada}</span><span className="as-lbl">Confirmadas</span></div>
        <div className="agenda-stat" style={{ borderColor: STATUS.pendente.color }}><span className="as-num" style={{ color: STATUS.pendente.color }}>{stats.pendente}</span><span className="as-lbl">Pendentes</span></div>
        <div className="agenda-stat" style={{ borderColor: STATUS.cancelada.color }}><span className="as-num" style={{ color: STATUS.cancelada.color }}>{stats.cancelada}</span><span className="as-lbl">Canceladas</span></div>
      </div>

      <div className="card timeline fade-up">
        {TIME_SLOTS.map((time) => {
          const items = byTime[time] || []
          return (
            <div className="slot" key={time}>
              <div className="slot-time"><Clock size={13} /> {time}</div>
              <div className="slot-body">
                {items.length === 0 ? (
                  <div className="slot-empty">
                    <span>Horario livre</span>
                    <em><Lightbulb size={14} /> Sugestão de encaixe disponível</em>
                  </div>
                ) : items.map((a) => {
                  const p = getPatient(a.patientId)
                  const d = getDoctor(a.doctorId)
                  const suggested = a.suggestedPatientId ? getPatient(a.suggestedPatientId) : null
                  return (
                    <div className={`appt-card status-${a.status}`} key={a.id} style={{ '--doc': d?.color }}>
                      <div className="appt-main">
                        <Avatar name={p?.name} size={38} color={d?.color} />
                        <div className="appt-info">
                          <div className="appt-patient">{p?.name}</div>
                          <div className="appt-meta"><Stethoscope size={12} style={{ color: d?.color }} />{d?.name} - {a.type}</div>
                          {a.notes && <div className="appt-notes">{a.notes}</div>}
                          {suggested && (
                            <div className="smart-note idea"><Lightbulb size={14} /> Sugestão automática: {suggested.name}</div>
                          )}
                        </div>
                      </div>
                      <div className="appt-side">
                        <StatusBadge status={a.status} />
                        {a.status !== 'cancelada' && (
                          <div className="appt-quick">
                            {a.status !== 'confirmada' && <button className="qbtn confirm" title="Confirmar" onClick={() => updateAppointmentStatus(a.id, 'confirmada')}><Check size={15} /></button>}
                            <button className="qbtn cancel" title="Cancelar" onClick={() => updateAppointmentStatus(a.id, 'cancelada')}><X size={15} /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
