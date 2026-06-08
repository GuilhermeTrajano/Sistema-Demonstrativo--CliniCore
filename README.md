# CliniCore - Sistema Demonstrativo de Gestão para Clínicas

Aplicação web demonstrativa criada para portfólio, com foco em apresentar uma experiência visual e funcional de um sistema moderno para gestão de clínicas médicas.

O projeto não possui backend, banco de dados ou integrações reais. Todos os dados são mockados em memória para simular fluxos de uso como dashboard, agenda, cadastro de pacientes, corpo clínico, agendamento e oportunidades de encaixe.

## Objetivo

Demonstrar a capacidade de construir uma interface profissional para um produto SaaS na área da saúde, com navegação completa, componentes reutilizáveis, visual responsivo e interações realistas.

## Funcionalidades

- Login demonstrativo com sessão em `sessionStorage`
- Dashboard com indicadores operacionais e gráficos
- Agenda médica em timeline diária
- Agendamento de consultas com resumo em tempo real
- Cadastro e listagem de pacientes
- Timeline do paciente em modal
- Listagem de médicos por disponibilidade
- Central de oportunidades para pacientes aguardando vaga
- Layout responsivo com sidebar, topbar e navegação por rotas

## Tecnologias

- React 18
- Vite
- React Router v6
- Recharts
- Lucide React
- CSS puro com variáveis de design system

## Como Rodar Localmente

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Depois acesse a URL exibida pelo Vite, normalmente:

```text
http://localhost:5173/
```

## Build de Produção

```bash
npm run build
```

Para pré-visualizar o build:

```bash
npm run preview
```

## Observações

Este é um projeto demonstrativo. Dados, usuários, consultas e métricas são fictícios e não devem ser usados como base clínica real.

Desenvolvido como projeto de portfólio por GT Core.
