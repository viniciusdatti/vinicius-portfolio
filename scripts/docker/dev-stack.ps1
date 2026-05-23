# Start Docker (API + Postgres) and Vite on host
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $Root

$EnvFile = Join-Path $Root ".env.docker"
if (-not (Test-Path $EnvFile)) {
    Copy-Item (Join-Path $Root ".env.docker.example") $EnvFile
}

docker compose --env-file .env.docker up --build -d
docker compose --env-file .env.docker ps

$WebEnv = Join-Path $Root "interfaces\web\.env"
if (-not (Test-Path $WebEnv)) {
    Copy-Item (Join-Path $Root "interfaces\web\.env.example") $WebEnv
}

Write-Host "`nStarting Vite (interfaces/web)..."
Set-Location (Join-Path $Root "interfaces\web")
yarn dev
