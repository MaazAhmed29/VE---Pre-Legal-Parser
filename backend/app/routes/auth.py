import hashlib
import sqlite3

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from ..database import get_db

router = APIRouter(prefix="/api/auth", tags=["auth"])


class SignupRequest(BaseModel):
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class AuthResponse(BaseModel):
    message: str
    user_id: int
    email: str


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


@router.post("/signup", response_model=AuthResponse)
def signup(req: SignupRequest, db: sqlite3.Connection = Depends(get_db)):
    existing = db.execute(
        "SELECT id FROM users WHERE email = ?", (req.email,)
    ).fetchone()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    cursor = db.execute(
        "INSERT INTO users (email, password_hash) VALUES (?, ?)",
        (req.email, hash_password(req.password)),
    )
    db.commit()
    return AuthResponse(
        message="User created",
        user_id=cursor.lastrowid,
        email=req.email,
    )


@router.post("/login", response_model=AuthResponse)
def login(req: LoginRequest, db: sqlite3.Connection = Depends(get_db)):
    row = db.execute(
        "SELECT id, email FROM users WHERE email = ? AND password_hash = ?",
        (req.email, hash_password(req.password)),
    ).fetchone()
    if not row:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return AuthResponse(message="Logged in", user_id=row["id"], email=row["email"])
