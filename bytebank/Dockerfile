FROM node:22-slim AS builder
WORKDIR /app
COPY bytebank/package*.json ./
RUN npm config set fetch-retry-maxtimeout 600000 -g
RUN npm config set fetch-retries 5 -g
RUN rm -f package-lock.json && npm install --legacy-peer-deps
COPY bytebank/ .
COPY shared/ ../shared/
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /shared ../shared
EXPOSE 3000
CMD ["npm", "start"]