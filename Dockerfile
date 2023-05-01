FROM node:18-alpine3.15 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN npm ci

FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine3.15 AS runner
WORKDIR /usr/src/app
COPY package.json ./
RUN npm ci --only=prod
COPY --from=builder /app/dist ./dist
CMD ["node","dist/main"]