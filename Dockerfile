# ---------- Builder Stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies only for production
COPY package.json package-lock.json ./
RUN npm ci

# Copy necessary source files and build the application
COPY . .
RUN npm run build && npm prune --production && rm -rf .next/cache

# ---------- Production Stage ----------
FROM node:18-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy only production dependencies from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy only necessary build files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port and start the app
EXPOSE 3000
CMD ["npm", "start"]