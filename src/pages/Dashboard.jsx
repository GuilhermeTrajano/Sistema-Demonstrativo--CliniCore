import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  AlertTriangle,
  CalendarCheck,
  ChevronRight,
  Clock,
  DollarSign,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useData } from '../context/DataContext'
import {
  REFERENCE_DATE,
  monthlyRevenue,
  opportunityQueue,
  specialtyDistribution,
} from '../data/mockData'
import { currency, formatDateLong } from '../utils/helpers'
import Avatar from '../components/Avatar'
import StatusBadge from '../components/StatusBadge'
import './Dashboard.css'

const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const YEARS = [2025, 2026, 2027]

const weeklyConsultations = [
  { dia: 'Dom', consultas: 0 },
  { dia: 'Seg', consultas: 24 },
  { dia: 'Ter', consultas: 31 },
  { dia: 'Qua', consultas: 27 },
  { dia: 'Qui', consultas: 35 },
  { dia: 'Sex', consultas: 33 },
  { dia: 'Sáb', consultas: 18 },
]

const buildMonthlyConsultations = (month, year) => {
  const days = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: days }, (_, index) => {
    const day = index + 1
    const weekDay = new Date(year, month, day).getDay()
    const consultas = weekDay === 0 ? 0 : 18 + ((day * 7 + month * 3 + year) % 19)
    return {
      dia: String(day).padStart(2, '0'),
      consultas,
    }
  })
}

function StatCard({ icon: Icon, label, value, foot, tone = 'blue' }) {
  return (
    <div className={`card stat-card fade-up tone-${tone}`}>
      <div className="stat-top">
        <span className="stat-icon"><Icon size={20} /></span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-foot">{foot}</div>
    </div>
  )
}

