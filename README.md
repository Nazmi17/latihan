# Monlist Backend

## Setup bisi hilap
1. Install dependencies: `npm install`
2. Setup DB: Update .env dengan DATABASE_URL (PostgreSQL)
3. Migrate DB: `npx prisma migrate dev --name init`
4. Run dev: `npm run dev`

## Endpoints
- /api/auth/register, /login
- /api/users/:id (PATCH/DELETE) - protected
- /api/tasks (GET/POST/PUT/DELETE) - protected
- /api/folders (GET/POST), /:id/tasks, /:id/share (POST/DELETE), /search-users - protected