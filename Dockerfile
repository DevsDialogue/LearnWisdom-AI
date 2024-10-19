# Stage 1: Build the application
FROM node:alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 2: Serve the built application
FROM node:alpine AS production

WORKDIR /app

# Copy the Next.js build output and necessary files from the previous stage
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/node_modules /app/node_modules  

# Set environment variable to tell Next.js it's in production mode
ENV NODE_ENV=production

# Expose the desired port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
