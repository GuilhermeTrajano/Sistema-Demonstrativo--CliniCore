import { createContext, useContext, useMemo, useState } from 'react'
import {
  doctors as seedDoctors,
  patients as seedPatients,
  appointments as seedAppointments,
} from '../data/mockData'

const DataContext = createContext(null)

let idCounter = 1000
const nextId = (prefix) => `${prefix}${++idCounter}`

export function DataProvider({ children }) {
  const [doctors] = useState(seedDoctors)
  const [patients, setPatients] = useState(seedPatients)
  const [appointments, setAppointments] = useState(seedAppointments)

  const addPatient = (data) => {
    const patient = { id: nextId('p'), lastVisit: null, ...data }
    setPatients((prev) => [patient, ...prev])
    return patient
  }

  const updatePatient = (id, data) => {
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))
  }

  const removePatient = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id))
  }

  const addAppointment = (data) => {
    const appt = { id: nextId('a'), status: 'pendente', duration: 30, ...data }
    setAppointments((prev) => [...prev, appt])
    return appt
  }

  const updateAppointmentStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a)),
    )
  }

  const removeAppointment = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id))
  }

  // Helpers de junção
  const getPatient = (id) => patients.find((p) => p.id === id)
  const getDoctor = (id) => doctors.find((d) => d.id === id)

  const value = useMemo(
    () => ({
      doctors,
      patients,
      appointments,
      addPatient,
      updatePatient,
      removePatient,
      addAppointment,
      updateAppointmentStatus,
      removeAppointment,
      getPatient,
      getDoctor,
    }),
    [doctors, patients, appointments],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData deve ser usado dentro de DataProvider')
  return ctx
}
