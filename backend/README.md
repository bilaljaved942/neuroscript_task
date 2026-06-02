# Backend Content API

This backend stores page content in `content.json` and exposes a simple REST interface.

## API endpoints

- `GET /api/content` — returns the page content payload.
- `PUT /api/content` — saves updated page content.
- `GET /api/health` — health check endpoint.

## Content editing

Update the page content without redeploying by editing `backend/content.json` or sending a JSON payload to `PUT /api/content`.

Example:

```bash
curl -X PUT http://127.0.0.1:8000/api/content \
  -H "Content-Type: application/json" \
  -d '{"siteName":"NeuroScript","hero":{"eyebrow":"..."}}'
```
