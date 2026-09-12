import json
from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import PlainTextResponse

router = APIRouter(prefix="/api/catalog", tags=["catalog"])

CATALOG_PATH = Path(__file__).resolve().parent.parent.parent / "catalog.json"
TEMPLATES_DIR = Path(__file__).resolve().parent.parent.parent / "templates"


@router.get("")
def get_catalog():
    return json.loads(CATALOG_PATH.read_text())


@router.get("/{filename}")
def get_template(filename: str):
    path = TEMPLATES_DIR / filename
    if not path.exists() or not path.is_file():
        raise HTTPException(status_code=404, detail="Template not found")
    return PlainTextResponse(content=path.read_text())
