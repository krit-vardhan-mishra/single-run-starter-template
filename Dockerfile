FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json ./package.json
RUN npm i --omit=dev --no-audit --no-fund
EXPOSE 5000
CMD ["node", "dist/index.js"]
