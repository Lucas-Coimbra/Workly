FROM node:22-slim
RUN apt-get update -y \
  && apt-get install -y openssl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run prisma:generate
EXPOSE 4000
CMD ["node", "src/server.js"]
