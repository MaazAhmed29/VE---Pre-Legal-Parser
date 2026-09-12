#!/usr/bin/env bash
set -e

echo "Building and starting Pre-Legal..."
docker compose up --build -d
echo "App running at http://localhost:8000"
