FROM node:20-alpine AS base

# Instala dependências apenas para compilação
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Compilação da aplicação
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Produção
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Define permissões para o cache do Next.js
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copia o resultado da compilação
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]