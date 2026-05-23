# Smoke test: Docker backend + postgres; optional Vite on host (5173)
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $Root

$ViteUrl = if ($env:WEB_URL) { $env:WEB_URL } else { "http://localhost:5173" }

Write-Host "=== Container status ==="
docker compose --env-file .env.docker ps

Write-Host "`n=== Backend health ==="
$health = Invoke-RestMethod -Uri "http://localhost:8000/health" -TimeoutSec 10
$health | ConvertTo-Json

Write-Host "`n=== API projects (sample) ==="
$projects = Invoke-RestMethod -Uri "http://localhost:8000/api/v1/projects" -TimeoutSec 10
Write-Host "Projects count: $($projects.Count)"

Write-Host "`n=== Vite frontend ($ViteUrl) ==="
try {
  $frontend = Invoke-WebRequest -Uri $ViteUrl -TimeoutSec 15 -UseBasicParsing
  Write-Host "Frontend status: $($frontend.StatusCode)"
} catch {
  Write-Host "Frontend not running (start: yarn --cwd interfaces/web dev)" -ForegroundColor Yellow
}

Write-Host "`nDocker API checks passed."
