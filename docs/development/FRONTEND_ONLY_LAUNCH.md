# Frontend-only launch

The app can be run with **only the frontend** (Vite). The dashboard at `/` shows themes and tenants by calling the API; for that to work, the API must be available.

## Run frontend only

```bash
npm run dev:frontend
```

- Serves the React app (dashboard, theme routes) at **http://localhost:8080** (or next free port).
- Root `/` shows the **dashboard** (themes and tenants), no auth.

## API required for dashboard

The dashboard needs:

- `GET /api/tenants` – list tenants
- `GET /api/themes` – list themes

**Option A – API on same machine (recommended for local dev)**  
Run the API in another terminal:

```bash
npm run dev:backend
```

Backend runs on **http://localhost:4173**. Vite is configured to proxy `/api` and `/theme` (assets) to that host, so the frontend will use it automatically.

**Option B – API on another host**  
Set the API base URL so the frontend calls the right server:

- In `.env`:  
  `VITE_API_BASE_URL=https://your-api-host`
- Or when building:  
  `VITE_API_BASE_URL=https://your-api-host npm run build`

Then open the app; all `/api` requests go to that host.

## Full stack (frontend + API together)

```bash
npm run dev
```

Runs `dev:backend` and `dev:frontend` in parallel (backend on 4173, frontend on 8080 with proxy to backend).

## Summary

| Goal              | Command                 | API needed                    |
|-------------------|-------------------------|-------------------------------|
| Frontend only     | `npm run dev:frontend`  | Run `dev:backend` or set URL  |
| Full local stack | `npm run dev`           | Included                      |
