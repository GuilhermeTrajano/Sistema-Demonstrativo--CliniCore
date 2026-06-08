const base = new Date()
const iso = (d) => d.toISOString().slice(0, 10)
export const REFERENCE_DATE = iso(base)
const addDays = (n) => {
  const d = new Date(base)
  d.setDate(d.getDate() + n)
  return iso(d)
}

export const STATUS = {
  confirmada: { key: 'confirmada', label: 'Confirmada', badge: 'badge-success', color: '#22C55E', bg: '#dcfce7' },
  pendente: { key: 'pendente', label: 'Pendente', badge: 'badge-warning', color: '#F59E0B', bg: '#fef3c7' },
  cancelada: { key: 'cancelada', label: 'Cancelada', badge: 'badge-danger', color: '#ef4444', bg: '#fee2e2' },
  concluida: { key: 'concluida', label: 'Concluída', badge: 'badge-info', color: '#2563EB', bg: '#dbeafe' },
}

export const doctors = [
  { id: 'd1', name: 'Dra. Helena Costa', specialty: 'Cardiologia', crm: 'CRM-SP 123456', email: 'helena@clinicore.demo', phone: '(11) 98123-4567', color: '#2563EB', rating: 4.9, patients: 312, available: true, room: 'Sala 04' },
  { id: 'd2', name: 'Dr. Rafael Almeida', specialty: 'Ortopedia', crm: 'CRM-SP 234567', email: 'rafael@clinicore.demo', phone: '(11) 98234-5678', color: '#0ea5a4', rating: 4.7, patients: 256, available: true, room: 'Sala 02' },
  { id: 'd3', name: 'Dra. Beatriz Lima', specialty: 'Dermatologia', crm: 'CRM-SP 345678', email: 'beatriz@clinicore.demo', phone: '(11) 98345-6789', color: '#8b5cf6', rating: 4.8, patients: 289, available: false, room: 'Sala 06' },
  { id: 'd4', name: 'Dr. Marcos Pereira', specialty: 'Pediatria', crm: 'CRM-SP 456789', email: 'marcos@clinicore.demo', phone: '(11) 98456-7890', color: '#F59E0B', rating: 4.9, patients: 401, available: true, room: 'Sala 01' },
  { id: 'd5', name: 'Dra. Camila Souza', specialty: 'Ginecologia', crm: 'CRM-SP 567890', email: 'camila@clinicore.demo', phone: '(11) 98567-8901', color: '#ec4899', rating: 4.6, patients: 198, available: true, room: 'Sala 05' },
  { id: 'd6', name: 'Dr. André Martins', specialty: 'Neurologia', crm: 'CRM-SP 678901', email: 'andre@clinicore.demo', phone: '(11) 98678-9012', color: '#06b6d4', rating: 4.8, patients: 167, available: true, room: 'Sala 03' },
  { id: 'd7', name: 'Dra. Juliana Rocha', specialty: 'Clínica Geral', crm: 'CRM-SP 789012', email: 'juliana@clinicore.demo', phone: '(11) 98789-0123', color: '#22C55E', rating: 4.7, patients: 345, available: false, room: 'Sala 07' },
  { id: 'd8', name: 'Dr. Felipe Carvalho', specialty: 'Oftalmologia', crm: 'CRM-SP 890123', email: 'felipe@clinicore.demo', phone: '(11) 98890-1234', color: '#64748b', rating: 4.9, patients: 223, available: true, room: 'Sala 08' },
]

