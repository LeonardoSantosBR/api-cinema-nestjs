FROM node:20-alpine

WORKDIR /app

# Copy dependency manifests first so Docker can reuse this layer when only
# application source files change.
COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm ci \
  && npx prisma generate

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src

# O Prisma CLI é usado pelo serviço de migration do Docker Compose.
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main.js"]
