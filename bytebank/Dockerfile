FROM node:22-slim AS builder

WORKDIR /app

# Copy only dependency files first for better caching
COPY package*.json ./

# Tell npm to be more patient with slow connections
RUN npm config set fetch-retry-maxtimeout 600000 -g
RUN npm config set fetch-retries 5 -g

RUN rm -f package-lock.json && npm install

# Copy the rest of the source code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production environment
FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Copy necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# NEW: Copy your Next.js config file!
COPY --from=builder /app/next.config.ts ./

EXPOSE 3000

CMD ["npm", "start"]