export const patients = [
  { id: 'p1', name: 'Ana Costa', cpf: '123.456.789-01', birth: '1989-03-14', phone: '(11) 99101-2233', email: 'ana.costa@email.com', gender: 'Feminino', bloodType: 'O+', city: 'São Paulo', lastVisit: '2026-06-05', insurance: 'Unimed', waitlist: true, availability: ['manhã', 'terça-feira'] },
  { id: 'p2', name: 'Lucas Martins', cpf: '234.567.890-12', birth: '1976-11-02', phone: '(11) 99202-3344', email: 'lucas.martins@email.com', gender: 'Masculino', bloodType: 'A+', city: 'Guarulhos', lastVisit: '2026-06-01', insurance: 'Bradesco Saúde', waitlist: true, availability: ['quinta-feira', 'sexta-feira'] },
  { id: 'p3', name: 'Carla Mendes Oliveira', cpf: '345.678.901-23', birth: '1994-07-22', phone: '(11) 99303-4455', email: 'carla.mendes@email.com', gender: 'Feminino', bloodType: 'B+', city: 'São Paulo', lastVisit: '2026-05-19', insurance: 'SulAmérica', waitlist: false, availability: ['tarde'] },
  { id: 'p4', name: 'Daniel Augusto Ribeiro', cpf: '456.789.012-34', birth: '2001-01-09', phone: '(11) 99404-5566', email: 'daniel.ribeiro@email.com', gender: 'Masculino', bloodType: 'AB+', city: 'Osasco', lastVisit: '2026-06-04', insurance: 'Particular', waitlist: false, availability: ['manhã'] },
  { id: 'p5', name: 'Eduarda Nunes Castro', cpf: '567.890.123-45', birth: '1968-09-30', phone: '(11) 99505-6677', email: 'eduarda.castro@email.com', gender: 'Feminino', bloodType: 'O-', city: 'São Paulo', lastVisit: '2026-04-27', insurance: 'Amil', waitlist: true, availability: ['quarta-feira', 'tarde'] },
  { id: 'p6', name: 'Fábio Gomes Teixeira', cpf: '678.901.234-56', birth: '1985-05-17', phone: '(11) 99606-7788', email: 'fabio.gomes@email.com', gender: 'Masculino', bloodType: 'A-', city: 'Santo André', lastVisit: '2026-06-05', insurance: 'Unimed', waitlist: false, availability: ['noite'] },
  { id: 'p7', name: 'Gabriela Moreira', cpf: '789.012.345-67', birth: '1998-12-25', phone: '(11) 99707-8899', email: 'gabriela.moreira@email.com', gender: 'Feminino', bloodType: 'B-', city: 'São Paulo', lastVisit: '2026-05-30', insurance: 'Bradesco Saúde', waitlist: true, availability: ['segunda-feira', 'manhã'] },
  { id: 'p8', name: 'Henrique Dias Barbosa', cpf: '890.123.456-78', birth: '1972-02-11', phone: '(11) 99808-9900', email: 'henrique.dias@email.com', gender: 'Masculino', bloodType: 'O+', city: 'Diadema', lastVisit: '2026-06-02', insurance: 'Particular', waitlist: false, availability: ['sexta-feira'] },
  { id: 'p9', name: 'Isabela Cardoso Freitas', cpf: '901.234.567-89', birth: '2010-08-08', phone: '(11) 99909-0011', email: 'isabela.cardoso@email.com', gender: 'Feminino', bloodType: 'A+', city: 'São Paulo', lastVisit: '2026-05-22', insurance: 'SulAmérica', waitlist: false, availability: ['manhã'] },
  { id: 'p10', name: 'João Vitor Azevedo', cpf: '012.345.678-90', birth: '1991-06-19', phone: '(11) 99010-1122', email: 'joao.azevedo@email.com', gender: 'Masculino', bloodType: 'AB-', city: 'São Bernardo', lastVisit: '2026-06-03', insurance: 'Amil', waitlist: false, availability: ['tarde'] },
  { id: 'p11', name: 'Larissa Campos Araújo', cpf: '135.792.468-01', birth: '1983-10-05', phone: '(11) 99121-3344', email: 'larissa.campos@email.com', gender: 'Feminino', bloodType: 'O+', city: 'São Paulo', lastVisit: '2026-05-15', insurance: 'Unimed', waitlist: true, availability: ['terça-feira', 'tarde'] },
  { id: 'p12', name: 'Marcelo Tavares', cpf: '246.813.579-12', birth: '1965-04-28', phone: '(11) 99232-4455', email: 'marcelo.tavares@email.com', gender: 'Masculino', bloodType: 'B+', city: 'Mauá', lastVisit: '2026-06-06', insurance: 'Bradesco Saúde', waitlist: false, availability: ['manhã'] },
]

