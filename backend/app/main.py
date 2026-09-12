from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .database import init_db
from .routes.auth import router as auth_router
from .routes.health import router as health_router

STATIC_DIR = Path(__file__).resolve().parent.parent / "static"
PUBLIC_DIR = Path(__file__).resolve().parent.parent / "public"


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="Pre-Legal API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(auth_router)

if PUBLIC_DIR.exists():
    app.mount("/public", StaticFiles(directory=str(PUBLIC_DIR)), name="public")
if STATIC_DIR.exists():
    app.mount("/_next/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


@app.get("/{path:path}")
async def serve_spa(path: str):
    """Serve the Next.js SPA for all non-API routes."""
    index = STATIC_DIR.parent / "index.html"
    if index.exists():
        from fastapi.responses import HTMLResponse

        return HTMLResponse(content=index.read_text())
    return {"detail": "Frontend not built"}
