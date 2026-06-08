import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const DEMO_USER = {
  name: 'Administrador',
  role: 'Administrador',
  email: 'demonstrativo@clinicore.com',
  initials: 'CC',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('clinicore_user')
      if (!saved) return null
      const parsed = JSON.parse(saved)
      return { ...DEMO_USER, email: parsed.email || DEMO_USER.email }
    } catch {
      return null
    }
  })

  const login = (email) => {
    const u = { ...DEMO_USER, email: email || DEMO_USER.email }
    sessionStorage.setItem('clinicore_user', JSON.stringify(u))
    setUser(u)
    return u
  }

  const logout = () => {
    sessionStorage.removeItem('clinicore_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
