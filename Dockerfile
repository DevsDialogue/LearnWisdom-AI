# Use a Debian-based image
FROM node:18-slim AS build

# Update and install OpenSSL
RUN apt-get update && apt-get install -y openssl

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

# Expose the desired port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
