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

# Expose the desired port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
