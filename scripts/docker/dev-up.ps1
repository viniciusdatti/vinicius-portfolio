# Start development Docker stack from monorepo root
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $Root

$EnvFile = Join-Path $Root ".env.docker"
$Example = Join-Path $Root ".env.docker.example"

if (-not (Test-Path $EnvFile)) {
    Copy-Item $Example $EnvFile
    Write-Host "Created .env.docker from example."
}

docker compose --env-file .env.docker up --build -d
docker compose --env-file .env.docker ps
