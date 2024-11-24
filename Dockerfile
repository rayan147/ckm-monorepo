# Base stage
FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@8.15.6 --activate

# Install system dependencies
RUN apk update && \
  apk add --no-cache libc6-compat openssl

# Builder stage
FROM base AS builder
WORKDIR /app
# Copy only package files first to leverage caching
COPY package.json pnpm-lock.yaml ./
RUN pnpm install && pnpm fetch
# Copy all files
COPY . .

# Generate Prisma Client
RUN pnpm --filter=@ckm/db run db:generate

# Build the project
# Build the project with correct argument passing
RUN pnpm run build --filter=@ckm/db... -- --loglevel=debug || { echo 'db build failed'; exit 1; }
RUN pnpm run build --filter=@ckm/contracts... -- --loglevel=debug || { echo 'contracts build failed'; exit 1; }
RUN pnpm run build --filter=@ckm/lib-api... -- --loglevel=debug || { echo 'lib-api build failed'; exit 1; }
RUN pnpm run build --filter=api... -- --loglevel=debug || { echo 'api build failed'; exit 1; }

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

