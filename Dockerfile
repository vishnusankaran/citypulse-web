# Base Node image
FROM node:18-alpine AS base
WORKDIR /app
# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
# Install dependencies
RUN pnpm install
# Copy source files
COPY . .
# Expose port for dev server
EXPOSE 5173
# Start development server
CMD ["pnpm", "dev", "--host"]