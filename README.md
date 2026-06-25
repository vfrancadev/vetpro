# 🐾 VetPro - Sistema de Agendamento para Clínicas Veterinárias

![Home](./docs/home.png)

## 📖 Sobre o Projeto

O VetPro é uma plataforma web desenvolvida para auxiliar clínicas veterinárias no gerenciamento de atendimentos e agendamentos online.

O sistema permite que cada clínica possua uma página exclusiva para divulgação dos seus serviços e recebimento de agendamentos realizados pelos clientes.

Além disso, a clínica possui acesso a um painel administrativo protegido por autenticação, onde pode gerenciar seus horários, serviços e informações cadastrais.

---

## 🚀 Tecnologias Utilizadas

### Front-end

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn/UI

### Back-end

- Next.js Server Actions
- API Routes
- NextAuth

### Banco de Dados

- PostgreSQL
- Prisma ORM

### Gerenciamento de Estado

- TanStack Query (React Query)

---

# 📂 Estrutura do Projeto

```txt
src/
│
├── app/
│
├── (public)/
│   ├── _actions/
│   ├── _components/
│   ├── _data-access/
│   └── clinica/[id]/
│
├── (panel)/
│   ├── _actions/
│   ├── _components/
│   ├── _data-access/
│   ├── dashboard/
│   ├── profile/
│   ├── services/
│   └── plans/
│
├── api/
│   ├── auth/
│   │   └── [...nextauth]
│   │
│   ├── clinic/
│   └── appointments/
│
├── providers/
│
└── prisma/
```

---

# ✨ Funcionalidades

## 🌐 Página Inicial

- Apresentação da plataforma
- Listagem das clínicas disponíveis
- Navegação para página pública da clínica
- Acesso ao Portal da Clínica

### Preview

![Home](./docs/home.png)

---

## 🔐 Autenticação

O sistema utiliza NextAuth para autenticação.

### Recursos

- Login com GitHub
- Sessão persistente
- Proteção de rotas
- Controle de acesso ao painel administrativo

---

## 🏥 Página Pública da Clínica

Cada clínica possui uma URL única.

### Exemplo

```bash
http://localhost:3000/clinica/1
```

Nesta página o cliente pode:

- Visualizar informações da clínica
- Selecionar serviços
- Escolher uma data
- Informar dados pessoais
- Realizar agendamentos

### Preview

![Página da Clínica](./docs/clinic-page.png)

---

## 📅 Sistema de Agendamentos

Permite o cadastro e gerenciamento dos atendimentos.

### Funcionalidades

- Cadastro de agendamento
- Escolha de serviço
- Seleção de data
- Registro de cliente
- Visualização dos horários disponíveis

---

## 📊 Dashboard Administrativo

Painel exclusivo para clínicas autenticadas.

### Funcionalidades

- Visualização dos agendamentos
- Controle dos horários disponíveis
- Consulta dos detalhes dos atendimentos
- Exclusão de agendamentos

### Preview

![Dashboard](./docs/dashboard.png)

---

## 📋 Detalhes do Agendamento

Permite visualizar todas as informações do atendimento.

### Informações exibidas

- Nome do cliente
- Telefone
- Email
- Data
- Horário
- Serviço
- Valor

### Preview

![Detalhes](./docs/appointment-details.png)

---

## 🩺 Gerenciamento de Serviços

A clínica pode cadastrar e gerenciar seus serviços.

### Exemplos

- Consulta Veterinária
- Vacinação
- Exames
- Cirurgias
- Banho e Tosa

### Preview

![Detalhes](./docs/service.png)

---

## 🩺 Gerenciamento de Lembretes

A clínica pode cadastrar e gerenciar seus lembretes diarios.

### Exemplos

- Cadastrar um lembrete
- Excluir um lembrete

### Preview

![Detalhes](./docs/remainber.png)

---

## 👤 Perfil da Clínica

Permite alterar as informações do estabelecimento.

### Campos

- Nome
- Endereço
- Telefone
- Status
- Horários de funcionamento
- Fuso horário
- Imagem de perfil

### Preview

![Perfil](./docs/profile.png)

---

# 🗄️ Banco de Dados

O sistema utiliza PostgreSQL com Prisma ORM.

## Principais Entidades

### Clinic

Responsável por armazenar os dados da clínica.

```txt
id
name
address
phone
imageUrl
status
```

### Service

Responsável pelos serviços oferecidos.

```txt
id
name
price
duration
clinicId
```

### Appointment

Responsável pelos agendamentos.

```txt
id
customerName
customerEmail
customerPhone
date
hour
serviceId
clinicId
```

---

# 🔒 Segurança

O sistema utiliza NextAuth para autenticação.

### Recursos

- Login seguro via GitHub
- Sessões protegidas
- Middleware de proteção
- Rotas privadas

---

# ⚙️ Instalação e Execução

## 1. Clonar o Projeto

```bash
git clone https://github.com/seu-usuario/vetpro.git
```

```bash
cd vetpro
```

---

## 2. Instalar Dependências

```bash
npm install
```

ou

```bash
pnpm install
```

---

## 3. Configurar Variáveis de Ambiente

Crie um arquivo:

```bash
.env
```

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/vetpro"

NEXTAUTH_URL="http://localhost:3000"

NEXTAUTH_SECRET="sua_chave_secreta"

GITHUB_ID="seu_github_id"

GITHUB_SECRET="seu_github_secret"
```

---

## 4. Executar Migrações

```bash
npx prisma migrate deploy
```

ou durante o desenvolvimento:

```bash
npx prisma migrate dev
```

---

## 5. Gerar Prisma Client

```bash
npx prisma generate
```

---

## 6. Executar Projeto

```bash
npm run dev
```

A aplicação ficará disponível em:

```bash
http://localhost:3000
```

---

# 📷 Prints do Sistema

## Página Inicial

![Home](./docs/home.png)

---

## Página Pública da Clínica

![Clínica](./docs/clinic-page.png)

---

## Dashboard

![Dashboard](./docs/dashboard.png)

---

## Detalhes do Agendamento

![Detalhes](./docs/appointment-details.png)

---

## Perfil da Clínica

![Perfil](./docs/profile.png)

---

# 🎓 Projeto Acadêmico

Projeto desenvolvido para a disciplina:

**Projeto Integrador Extensionista – ADS 3**

Curso de **Análise e Desenvolvimento de Sistemas**.

---

# 👨‍💻 Autor

**Vinicius França**

- GitHub: https://github.com/vfrancadev
- LinkedIn: https://www.linkedin.com/in/viniciusfrancaa/
