# NeuroScript Hiring Test

A React + FastAPI landing page implementation for the NeuroScript hiring task.

## What is included

- `frontend/` — Vite + React app that renders a responsive landing page.
- `backend/` — FastAPI app that serves editable page content from `backend/content.json`.
- Content can be updated without redeploying by updating `backend/content.json` or by calling the backend `PUT /api/content` endpoint.

## Run locally

1. Start the backend:

```bash
cd backend
python3 -m pip install -r requirements.txt
uvicorn app:app --reload --host 127.0.0.1 --port 8000
```

2. Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

3. Open the frontend at `http://localhost:5173`.

## Editable content

- Backend content endpoint: `GET /api/content`
- Update content: `PUT /api/content`
- The frontend includes a built-in editor for page content and image URLs.

## Notes

- The page is responsive and uses flexible layout styles for desktop and mobile.
- The backend serves content from a JSON file so all page text and image URLs can be changed without rebuilding the frontend.
