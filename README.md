# Sphience Backend

### Powering Research Equipment Access for Academia

![Version](https://img.shields.io/github/package-json/v/deenr/sphience-backend)
![Build Status](https://img.shields.io/github/actions/workflow/status/deenr/sphience-backend/ci.yml?branch=main)

---

## 🚀 About Sphience

In the academic world, access to research equipment can be a significant barrier to discovery. **Sphience** is on a mission to empower students, PhDs, and professors with streamlined access to essential research resources. Our platform enables seamless collaboration and resource-sharing, transforming the way researchers work together in academia.

**This repository contains the backend application for Sphience**, built with NestJS and designed to handle server-side logic, authentication, and data management for academic research and resource sharing.

**Why Sphience?**

- **🤝 Facilitated Collaboration**: Connect students and researchers across universities to access equipment and collaborate on projects.
- **🔧 Simplified Resource Management**: Track and manage equipment with ease, improving research workflows.
- **🎓 Focused on Academia**: Designed specifically for academic environments to enhance the research process.

## 🛠️ Built With

- [NestJS](https://nestjs.com) – A powerful framework for building efficient and scalable server-side applications
- [Prisma](https://www.prisma.io) – Modern database toolkit for TypeScript and Node.js
- [PostgreSQL](https://www.postgresql.org) – Robust relational database
- [JWT](https://jwt.io) – Secure authentication and authorization
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) – Password hashing
- [TypeScript](https://www.typescriptlang.org) – Type-safe JavaScript

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Environment variables configured (see below)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/deenr/sphience-backend.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd sphience-backend
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   Create a `.env` file in the root directory with:
   ```plaintext
   DATABASE_URL="postgresql://user:password@localhost:5432/sphience"
   ACCESS_TOKEN_SECRET="your-access-token-secret"
   ACCESS_TOKEN_EXPIRY="15m"
   REFRESH_TOKEN_SECRET="your-refresh-token-secret"
   REFRESH_TOKEN_EXPIRY="7d"
   ```
5. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```
6. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```
7. **Start the development server:**
   ```bash
   npm run start:dev
   ```

The server will be accessible at `http://localhost:3000`.

## 💻 Development

### Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Run production build
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Lint codebase
- `npm run format` - Format code with Prettier

### Project Structure

```plaintext
sphience-backend/
├── src/
│   ├── main.ts               # Application entry point
│   ├── app.module.ts         # Root application module
│   ├── auth/                 # Authentication & authorization
│   ├── users/               # User management
│   ├── equipment/           # Equipment management
│   └── prisma/              # Database client and migrations
├── prisma/
│   └── schema.prisma        # Database schema
└── test/                    # Test files
```

### API Features

- **Authentication**: JWT-based auth with refresh tokens
- **User Management**: CRUD operations for users with role-based access
- **Equipment Management**: Research equipment tracking and reservation system
- **Document Management**: Equipment documentation handling

## 📫 Contact

- **X**: [@deanreymen](https://x.com/deanreymen)
- **LinkedIn**: [/in/dean-reymen](https://linkedin.com/in/dean-reymen)

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com) - The framework that powers our backend
- [Prisma](https://www.prisma.io) - For efficient data handling
- The open-source community, for inspiration and support

---

Let’s build a better future for research and academia, one innovation at a time! 🌍📚
