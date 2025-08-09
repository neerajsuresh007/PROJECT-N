
CARGODSR — Full Export (Postgres + JWT + Angular + Docker)
=========================================================

What's included:
- backend/: Node.js + Express API with JWT auth, role-based checks, migrations, exports (CSV/Excel/PDF).
- frontend/: Angular app skeleton with auth, role-based UI, summary/detailed/customer components.
- infra/docker-compose.yml: Postgres + backend + frontend for local Docker-based run.
- migrations/: SQL migration and seed scripts (run via `npm run migrate` in backend).

Quickstart (Docker):
1. Ensure Docker & Docker Compose installed.
2. From project root run: `cd infra && docker-compose up --build`
3. Wait for Postgres; then run migrations & seed:
   - Open a shell into backend container or run locally with NODE_ENV variables:
     `docker-compose exec backend sh -c "node migrations/run_migrations.js && node migrations/seed_demo.js"`
4. Access frontend at http://localhost:8080 and backend at http://localhost:3000

Local dev without Docker:
- Start Postgres and set DATABASE_URL in backend/.env.example (copy to .env)
- Run migrations: `cd backend && npm install && npm run migrate && node migrations/seed_demo.js`
- Start backend: `npm run dev`
- Start frontend: `cd frontend && npm install && npx -p @angular/cli ng serve --open`

Default demo users created by seed script:
- admin / admin123 (role: admin)
- manager / manager123 (role: manager)

Integration notes:
- To integrate into NutraACS, import frontend components into your Angular workspace and ensure AuthInterceptor is registered.
- Replace DATABASE_URL with your production Postgres credentials and secure JWT_SECRET in env.
