# ---- BUILD ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# ---- RUNTIME ----
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma

EXPOSE 5000
CMD ["node", "dist/index.js"]
