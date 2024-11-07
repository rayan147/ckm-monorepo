# syntax=docker/dockerfile:1.4

FROM node:23-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install Turbo globally
RUN pnpm add -g turbo

FROM base AS builder
WORKDIR /app

# Copy only the necessary files
COPY pnpm-workspace.yaml turbo.json ./

# Copy the root package.json and lockfile
COPY package.json pnpm-lock.yaml ./
#
# Install dependencies
RUN pnpm fetch

# Copy the rest of the monorepo
COPY . .

# Prune the monorepo to include only `webapp` and its dependencies
RUN turbo prune --scope=webapp --docker

FROM base AS installer
WORKDIR /app

# Copy the pruned package.json and lockfile
COPY --from=builder /app/out/json/ ./
COPY --from=builder /app/out/full/ ./
COPY --from=builder /app/packages ./

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install  --no-frozen-lockfile

# Build the project
RUN turbo run build --filter=webapp...

# Production image
FROM node:23-slim

WORKDIR /app

# Copy built app from the build stage
COPY --from=installer /app/webapp/build ./

ENV PORT=5173
EXPOSE 5173

CMD ["node", "index.js"]

