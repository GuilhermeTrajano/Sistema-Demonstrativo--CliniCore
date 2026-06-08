import { useMemo, useState } from 'react'
import {
  CalendarCheck,
  CalendarPlus,
  CheckCircle2,
  Clock,
  FileText,
  Sparkles,
  Stethoscope,
  User,
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { TIME_SLOTS } from '../data/mockData'
import { formatDateLong, todayIso } from '../utils/helpers'
import Avatar from '../components/Avatar'
import './Scheduling.css'

const TYPES = ['Consulta', 'Retorno', 'Procedimento', 'Exame']

export default function Scheduling() {
  const { patients, doctors, appointments, addAppointment, getPatient, getDoctor } = useData()
  const [form, setForm] = useState({
    patientId: '',
    doctorId: '',
    date: todayIso(),
    time: '',
    type: 'Consulta',
    notes: '',
  })
  const [success, setSuccess] = useState(false)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const takenSlots = useMemo(() => {
    if (!form.doctorId || !form.date) return new Set()
    return new Set(
      appointments
        .filter((a) => a.doctorId === form.doctorId && a.date === form.date && a.status !== 'cancelada')
        .map((a) => a.time),
    )
  }, [appointments, form.doctorId, form.date])

  const canSubmit = form.patientId && form.doctorId && form.date && form.time

  const submit = () => {
    if (!canSubmit) return
    addAppointment({
      patientId: form.patientId,
      doctorId: form.doctorId,
      date: form.date,
      time: form.time,
      type: form.type,
      notes: form.notes,
      status: 'pendente',
    })
    setSuccess(true)
  }

  const reset = () => {
    setForm({ patientId: '', doctorId: '', date: todayIso(), time: '', type: 'Consulta', notes: '' })
    setSuccess(false)
  }

  const patient = getPatient(form.patientId)
  const doctor = getDoctor(form.doctorId)

  if (success) {
    return (
      <div className="page">
        <div className="card success-card fade-up">
          <div className="success-icon">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="page-title">Consulta agendada!</h2>
          <p className="page-subtitle" style={{ maxWidth: 420, textAlign: 'center' }}>
            A consulta foi registrada com status <strong>pendente</strong> e já aparece na agenda médica.
          </p>

          <div className="success-summary">
            <div className="ss-row">
              <User size={16} className="soft" />
              <span>{patient?.name}</span>
            </div>
            <div className="ss-row">
              <Stethoscope size={16} className="soft" />
              <span>{doctor?.name} · {doctor?.specialty}</span>
            </div>
            <div className="ss-row" style={{ textTransform: 'capitalize' }}>
              <CalendarCheck size={16} className="soft" />
              <span>{formatDateLong(form.date)}</span>
            </div>
            <div className="ss-row">
              <Clock size={16} className="soft" />
              <span>{form.time} · {form.type}</span>
            </div>
          </div>

          <div className="row gap-3">
            <button className="btn btn-primary" onClick={reset}>
              <CalendarPlus size={16} /> Agendar outra
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="sched-grid">
        <div className="card card-pad fade-up">
          <div className="sched-step">
            <span className="step-badge">1</span>
            <div>
              <h3 className="section-title">Paciente e médico</h3>
              <p className="muted text-sm">Selecione quem será atendido</p>
            </div>
          </div>

          <div className="form-grid" style={{ marginBottom: 24 }}>
            <div className="field">
              <label><User size={13} /> Paciente</label>
              <select className="select" value={form.patientId} onChange={(e) => set('patientId', e.target.value)}>
                <option value="">Selecione o paciente</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label><Stethoscope size={13} /> Médico</label>
              <select className="select" value={form.doctorId} onChange={(e) => set('doctorId', e.target.value)}>
                <option value="">Selecione o médico</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="sched-step">
            <span className="step-badge">2</span>
            <div>
              <h3 className="section-title">Data e horário</h3>
              <p className="muted text-sm">Escolha um horário disponível</p>
            </div>
          </div>

          <div className="form-grid" style={{ marginBottom: 16 }}>
            <div className="field">
              <label>Data</label>
              <input className="input" type="date" value={form.date} min={todayIso()} onChange={(e) => set('date', e.target.value)} />
            </div>
            <div className="field">
              <label>Tipo de atendimento</label>
              <select className="select" value={form.type} onChange={(e) => set('type', e.target.value)}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="field" style={{ marginBottom: 24 }}>
            <label>Horários {form.doctorId ? '' : '(selecione um médico)'}</label>
            <div className="slot-picker">
              {TIME_SLOTS.map((t) => {
                const taken = takenSlots.has(t)
                const disabled = !form.doctorId || taken
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={disabled}
                    className={`slot-chip ${form.time === t ? 'selected' : ''} ${taken ? 'taken' : ''}`}
                    onClick={() => set('time', t)}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
            {form.doctorId && <span className="field-hint">Horários em cinza já estão ocupados.</span>}
          </div>

          <div className="field">
            <label><FileText size={13} /> Observações (opcional)</label>
            <textarea
              className="textarea"
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              placeholder="Motivo da consulta, sintomas, instruções..."
            />
          </div>
        </div>

        <div className="card card-pad sched-summary fade-up">
          <div className="row gap-2 center" style={{ marginBottom: 16 }}>
            <Sparkles size={18} className="brand-ico" />
            <h3 className="section-title">Resumo do agendamento</h3>
          </div>

          {patient ? (
            <div className="summary-patient">
              <Avatar name={patient.name} size={44} />
              <div>
                <div className="fw-700">{patient.name}</div>
                <div className="cell-sub">{patient.insurance} · {patient.phone}</div>
              </div>
            </div>
          ) : (
            <div className="summary-empty">Nenhum paciente selecionado</div>
          )}

          <div className="summary-list">
            <div className="summary-item">
              <span className="si-label"><Stethoscope size={15} /> Médico</span>
              <span className="si-value">{doctor ? doctor.name : '-'}</span>
            </div>
            <div className="summary-item">
              <span className="si-label"><CalendarCheck size={15} /> Data</span>
              <span className="si-value" style={{ textTransform: 'capitalize' }}>
                {form.date ? formatDateLong(form.date) : '-'}
              </span>
            </div>
            <div className="summary-item">
              <span className="si-label"><Clock size={15} /> Horário</span>
              <span className="si-value">{form.time || '-'}</span>
            </div>
            <div className="summary-item">
              <span className="si-label"><FileText size={15} /> Tipo</span>
              <span className="si-value">{form.type}</span>
            </div>
          </div>

          <button className="btn btn-primary btn-block" disabled={!canSubmit} onClick={submit}>
            <CalendarPlus size={17} /> Confirmar agendamento
          </button>
          {!canSubmit && (
            <p className="field-hint" style={{ textAlign: 'center', marginTop: 10 }}>
              Preencha paciente, médico, data e horário.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
