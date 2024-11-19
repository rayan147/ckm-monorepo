# syntax=docker/dockerfile:1.4

FROM node:23-slim@sha256:f73e9c70d4279d5e7b7cc1fe307c5de18b61089ffa2235230408dfb14e2f09a0 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update -qq && \
  apt-get install -y openssl

FROM base AS builder
WORKDIR /app
COPY pnpm-workspace.yaml turbo.json ./
COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch
COPY . .

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ ./
COPY --from=builder /app/out/full/ ./
COPY --from=builder /app/packages ./

# Install dependencies and run builds (including Prisma generation)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --no-frozen-lockfile && \
  pnpm turbo run db:generate && \
  pnpm turbo run build --filter=server 

# Production image
FROM installer AS runner 
WORKDIR /app
RUN groupadd -r nodejs && useradd -r -g nodejs -s /bin/false nodejs
COPY --from=installer /app ./app/apps/api
RUN pnpm install --prod

WORKDIR /app/apps/api

EXPOSE 3000
CMD ["node", "dist/main.js"]

