import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Activity,
  CalendarCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Login.css'

const GT_CORE_URL = 'https://gtcore.vercel.app/'

function GTCoreLink({ children }) {
  return (
    <a className="gtcore-link" href={GT_CORE_URL} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('demonstrativo@clinicore.com')
  const [password, setPassword] = useState('teste1234')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      login(email)
      navigate('/')
    }, 500)
  }

  return (
    <div className="login-page">
      <aside className="login-hero">
        <div className="login-hero-bg" />
        <div className="login-brand">
          <span className="login-logo"><Activity size={22} /></span>
          <span>CliniCore <small>by <GTCoreLink>GT Core</GTCoreLink></small></span>
        </div>

        <div className="login-hero-content">
          <span className="hero-pill"><Sparkles size={15} /> Plataforma inteligente</span>
          <h1>Gestão de clínicas com agenda viva.</h1>
          <p>
            Dashboard analítico, agenda inteligente, timeline de pacientes e sugestões
            automáticas para ocupar horários vagos.
          </p>

          <ul className="login-features">
            <li><span className="lf-icon"><CalendarCheck size={18} /></span> Ocupação semanal e encaixes sugeridos</li>
            <li><span className="lf-icon"><Users size={18} /></span> Cadastro moderno com histórico em timeline</li>
            <li><span className="lf-icon"><Activity size={18} /></span> Indicadores para decisão operacional</li>
          </ul>
        </div>

        <div className="login-hero-foot">
          <ShieldCheck size={15} /> Ambiente demonstrativo - dados 100% mockados
        </div>
      </aside>

      <main className="login-form-wrap">
        <form className="login-form" onSubmit={submit}>
          <div className="login-form-head">
            <span className="login-logo login-logo-sm"><Stethoscope size={20} /></span>
            <h2><GTCoreLink>GT Core</GTCoreLink> Demo</h2>
            <p className="muted">Sistema de Gestão para Clínicas</p>
          </div>

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <div className="input-icon">
              <Mail size={17} />
              <input id="email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password">Senha</label>
            <div className="input-icon">
              <Lock size={17} />
              <input id="password" className="input" type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" className="pass-toggle" onClick={() => setShowPass((s) => !s)} aria-label="Mostrar senha">
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar no painel'}
          </button>

          <div className="login-demo-hint">
            <strong>Login demonstrativo:</strong> qualquer e-mail e senha funcionam.
          </div>
        </form>
      </main>
    </div>
  )
}
