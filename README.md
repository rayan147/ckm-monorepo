# CKM Monorepo

A modern full-stack TypeScript monorepo built with Turborepo, featuring Svelte-based frontends and a NestJS backend.

## 🚀 Overview

This monorepo provides a comprehensive development environment for building scalable web applications. It's structured to promote code sharing, maintain consistency across projects, and streamline the development workflow.

## 📁 Repository Structure

```
.
├── apps                       # Application projects
│   ├── api                    # NestJS backend API
│   ├── docs                   # Documentation site
│   ├── web                    # Main Svelte web application
│   └── webapp                 # Admin/alternative web interface
├── packages                   # Shared packages and libraries
│   ├── config-eslint          # Shared ESLint configuration
│   ├── database               # Database access layer with Prisma
│   ├── shared                 # Shared utilities
│   │   ├── contracts          # API contracts and interfaces
│   │   ├── lib-api            # Shared API client
│   │   └── types              # Common TypeScript types
│   ├── tsconfig.base.json     # Base TypeScript configuration
│   └── ui                     # Shared UI components
└── docker-compose.yaml        # Docker configuration for development
```

## ✨ Features

- **Monorepo Management**: Powered by Turborepo for efficient task orchestration and dependency management
- **Type Safety**: Comprehensive TypeScript integration across all projects
- **Modern Frontend**: Svelte-based web applications with SvelteKit
- **Robust Backend**: NestJS API with TypeScript
- **Database Integration**: Prisma ORM for type-safe database access
- **Shared Libraries**: Common code shared between projects to reduce duplication
- **Docker Support**: Containerized development and deployment environments
- **Contract-First Design**: Shared API contracts between frontend and backend

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16+)
- pnpm
- Docker and Docker Compose (for database and containerized development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rayan147/ckm-monorepo.git
   cd ckm-monorepo
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development environment:
   ```bash
   # Start the database and services with Docker
   docker-compose up -d
   
   # Start the development servers
   pnpm dev
   ```

## 🧩 Available Scripts

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm test` - Run tests across the monorepo
- `pnpm lint` - Lint all projects
- `pnpm format` - Format code using Prettier

## 📦 Workspace-Specific Development

You can work on individual projects using the workspace filter:

```bash
# Start just the web app
pnpm --filter web dev

# Build just the API
pnpm --filter api build

# Run tests for a specific package
pnpm --filter @ckm/lib-api test
```

## 🔄 API Client Usage

The shared API client provides a type-safe way to communicate between frontend and backend:

```typescript
import { api } from '@ckm/lib-api';

// Type-safe API calls with full IntelliSense support
const result = await api.users.getAll();
```

## 🐳 Docker Support

The repository includes Docker configuration for both development and production:

- `Dockerfile` - Production container build
- `Dockerfile.local` - Development container configuration
- `docker-compose.yaml` - Multi-container setup for local development

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## 📄 License

[MIT](LICENSE)
