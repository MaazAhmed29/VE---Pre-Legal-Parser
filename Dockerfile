FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM python:3.12-slim AS backend
WORKDIR /app

COPY backend/pyproject.toml backend/uv.lock ./
RUN pip install uv && uv sync --frozen

COPY backend/app/ ./app/
COPY backend/catalog.json ./
COPY backend/templates/ ./templates/

COPY --from=frontend-build /app/frontend/.next/static ./static
COPY --from=frontend-build /app/frontend/public ./public

EXPOSE 8000
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
