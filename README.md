# 🚀 StackForge

A modern fullstack project scaffolding CLI built with Node.js.

StackForge automates the setup of frontend, backend, and fullstack applications by generating production-ready project structures with optional features like authentication, database support, Tailwind CSS, Prisma ORM, and more.

Designed to improve developer workflow and eliminate repetitive project setup tasks.

---

# ✨ Features

## Frontend Support
- Vanilla HTML/CSS/JS
- React
- Next.js

## Backend Support
- Express.js
- Environment configuration
- Modular architecture

## Fullstack Support
Generate:

```bash
frontend/
backend/
```

with independent setups.

---

# ⚡ Optional Features

- JWT Authentication
- Prisma ORM
- MySQL Support
- PostgreSQL Support
- Tailwind CSS
- Git initialization
- Automatic dependency installation

---

# 🧠 Project Architecture

StackForge uses a modular feature-based architecture:

```bash
src/
├── config/
├── features/
├── templates/
├── utils/
```

This makes the project scalable and easy to extend with future integrations.

---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/stackforge.git
```

Enter the project directory:

```bash
cd stackforge
```

Install dependencies:

```bash
npm install
```

Link the CLI globally:

```bash
npm link
```

---

# 🚀 Usage

Run:

```bash
stackforge my-app
```

You will then be prompted to select:
- project type
- frontend framework
- database
- authentication
- Tailwind CSS
- Prisma ORM
- dependency installation

---

# 📁 Example Generated Structure

## Fullstack Project

```bash
my-app/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── backend/
    ├── controllers/
    ├── routes/
    ├── middleware/
    ├── prisma/
    ├── .env
    └── package.json
```

---

# 🔐 Authentication

When enabled, StackForge automatically generates:

```bash
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

using:
- JWT
- bcrypt
- Express middleware

---

# 🎨 Tailwind CSS

Tailwind CSS can be automatically configured for:
- React
- Next.js

StackForge installs and configures Tailwind automatically during project generation.

---

# 🗄️ Database Support

Supported databases:
- PostgreSQL
- MySQL

Optional Prisma ORM support is also available.

---

# 🛠️ Technologies Used

- Node.js
- Express.js
- Inquirer
- Chalk
- Ora
- Execa
- fs-extra

---

# 🎯 Goals

StackForge was built to:
- speed up project initialization
- improve developer experience
- reduce repetitive setup work
- provide scalable starter architectures

---

# 🚧 Future Plans

Planned features include:
- Docker support
- Swagger integration
- Testing setup
- ESLint/Prettier automation
- Socket.IO integration
- Next.js standalone fullstack mode
- Authentication improvements
- Additional frontend frameworks

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the project and submit pull requests.

---

# 📄 License

MIT License

---

# 👨‍💻 Author

Built by Mkhal Fadel.