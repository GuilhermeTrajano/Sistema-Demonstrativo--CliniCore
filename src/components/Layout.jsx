import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Activity,
  CalendarDays,
  CalendarPlus,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Stethoscope,
  UserRound,
  Users,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Layout.css'

const GT_CORE_URL = 'https://gtcore.vercel.app/'

function GTCoreLink({ children, className = '' }) {
  return (
    <a className={`gtcore-link ${className}`} href={GT_CORE_URL} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function UserAvatar({ size = 36 }) {
  return (
    <span className="user-avatar" style={{ width: size, height: size }}>
      <UserRound size={Math.round(size * 0.58)} />
    </span>
  )
}

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/agenda', label: 'Agenda Inteligente', icon: CalendarDays },
  { to: '/agendamento', label: 'Agendamento', icon: CalendarPlus },
  { to: '/pacientes', label: 'Pacientes', icon: Users },
  { to: '/medicos', label: 'Médicos', icon: Stethoscope },
  { to: '/oportunidades', label: 'Oportunidades', icon: Sparkles },
]

const PAGE_META = {
  '/': { title: 'Dashboard', sub: 'Visão operacional da clínica' },
  '/agenda': { title: 'Agenda Inteligente', sub: 'Horários e encaixes em tempo real' },
  '/agendamento': { title: 'Agendamento', sub: 'Nova consulta com resumo dinâmico' },
  '/pacientes': { title: 'Pacientes', sub: 'Cadastro, busca e timeline clínica' },
  '/medicos': { title: 'Corpo Clínico', sub: 'Disponibilidade e performance da equipe' },
  '/oportunidades': { title: 'Central de Oportunidades', sub: 'Sugestões automáticas para ocupar vagas abertas' },
}

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const meta = PAGE_META[location.pathname] || PAGE_META['/']

  const doLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-logo">
            <Activity size={20} />
          </span>
          <div>
            <div className="sidebar-name">CliniCore</div>
            <div className="sidebar-tag">by <GTCoreLink>GT Core</GTCoreLink></div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-section">Produto demo</span>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={19} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-foot">
          <div className="sidebar-promo">
            <div className="promo-icon"><Sparkles size={18} /></div>
            <div className="promo-title">Sugestão de encaixe</div>
            <div className="promo-text">Vaga aberta às 15h com paciente compatível na fila.</div>
            <button className="btn btn-secondary btn-sm btn-block" onClick={() => navigate('/oportunidades')}>
              Ver oportunidades
            </button>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="topbar-left">
            <div className="topbar-brandblock">
              <div className="demo-kicker"><GTCoreLink>GT Core</GTCoreLink> Demo</div>
              <h1 className="topbar-title">Sistema de Gestão para Clínicas</h1>
              <p className="topbar-sub">{meta.title} - {meta.sub}</p>
            </div>
          </div>

          <div className="topbar-right">
            <div className="user-menu">
              <button className="user-trigger" onClick={() => setMenuOpen((o) => !o)}>
                <UserAvatar size={36} />
                <div className="user-info">
                  <div className="user-name">{user?.name}</div>
                  <div className="user-role">{user?.email}</div>
                </div>
                <ChevronDown size={16} className="muted" />
              </button>

              {menuOpen && (
                <>
                  <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
                  <div className="dropdown">
                    <div className="dropdown-head">
                      <UserAvatar size={40} />
                      <div>
                        <div className="user-name">{user?.name}</div>
                        <div className="user-role text-xs">{user?.email}</div>
                      </div>
                    </div>
                    <button className="dropdown-item danger" onClick={doLogout}>
                      <LogOut size={16} /> Sair
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
        <footer className="app-footer">
          © <GTCoreLink>GT Core</GTCoreLink> — Projeto de Portfólio
        </footer>
      </div>
    </div>
  )
}