export const appointments = [
  { id: 'a1', patientId: 'p1', doctorId: 'd1', date: REFERENCE_DATE, time: '08:00', duration: 30, type: 'Consulta', status: 'confirmada', notes: 'Retorno cardiológico' },
  { id: 'a2', patientId: 'p4', doctorId: 'd4', date: REFERENCE_DATE, time: '08:30', duration: 30, type: 'Consulta', status: 'confirmada', notes: 'Acompanhamento pediátrico' },
  { id: 'a3', patientId: 'p3', doctorId: 'd3', date: REFERENCE_DATE, time: '09:00', duration: 45, type: 'Procedimento', status: 'pendente', notes: 'Avaliação dermatológica' },
  { id: 'a4', patientId: 'p7', doctorId: 'd5', date: REFERENCE_DATE, time: '09:30', duration: 30, type: 'Consulta', status: 'confirmada', notes: 'Rotina preventiva' },
  { id: 'a5', patientId: 'p2', doctorId: 'd2', date: REFERENCE_DATE, time: '10:00', duration: 30, type: 'Consulta', status: 'cancelada', notes: 'Vaga aberta as 10h', suggestedPatientId: 'p1' },
  { id: 'a6', patientId: 'p6', doctorId: 'd1', date: REFERENCE_DATE, time: '10:30', duration: 30, type: 'Retorno', status: 'confirmada', notes: 'Resultado de exames' },
  { id: 'a7', patientId: 'p9', doctorId: 'd4', date: REFERENCE_DATE, time: '11:00', duration: 30, type: 'Consulta', status: 'pendente', notes: 'Vacinação' },
  { id: 'a8', patientId: 'p5', doctorId: 'd6', date: REFERENCE_DATE, time: '11:30', duration: 45, type: 'Consulta', status: 'confirmada', notes: 'Avaliação neurológica' },
  { id: 'a9', patientId: 'p10', doctorId: 'd7', date: REFERENCE_DATE, time: '13:30', duration: 30, type: 'Consulta', status: 'confirmada', notes: 'Check-up geral' },
  { id: 'a10', patientId: 'p8', doctorId: 'd8', date: REFERENCE_DATE, time: '14:00', duration: 30, type: 'Consulta', status: 'pendente', notes: 'Exame de vista' },
  { id: 'a11', patientId: 'p11', doctorId: 'd1', date: REFERENCE_DATE, time: '14:30', duration: 30, type: 'Retorno', status: 'confirmada', notes: 'Ajuste de medicação' },
  { id: 'a12', patientId: 'p12', doctorId: 'd2', date: REFERENCE_DATE, time: '15:00', duration: 45, type: 'Procedimento', status: 'cancelada', notes: 'Vaga aberta as 15h', suggestedPatientId: 'p1' },
  { id: 'a13', patientId: 'p3', doctorId: 'd5', date: REFERENCE_DATE, time: '15:30', duration: 30, type: 'Consulta', status: 'cancelada', notes: 'Reagendar', suggestedPatientId: 'p2' },
  { id: 'a14', patientId: 'p1', doctorId: 'd6', date: REFERENCE_DATE, time: '16:00', duration: 30, type: 'Consulta', status: 'confirmada', notes: 'Cefaleia recorrente' },
  { id: 'a15', patientId: 'p2', doctorId: 'd1', date: addDays(1), time: '09:00', duration: 30, type: 'Consulta', status: 'confirmada', notes: '' },
  { id: 'a16', patientId: 'p5', doctorId: 'd3', date: addDays(1), time: '10:00', duration: 30, type: 'Consulta', status: 'pendente', notes: '' },
  { id: 'a17', patientId: 'p7', doctorId: 'd4', date: addDays(1), time: '11:00', duration: 30, type: 'Retorno', status: 'confirmada', notes: '' },
  { id: 'a18', patientId: 'p9', doctorId: 'd8', date: addDays(2), time: '14:00', duration: 30, type: 'Consulta', status: 'confirmada', notes: '' },
  { id: 'a19', patientId: 'p11', doctorId: 'd2', date: addDays(2), time: '15:00', duration: 45, type: 'Procedimento', status: 'pendente', notes: '' },
  { id: 'a20', patientId: 'p6', doctorId: 'd7', date: addDays(3), time: '08:30', duration: 30, type: 'Consulta', status: 'confirmada', notes: '' },
]

export const occupancyData = [
  { dia: 'Seg', ocupacao: 75 },
  { dia: 'Ter', ocupacao: 80 },
  { dia: 'Qua', ocupacao: 85 },
  { dia: 'Qui', ocupacao: 90 },
  { dia: 'Sex', ocupacao: 95 },
]

export const weeklyTrend = [
  { dia: 'Seg', consultas: 38, confirmadas: 30, canceladas: 4 },
  { dia: 'Ter', consultas: 42, confirmadas: 34, canceladas: 3 },
  { dia: 'Qua', consultas: 35, confirmadas: 28, canceladas: 5 },
  { dia: 'Qui', consultas: 48, confirmadas: 40, canceladas: 2 },
  { dia: 'Sex', consultas: 52, confirmadas: 44, canceladas: 6 },
]

export const monthlyRevenue = [
  { mes: 'Jan', receita: 84000 },
  { mes: 'Fev', receita: 91500 },
  { mes: 'Mar', receita: 88200 },
  { mes: 'Abr', receita: 102300 },
  { mes: 'Mai', receita: 115800 },
  { mes: 'Jun', receita: 121400 },
]

export const specialtyDistribution = [
  { name: 'Cardiologia', value: 28, color: '#2563EB' },
  { name: 'Pediatria', value: 22, color: '#F59E0B' },
  { name: 'Ortopedia', value: 18, color: '#0ea5a4' },
  { name: 'Dermatologia', value: 15, color: '#8b5cf6' },
  { name: 'Outras', value: 17, color: '#94a3b8' },
]

export const patientTimeline = {
  p1: [
    { date: '05/06', title: 'Consulta realizada', detail: 'Paciente compareceu para retorno cardiológico.' },
    { date: '12/06', title: 'Exames anexados', detail: 'Hemograma e eletrocardiograma adicionados ao histórico.' },
    { date: '18/06', title: 'Retorno agendado', detail: 'Nova avaliação confirmada com Dra. Helena.' },
    { date: '25/06', title: 'Prescrição atualizada', detail: 'Ajuste de medicação registrado.' },
  ],
}

export const opportunityQueue = [
  { id: 'o1', patientId: 'p1', need: 'Retorno cardiológico', availability: ['manhã', 'terça-feira'], match: 'Vaga aberta às 15h' },
  { id: 'o2', patientId: 'p2', need: 'Avaliação ortopédica', availability: ['quinta-feira', 'sexta-feira'], match: 'Compatível com sala 02' },
  { id: 'o3', patientId: 'p7', need: 'Consulta preventiva', availability: ['segunda-feira', 'manhã'], match: 'Paciente disponível para encaixe' },
  { id: 'o4', patientId: 'p11', need: 'Retorno de exames', availability: ['terça-feira', 'tarde'], match: 'Janela disponível de 30 min' },
]

export const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:30', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00',
]
