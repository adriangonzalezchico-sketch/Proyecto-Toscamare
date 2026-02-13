# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar package.json y package-lock si existe para aprovechar cache
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production

# Copiar el resto de la app
COPY . .

ENV NODE_ENV=production
EXPOSE 3001

# Ejecutar la app
CMD ["node", "server.js"]
