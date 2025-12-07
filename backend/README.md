Workly backend (JS + Prisma 6)

Quick start (local)

1. cp .env.example .env --> editar DATABASE_URL e JWT_SECRET
2. npm ci
3. npx prisma generate
4. npx prisma migrate dev --name init
5. npm run dev

Docker:

1. docker compose up --build
2. docker exec -it <api-container> sh
   npm run prisma:generate
   npm run prisma:migrate

docker compose up -d db

npx prisma generate
npx prisma migrate dev --name init
npm run dev
