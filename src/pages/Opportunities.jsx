import { useMemo, useState } from 'react'
import { CheckCircle2, Clock, Lightbulb, Sparkles, UserRoundCheck } from 'lucide-react'
import { useData } from '../context/DataContext'
import { opportunityQueue, REFERENCE_DATE } from '../data/mockData'
import Avatar from '../components/Avatar'
import '../styles/pages.css'
import './Opportunities.css'

export default function Opportunities() {
  const { appointments, patients, getPatient, getDoctor, updateAppointmentStatus } = useData()
  const [filled, setFilled] = useState([])

  const openSlots = useMemo(
    () => appointments.filter((a) => a.date === REFERENCE_DATE && a.status === 'cancelada'),
    [appointments],
  )

  const fillSlot = (appointmentId) => {
    setFilled((prev) => [...prev, appointmentId])
    updateAppointmentStatus(appointmentId, 'confirmada')
  }

  return (
    <div className="page opportunities-page">
      <section className="opportunities-hero card fade-up">
        <div>
          <span className="hero-eyebrow">CliniCore - Central de Oportunidades</span>
          <h2>Transforme cancelamentos em encaixes inteligentes.</h2>
          <p>Pacientes aguardando vaga são priorizados por disponibilidade e especialidade.</p>
        </div>
        <div className="op-hero-metric">
          <strong>{openSlots.length}</strong>
          <span>vagas abertas hoje</span>
        </div>
      </section>

      <div className="opportunity-layout">
        <div className="card card-pad fade-up">
          <div className="row gap-2 center" style={{ marginBottom: 16 }}>
            <Clock size={18} className="brand-ico" />
            <h3 className="section-title">Vagas abertas por cancelamento</h3>
          </div>

          <div className="open-slot-list">
            {openSlots.map((slot) => {
              const doctor = getDoctor(slot.doctorId)
              const suggested = slot.suggestedPatientId ? getPatient(slot.suggestedPatientId) : patients.find((p) => p.waitlist)
              const done = filled.includes(slot.id) || slot.status === 'confirmada'
              return (
                <article className="open-slot" key={slot.id}>
                  <div className="open-slot-time">
                    <strong>{slot.time}</strong>
                    <span>{doctor?.room}</span>
                  </div>
                  <div className="grow">
                    <div className="fw-700">{doctor?.name}</div>
                    <div className="cell-sub">{doctor?.specialty} - {slot.type}</div>
                    <div className="slot-suggestion">
                      <Lightbulb size={14} />
                      Sugestão automática: <strong>{suggested?.name}</strong>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm" disabled={done} onClick={() => fillSlot(slot.id)}>
                    {done ? <CheckCircle2 size={15} /> : <UserRoundCheck size={15} />}
                    {done ? 'Encaixado' : 'Usar sugestão'}
                  </button>
                </article>
              )
            })}
          </div>
        </div>

        <div className="card card-pad fade-up">
          <div className="row gap-2 center" style={{ marginBottom: 16 }}>
            <Sparkles size={18} className="brand-ico" />
            <h3 className="section-title">Pacientes aguardando vaga</h3>
          </div>

          <div className="waitlist">
            {opportunityQueue.map((item) => {
              const patient = getPatient(item.patientId)
              return (
                <article className="wait-card" key={item.id}>
                  <Avatar name={patient?.name} size={42} />
                  <div className="grow">
                    <strong>{patient?.name}</strong>
                    <p>{item.need}</p>
                    <div className="availability">
                      {item.availability.map((a) => <span key={a}>{a}</span>)}
                    </div>
                    <div className="cell-sub">{item.match}</div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
