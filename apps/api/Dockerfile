# syntax=docker/dockerfile:1.4

FROM node:23-slim@sha256:f73e9c70d4279d5e7b7cc1fe307c5de18b61089ffa2235230408dfb14e2f09a0 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && pnpm add -g turbo

FROM base AS builder
WORKDIR /app
COPY pnpm-workspace.yaml turbo.json ./
COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch
COPY . .
RUN turbo prune --scope=server --docker 

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ ./
COPY --from=builder /app/out/full/ ./
COPY --from=builder /app/packages ./

# Install dependencies and run builds (including Prisma generation)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --no-frozen-lockfile && \
  pnpm turbo run prisma:generate && \
  pnpm turbo run build --filter=server 

# Production image
FROM node:23-slim@sha256:f73e9c70d4279d5e7b7cc1fe307c5de18b61089ffa2235230408dfb14e2f09a0
WORKDIR /app
RUN groupadd -r nodejs && useradd -r -g nodejs -s /bin/false nodejs
COPY --from=installer /app ./

EXPOSE 3000
CMD ["node", "/app/server/dist/src/main.js"]

