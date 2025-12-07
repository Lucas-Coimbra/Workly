FROM node:22-sli
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run prisma:generate
EXPOSE 4000
CMD ["node","src/server.js"]
