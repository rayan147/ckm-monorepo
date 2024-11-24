# Base stage
FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate

# Install system dependencies
RUN apk update && \
  apk add --no-cache libc6-compat openssl

# Builder stage
FROM base AS builder
WORKDIR /app
COPY  package.json  pnpm-lock.yaml ./

# Copy all files

# Install dependencies
RUN pnpm install -g turbo &&  pnpm install && pnpm fetch
COPY . .

# Generate Prisma Client
RUN pnpm --filter=@ckm/db run db:generate

# Build the project
# RUN pnpm run build --filter=@ckm/contracts... && \
#   pnpm run build --filter=@ckm/db... && \
#   pnpm run build --filter=@ckm/lib-api... && \
#   pnpm run build --filter=api...
RUN turbo run build

# Runner stage
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nodejs

# Copy built files and node_modules
COPY --from=builder /app /app

# Set ownership
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Start script
COPY --chown=nodejs:nodejs <<-"EOF" /app/start.sh
#!/bin/sh
# Start the application
exec node apps/api/dist/main
EOF

RUN chmod +x /app/start.sh

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE $PORT

CMD ["/app/start.sh"]

