import { useMemo, useState } from 'react'
import { CalendarClock, Mail, Phone, Plus, Search, Trash2, UserPlus, Users, Droplet, Clock3 } from 'lucide-react'
import { useData } from '../context/DataContext'
import { patientTimeline } from '../data/mockData'
import { age, formatDate } from '../utils/helpers'
import Avatar from '../components/Avatar'
import Modal from '../components/Modal'
import '../styles/pages.css'

const EMPTY = {
  name: '',
  cpf: '',
  birth: '',
  gender: 'Feminino',
  phone: '',
  email: '',
  bloodType: 'O+',
  city: '',
  insurance: 'Particular',
  waitlist: false,
}

const INSURANCES = ['Particular', 'Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil']
const BLOOD = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']

export default function Patients() {
  const { patients, addPatient, removePatient } = useData()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('todos')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return patients
      .filter((p) => filter === 'todos' || (filter === 'espera' ? p.waitlist : p.insurance === filter))
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.cpf.includes(q) || p.email.toLowerCase().includes(q))
  }, [patients, query, filter])

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Informe o nome'
    if (!form.birth) e.birth = 'Informe a data'
    if (!form.phone.trim()) e.phone = 'Informe o telefone'
    setErrors(e)
    return Object.keys(e).length === 0
  }
  const submit = () => {
    if (!validate()) return
    addPatient(form)
    setForm(EMPTY)
    setErrors({})
    setOpen(false)
  }

  const timeline = selected
    ? patientTimeline[selected.id] || [
        { date: '05/06', title: 'Consulta realizada', detail: 'Atendimento registrado no prontuário.' },
        { date: '12/06', title: 'Exames anexados', detail: 'Documentos e resultados vinculados ao paciente.' },
        { date: '18/06', title: 'Retorno agendado', detail: 'Nova consulta criada pela equipe de atendimento.' },
        { date: '25/06', title: 'Prescrição atualizada', detail: 'Medicação e orientações revisadas.' },
      ]
    : []

  return (
    <div className="page">
      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={17} />
            <input placeholder="Buscar por nome, CPF ou e-mail..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="filter-pills">
            {['todos', 'espera', 'Unimed', 'Particular'].map((item) => (
              <button key={item} className={`filter-pill ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)}>
                {item === 'espera' ? 'Fila de encaixe' : item}
              </button>
            ))}
          </div>
          <span className="count-tag">{filtered.length} pacientes</span>
        </div>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          <UserPlus size={17} /> Novo paciente
        </button>
      </div>

      <div className="patient-card-grid">
        {filtered.map((p) => (
          <article className="patient-card card fade-up" key={p.id} onClick={() => setSelected(p)}>
            <div className="row between center">
              <div className="cell-main">
                <Avatar name={p.name} size={44} />
                <div>
                  <div className="fw-700">{p.name}</div>
                  <div className="cell-sub">{p.cpf}</div>
                </div>
              </div>
              {p.waitlist && <span className="badge badge-warning">Encaixe</span>}
            </div>
            <div className="patient-info-grid">
              <span><Phone size={14} /> {p.phone}</span>
              <span><Mail size={14} /> {p.email}</span>
              <span><Droplet size={14} /> {p.bloodType}</span>
              <span><CalendarClock size={14} /> {formatDate(p.lastVisit)}</span>
            </div>
            <div className="row between center">
              <span className="badge badge-neutral">{p.insurance}</span>
              <span className="text-sm muted">{age(p.birth)} anos</span>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="card empty">
            <Users size={40} />
            <div className="fw-600">Nenhum paciente encontrado</div>
            <div className="text-sm">Tente outra busca ou cadastre um novo paciente.</div>
          </div>
        )}
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
        subtitle="Timeline do paciente"
        width={720}
        footer={<button className="btn btn-secondary" onClick={() => setSelected(null)}>Fechar</button>}
      >
        {selected && (
          <div className="patient-timeline-wrap">
            <div className="timeline-profile">
              <Avatar name={selected.name} size={52} />
              <div>
                <div className="fw-700">{selected.insurance} - {selected.phone}</div>
                <div className="cell-sub">{selected.email}</div>
              </div>
              <button className="icon-action danger" title="Remover" onClick={() => { removePatient(selected.id); setSelected(null) }}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="patient-timeline">
              {timeline.map((item) => (
                <div className="timeline-item" key={`${item.date}-${item.title}`}>
                  <div className="timeline-date">{item.date}</div>
                  <div className="timeline-dot"><Clock3 size={14} /></div>
                  <div className="timeline-content">
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Cadastrar paciente"
        subtitle="Preencha os dados do novo paciente"
        width={620}
        footer={<><button className="btn btn-secondary" onClick={() => setOpen(false)}>Cancelar</button><button className="btn btn-primary" onClick={submit}><Plus size={16} /> Cadastrar</button></>}
      >
        <div className="form-grid">
          <div className="field full">
            <label>Nome completo</label>
            <input className="input" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ex.: Maria da Silva" style={errors.name ? { borderColor: 'var(--danger)' } : undefined} />
            {errors.name && <span className="field-hint" style={{ color: 'var(--danger)' }}>{errors.name}</span>}
          </div>
          <div className="field"><label>CPF</label><input className="input" value={form.cpf} onChange={(e) => set('cpf', e.target.value)} placeholder="000.000.000-00" /></div>
          <div className="field"><label>Data de nascimento</label><input className="input" type="date" value={form.birth} onChange={(e) => set('birth', e.target.value)} style={errors.birth ? { borderColor: 'var(--danger)' } : undefined} />{errors.birth && <span className="field-hint" style={{ color: 'var(--danger)' }}>{errors.birth}</span>}</div>
          <div className="field"><label>Telefone</label><input className="input" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(11) 90000-0000" style={errors.phone ? { borderColor: 'var(--danger)' } : undefined} />{errors.phone && <span className="field-hint" style={{ color: 'var(--danger)' }}>{errors.phone}</span>}</div>
          <div className="field"><label>E-mail</label><input className="input" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="email@exemplo.com" /></div>
          <div className="field"><label>Tipo sanguíneo</label><select className="select" value={form.bloodType} onChange={(e) => set('bloodType', e.target.value)}>{BLOOD.map((b) => <option key={b}>{b}</option>)}</select></div>
          <div className="field"><label>Convênio</label><select className="select" value={form.insurance} onChange={(e) => set('insurance', e.target.value)}>{INSURANCES.map((i) => <option key={i}>{i}</option>)}</select></div>
          <label className="checkbox full"><input type="checkbox" checked={form.waitlist} onChange={(e) => set('waitlist', e.target.checked)} /> Inserir na fila de encaixe</label>
        </div>
      </Modal>
    </div>
  )
}