export default function Dashboard() {
  const { appointments, patients, doctors } = useData()
  const navigate = useNavigate()
  const now = new Date()
  const [chartMode, setChartMode] = useState('semana')
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth())
  const [selectedYear, setSelectedYear] = useState(now.getFullYear())

  const todayAppts = useMemo(
    () => appointments.filter((a) => a.date === REFERENCE_DATE),
    [appointments],
  )

  const activeAppts = todayAppts.filter((a) => a.status !== 'cancelada')
  const waiting = patients.filter((p) => p.waitlist)
  const occupancy = Math.round((activeAppts.length / 16) * 100)
  const upcoming = activeAppts.sort((a, b) => a.time.localeCompare(b.time)).slice(0, 6)
  const consultationChartData = useMemo(
    () =>
      chartMode === 'semana'
        ? weeklyConsultations
        : buildMonthlyConsultations(Number(selectedMonth), Number(selectedYear)),
    [chartMode, selectedMonth, selectedYear],
  )

  return (
    <div className="dashboard">
      <section className="dash-hero fade-up">
        <div>
          <span className="hero-eyebrow">CliniCore - Plataforma Inteligente para Gestão de Clínicas</span>
          <h2>Operação clínica com agenda, pacientes e oportunidades no mesmo painel.</h2>
          <p style={{ textTransform: 'capitalize' }}>{formatDateLong(REFERENCE_DATE)}</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/agendamento')}>
          <CalendarCheck size={17} /> Nova consulta
        </button>
      </section>

      <div className="stat-grid">
        <StatCard icon={CalendarCheck} label="Consultas hoje" value={todayAppts.length} foot={`${occupancy}% da capacidade diária`} />
        <StatCard icon={TrendingUp} label="Taxa de ocupação" value={`${occupancy}%`} foot="Meta semanal entre 85% e 95%" tone="teal" />
        <StatCard icon={DollarSign} label="Receita prevista" value={currency(28400)} foot="Agenda confirmada de hoje" tone="green" />
        <StatCard icon={Users} label="Pacientes aguardando encaixe" value={waiting.length} foot={`${opportunityQueue.length} sugestões cadastradas`} tone="orange" />
      </div>

      <div className="dash-grid-2">
        <div className="card card-pad chart-card fade-up">
          <div className="chart-head">
            <div>
              <h3 className="section-title">
                {chartMode === 'semana' ? 'Consultas da semana' : 'Consultas do mês'}
              </h3>
              <p className="muted text-sm">
                {chartMode === 'semana'
                  ? 'Volume de atendimentos agendados.'
                  : `Volume de atendimentos em ${MONTHS[selectedMonth]} de ${selectedYear}.`}
              </p>
            </div>
            <div className="chart-filters">
              <div className="segmented-control" aria-label="Período do gráfico">
                <button
                  className={chartMode === 'semana' ? 'active' : ''}
                  onClick={() => setChartMode('semana')}
                  type="button"
                >
                  Semana
                </button>
                <button
                  className={chartMode === 'mes' ? 'active' : ''}
                  onClick={() => setChartMode('mes')}
                  type="button"
                >
                  Mês
                </button>
              </div>
              {chartMode === 'mes' && (
                <>
                  <select
                    className="select chart-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  >
                    {MONTHS.map((month, index) => (
                      <option key={month} value={index}>{month}</option>
                    ))}
                  </select>
                  <select
                    className="select chart-select year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                  >
                    {YEARS.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={270}>
            <AreaChart data={consultationChartData} margin={{ left: -18, right: 10, top: 8 }}>
              <defs>
                <linearGradient id="consultationsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 5" vertical={false} />
              <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis allowDecimals={false} domain={[0, 'dataMax + 6']} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip
                cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                formatter={(value) => [`${value} consultas`, 'Consultas']}
                labelFormatter={(label) =>
                  chartMode === 'semana'
                    ? label
                    : `${label}/${String(Number(selectedMonth) + 1).padStart(2, '0')}/${selectedYear}`
                }
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 24px rgba(15,23,42,0.12)',
                  fontSize: 13,
                }}
              />
              <Area
                type="monotone"
                dataKey="consultas"
                name="Consultas"
                stroke="#2563EB"
                strokeWidth={3}
                fill="url(#consultationsGradient)"
                activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff', fill: '#2563EB' }}
                dot={{ r: 2.5, strokeWidth: 1.5, stroke: '#fff', fill: '#2563EB' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card card-pad fade-up opportunity-mini">
          <div className="row gap-2 center" style={{ marginBottom: 12 }}>
            <Sparkles size={18} className="brand-ico" />
            <h3 className="section-title">Central de oportunidades</h3>
          </div>
          <div className="slot-alert">
            <AlertTriangle size={18} />
            <div>
              <strong>Vaga aberta às 15h</strong>
              <span>Sugestão automática: Ana Costa</span>
            </div>
          </div>
          {opportunityQueue.slice(0, 3).map((item) => {
            const p = patients.find((x) => x.id === item.patientId)
            return (
              <div className="opportunity-row" key={item.id}>
                <Avatar name={p?.name} size={36} />
                <div className="grow">
                  <div className="fw-700">{p?.name}</div>
                  <div className="cell-sub">Disponibilidade: {item.availability.join(', ')}</div>
                </div>
              </div>
            )
          })}
          <button className="btn btn-secondary btn-block" onClick={() => navigate('/oportunidades')}>
            Abrir central <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="dash-grid-2b">
        <div className="card card-pad fade-up">
          <h3 className="section-title" style={{ marginBottom: 4 }}>Receita mensal</h3>
          <p className="muted text-sm" style={{ marginBottom: 16 }}>Primeiro semestre de 2026</p>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={monthlyRevenue} margin={{ left: -6, right: 6, top: 6 }}>
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip cursor={{ fill: 'rgba(37,99,235,0.06)' }} formatter={(v) => [currency(v), 'Receita']} contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }} />
              <Bar dataKey="receita" radius={[6, 6, 0, 0]} maxBarSize={42}>
                {monthlyRevenue.map((_, i) => <Cell key={i} fill={i === monthlyRevenue.length - 1 ? '#2563EB' : '#cbd5e1'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card card-pad fade-up">
          <h3 className="section-title" style={{ marginBottom: 4 }}>Distribuição por especialidade</h3>
          <p className="muted text-sm" style={{ marginBottom: 8 }}>Mix de atendimentos do mês</p>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={specialtyDistribution} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82} paddingAngle={3} stroke="none">
                {specialtyDistribution.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12.5 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card fade-up">
        <div className="row between center card-pad" style={{ paddingBottom: 14 }}>
          <div>
            <h3 className="section-title">Próximas consultas de hoje</h3>
            <p className="muted text-sm">Agenda em tempo real</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/agenda')}>Ver agenda <ChevronRight size={15} /></button>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead><tr><th>Horário</th><th>Paciente</th><th>Médico</th><th>Tipo</th><th>Status</th></tr></thead>
            <tbody>
              {upcoming.map((a) => {
                const p = patients.find((x) => x.id === a.patientId)
                const d = doctors.find((x) => x.id === a.doctorId)
                return (
                  <tr key={a.id}>
                    <td><span className="time-pill"><Clock size={13} /> {a.time}</span></td>
                    <td><div className="row gap-3 center"><Avatar name={p?.name} size={34} /><span className="fw-600">{p?.name}</span></div></td>
                    <td><div className="row gap-2 center"><span className="doc-dot" style={{ background: d?.color }} /><span className="text-sm">{d?.name}</span></div></td>
                    <td><span className="badge badge-neutral">{a.type}</span></td>
                    <td><StatusBadge status={a.status} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
