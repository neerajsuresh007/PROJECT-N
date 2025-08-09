# CARGODSR — Railway deployment ready

This repo has both frontend (Angular) and backend (Node/Express). It's prepared to be deployed on Railway as a single service where the backend serves the frontend build.

## What I added
- root `package.json` with a `postinstall` script that installs frontend deps and builds the Angular app, then installs backend deps.
- `Procfile` to start the backend server.
- `.env.example` consolidated at root.
- `.gitignore`.

## How to deploy (simple steps)
1. Upload the entire folder to a **new GitHub repository**.
2. In Railway, create a new project -> "Deploy from GitHub" and connect the repository.
3. Before deploying, set environment variables in Railway (Project Settings -> Variables):
   - `DATABASE_URL` = the PostgreSQL connection string Railway provides when you add a PostgreSQL plugin, or your external Postgres URL.
   - `JWT_SECRET` = any secret string.
   - Any other variables used by the backend — see `backend/.env.example`.
4. Railway will run `npm install` on the root and execute the `postinstall` script which will:
   - install frontend deps and build the Angular app into `frontend/dist`
   - install backend deps
5. Railway will then run the command from the `Procfile`: `node backend/server.js`. The backend serves the frontend build automatically.

## Running locally (quick)
- Node + npm required.
- Copy `.env.example` to `.env` and fill values.
- From repo root run:
```bash
npm install       # runs postinstall -> builds frontend + installs backend deps
npm start
```
- To run migrations locally:
```bash
npm --prefix backend run migrate
```

If you want, I can:
- Add a small script to run migrations automatically on startup (optional).
- Prepare a single-command deploy script for Railway.
- Commit these changes into the extracted folder and produce a zip of the ready-to-upload repo for you to upload to GitHub.

Tell me if you want me to create the zip of the final repo (so you can directly upload it), and whether you'd like migrations to run automatically at startup.
