
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

## 🖥️ Demo

[Live Demo and screenshots coming soon]

## 🛠️ Built With

- [NestJS](https://nestjs.com) – A powerful framework for building efficient and scalable server-side applications
- [Prisma](https://www.prisma.io) – A modern database toolkit for TypeScript and Node.js
- [TypeScript](https://www.typescriptlang.org) – A superset of JavaScript that compiles to clean JavaScript
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) – For hashing passwords securely
- [Swagger](https://swagger.io) – For API documentation

## 🚦 Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.

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
4. **Run the application:**
   ```bash
   npm run start:dev
   ```

The server will be accessible at `http://localhost:3000`. 🎉 You’re all set to explore Sphience!

## 💻 Development

### Available Scripts

- `npm run start:dev` - Start the development server with hot reload
- `npm run build` - Build the app for production
- `npm run test`  - Run unit tests
- `npm run lint`  - Lint the codebase

### Project Structure

```plaintext
sphience-backend/
├── src/
│   ├── app.module.ts         # Root module of the application
│   ├── main.ts               # Entry point of the application
│   ├── auth/                 # Authentication module
│   ├── users/                # User management module
│   ├── prisma/               # Prisma database client setup
│   ├── config/               # Configuration files
```

## 📅 Project Status

> **Status**: 🚧 Ongoing Development

Sphience is actively being developed. Contributions and feedback are very welcome as we work to build and refine this platform.

## 🤝 Contributing

Contributions make this open-source project even better! Here’s how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/new-feature`)
3. **Commit your changes** (`git commit -m 'feat: new feature'`)
4. **Push the branch** (`git push origin feature/new-feature`)
5. **Open a Pull Request**

Your contributions, big or small, help make Sphience a better tool for academia.

## 📫 Contact

- **X**: [@deanreymen](https://x.com/deanreymen)
- **LinkedIn**: [/in/dean-reymen](https://linkedin.com/in/dean-reymen)

## 🙏 Acknowledgments

Built with gratitude for:

- [NestJS](https://nestjs.com) - The framework that powers our backend
- [Prisma](https://www.prisma.io) - For efficient data handling
- The open-source community, for inspiration and support

--- 

Let’s build a better future for research and academia, one innovation at a time! 🌍📚
