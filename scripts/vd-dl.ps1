<#
.SYNOPSIS
    VD-DL CLI - Vinicius Datti Portfolio Development Launcher
.DESCRIPTION
    Command-line interface to manage the full development stack.
    Supports starting/stopping backend, frontend, and all services.
.EXAMPLE
    vd-dl up        # Start all services
    vd-dl down      # Stop all services
    vd-dl --help    # Show help
#>

param(
    [Parameter(Position = 0)]
    [string]$Command,
    
    [Parameter(Position = 1)]
    [string]$Service,
    
    [switch]$Help,
    [switch]$h,
    [switch]$web,
    [switch]$w
)

# ============================================
# Configuration
# ============================================

$script:ProjectRoot = (Get-Item $PSScriptRoot).Parent.FullName
$script:BackendDir = Join-Path $script:ProjectRoot "backend"
$script:FrontendDir = Join-Path $script:ProjectRoot "interfaces\web"
$script:VenvPath = Join-Path $script:BackendDir "venv"
$script:VenvActivate = Join-Path $script:VenvPath "Scripts\Activate.ps1"

# ============================================
# Helper Functions
# ============================================

function Write-ColorText {
    param(
        [string]$Text,
        [string]$Color = "White",
        [switch]$NoNewline
    )
    if ($NoNewline) {
        Write-Host $Text -ForegroundColor $Color -NoNewline
    } else {
        Write-Host $Text -ForegroundColor $Color
    }
}

function Write-Header {
    Write-Host ""
    Write-ColorText "==================================================================" "Cyan"
    Write-ColorText "           VD-DL - Portfolio Development Launcher                 " "Cyan"
    Write-ColorText "==================================================================" "Cyan"
    Write-Host ""
}

function Test-VenvExists {
    return Test-Path $script:VenvActivate
}

function Load-BackendEnv {
    $envFile = Join-Path $script:BackendDir ".env"
    if (-not (Test-Path $envFile)) {
        return
    }
    $content = Get-Content $envFile -Encoding UTF8 -Raw
    if ($content.Length -ge 3 -and $content[0] -eq [char]0xFEFF) {
        $content = $content.Substring(1)
    }
    $content -split "`r?`n" | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith("#") -and $line -match '^\s*([^#=]+?)\s*=\s*(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim().Trim('"').Trim("'")
            if ($value) {
                [System.Environment]::SetEnvironmentVariable($key, $value, 'Process')
            }
        }
    }
}

# ============================================
# Command Functions
# ============================================

function Show-HelpMenu {
    Write-Header
    
    Write-ColorText "USAGE:" "Yellow"
    Write-Host "  vd-dl [command] [options]"
    Write-Host ""
    
    Write-ColorText "COMMANDS:" "Yellow"
    Write-Host "  up               Start backend API (default)"
    Write-Host "  up -web          Start backend + frontend"
    Write-Host "  down, dw         Stop all running services"
    Write-Host "  status, st       Show status of all services"
    Write-Host "  restart          Restart backend"
    Write-Host "  restart -web     Restart backend + frontend"
    Write-Host ""
    
    Write-ColorText "OPTIONS:" "Yellow"
    Write-Host "  -web, -w         Include frontend in the command"
    Write-Host ""
    
    Write-ColorText "EXAMPLES:" "Yellow"
    Write-Host "  vd-dl up              # Start backend only"
    Write-Host "  vd-dl up -web         # Start backend + frontend"
    Write-Host "  vd-dl dw              # Stop all services"
    Write-Host "  vd-dl status          # Check running services"
    Write-Host ""
    
    Write-ColorText "========================================" "Cyan"
    Write-ColorText "API ENDPOINTS (when running):" "Yellow"
    Write-ColorText "========================================" "Cyan"
    Write-Host ""
    Write-Host "  Backend API:      http://localhost:8000"
    Write-Host "  API Docs:         http://localhost:8000/docs"
    Write-Host "  ReDoc:            http://localhost:8000/redoc"
    Write-Host "  Health Check:     http://localhost:8000/health"
    Write-Host "  Frontend:         http://localhost:3001"
    Write-Host ""
    
    Write-ColorText "========================================" "Cyan"
    Write-ColorText "REST API ROUTES:" "Yellow"
    Write-ColorText "========================================" "Cyan"
    Write-Host ""
    Write-ColorText "  Projects:" "Green"
    Write-Host "    GET  /api/v1/projects          List all projects"
    Write-Host "    GET  /api/v1/projects/{id}     Get project by ID"
    Write-Host "    POST /api/v1/projects          Create project (admin)"
    Write-Host "    PUT  /api/v1/projects/{id}     Update project (admin)"
    Write-Host "    DEL  /api/v1/projects/{id}     Delete project (admin)"
    Write-Host ""
    Write-ColorText "  Skills:" "Green"
    Write-Host "    GET  /api/v1/skills            List all skills"
    Write-Host "    POST /api/v1/skills            Create skill (admin)"
    Write-Host ""
    Write-ColorText "  Certificates:" "Green"
    Write-Host "    GET  /api/v1/certificates      List all certificates"
    Write-Host "    POST /api/v1/certificates      Create certificate (admin)"
    Write-Host ""
    Write-ColorText "  Contact:" "Green"
    Write-Host "    POST /api/v1/contact           Send contact message"
    Write-Host ""
    Write-ColorText "  Authentication:" "Green"
    Write-Host "    POST /api/v1/auth/login        Admin login"
    Write-Host "    POST /api/v1/auth/refresh      Refresh access token"
    Write-Host "    GET  /api/v1/auth/me           Get current user"
    Write-Host ""
    
    Write-ColorText "========================================" "Cyan"
    Write-ColorText "WEBSOCKET NAMESPACES:" "Yellow"
    Write-ColorText "========================================" "Cyan"
    Write-Host ""
    Write-Host "  /chat            Visitor chat namespace"
    Write-Host "    Events: connect, start_session, send_message, typing"
    Write-Host ""
    Write-Host "  /admin-chat      Admin chat namespace"
    Write-Host "    Events: connect, join_session, send_message, mark_read"
    Write-Host ""
    
    Write-ColorText "========================================" "Cyan"
    Write-ColorText "LOGS:" "Yellow"
    Write-ColorText "========================================" "Cyan"
    Write-Host ""
    Write-Host "  Backend:  Logs appear in THIS terminal (uvicorn runs in foreground)."
    Write-Host "  Frontend: With 'vd-dl up -web', frontend runs in background; to see"
    Write-Host "            its logs, run 'yarn start' in another terminal from"
    Write-Host "            interfaces/web."
    Write-Host ""
    Write-ColorText "========================================" "Cyan"
    Write-ColorText "DEBUG TIPS:" "Yellow"
    Write-ColorText "========================================" "Cyan"
    Write-Host ""
    Write-Host "  1. Access Swagger UI at http://localhost:8000/docs"
    Write-Host "  2. Use 'vd-dl status' to verify services are running"
    Write-Host "  3. Frontend has hot reload - changes apply automatically"
    Write-Host "  4. Database: SQLite at backend/portfolio.db (dev mode)"
    Write-Host ""
}

function Start-BackendService {
    Write-ColorText "[API] Starting FastAPI backend..." "Green"
    
    if (-not (Test-VenvExists)) {
        Write-ColorText "[API] Virtual environment not found. Creating..." "Yellow"
        Push-Location $script:BackendDir
        python -m venv venv
        & $script:VenvActivate
        pip install -r requirements.txt
        Pop-Location
    }
    
    Push-Location $script:BackendDir
    
    $env:PYTHONPATH = $script:BackendDir
    & $script:VenvActivate
    
    Write-ColorText "[API] Backend running at http://localhost:8000" "Cyan"
    Write-ColorText "[API] Docs available at http://localhost:8000/docs" "Cyan"
    Write-Host ""
    
    uvicorn app.main:socket_app --reload --host 0.0.0.0 --port 8000
    
    Pop-Location
}

function Start-FrontendService {
    Write-ColorText "[WEB] Starting React frontend..." "Green"
    
    Push-Location $script:FrontendDir
    
    if (-not (Test-Path "node_modules")) {
        Write-ColorText "[WEB] Installing dependencies..." "Yellow"
        yarn install
    }
    
    Write-ColorText "[WEB] Frontend running at http://localhost:3001" "Cyan"
    Write-Host ""
    
    $env:PORT = 3001
    yarn start
    
    Pop-Location
}

function Start-AllServices {
    param([bool]$IncludeWeb = $false)
    
    Write-Header
    
    if ($IncludeWeb) {
        Write-ColorText "Starting backend + frontend..." "Green"
        Write-Host ""
        Write-ColorText "This will start:" "Yellow"
        Write-Host "  - FastAPI Backend (http://localhost:8000)"
        Write-Host "  - React Frontend  (http://localhost:3001)"
        Write-Host ""
        Write-ColorText "Access points:" "Cyan"
        Write-Host "  Backend API:  http://localhost:8000"
        Write-Host "  API Docs:     http://localhost:8000/docs"
        Write-Host "  Frontend:     http://localhost:3001"
        Write-Host ""
        
        # Start frontend as background job
        Write-ColorText "[WEB] Starting frontend in background..." "Green"
        $frontendJob = Start-Job -ScriptBlock {
            param($dir)
            Set-Location $dir
            $env:PORT = 3001
            yarn start
        } -ArgumentList $script:FrontendDir
        
        Write-ColorText "[WEB] Frontend job started (ID: $($frontendJob.Id))" "Cyan"
        Write-Host ""
        
        # Start backend in foreground (blocking)
        Write-ColorText "[API] Starting backend (Ctrl+C to stop all)..." "Green"
        Write-Host ""
        
        Load-BackendEnv
        if (-not $env:RESEND_API_KEY) {
            Write-ColorText "[API] Email disabled: add RESEND_API_KEY to backend\.env" "Yellow"
            Write-Host ""
        }
        Push-Location $script:BackendDir
        $env:PYTHONPATH = $script:BackendDir
        & $script:VenvActivate
        uvicorn app.main:socket_app --reload --host 0.0.0.0 --port 8000
        Pop-Location
        
        # When backend stops, also stop frontend
        Write-ColorText "[INFO] Stopping frontend job..." "Yellow"
        Stop-Job -Job $frontendJob -ErrorAction SilentlyContinue
        Remove-Job -Job $frontendJob -Force -ErrorAction SilentlyContinue
    } else {
        Write-ColorText "Starting backend..." "Green"
        Write-Host ""
        Write-ColorText "Access points:" "Cyan"
        Write-Host "  Backend API:  http://localhost:8000"
        Write-Host "  API Docs:     http://localhost:8000/docs"
        Write-Host ""
        Write-ColorText "Press Ctrl+C to stop" "Yellow"
        Write-Host ""
        
        # Load backend .env (RESEND_API_KEY, EMAIL_TO_ADMIN, etc.) so email works
        Load-BackendEnv
        if (-not $env:RESEND_API_KEY) {
            Write-ColorText "[API] Email disabled: add RESEND_API_KEY to backend\.env" "Yellow"
            Write-Host "       File: $script:BackendDir\.env (copy from .env.example)"
            Write-Host ""
        }
        # Start backend in foreground (current terminal)
        Push-Location $script:BackendDir
        $env:PYTHONPATH = $script:BackendDir
        & $script:VenvActivate
        uvicorn app.main:socket_app --reload --host 0.0.0.0 --port 8000
        Pop-Location
    }
}

function Stop-AllServices {
    Write-Header
    Write-ColorText "Stopping all services..." "Yellow"
    Write-Host ""
    
    # Stop processes on port 8000 (backend)
    $apiProcesses = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue | 
        Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($procId in $apiProcesses) {
        try {
            Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
            Write-ColorText "[API] Stopped process $procId on port 8000" "Green"
        } catch {}
    }
    
    # Stop processes on port 3001 (frontend)
    $webProcesses = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | 
        Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($procId in $webProcesses) {
        try {
            Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
            Write-ColorText "[WEB] Stopped process $procId on port 3001" "Green"
        } catch {}
    }
    
    if (-not $apiProcesses -and -not $webProcesses) {
        Write-ColorText "[INFO] No services were running" "Yellow"
    } else {
        Write-ColorText "[OK] All services stopped" "Green"
    }
    Write-Host ""
}

function Show-ServiceStatus {
    Write-Header
    Write-ColorText "Service Status:" "Yellow"
    Write-Host ""
    
    # Check backend
    $backendRunning = $false
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8000/health" -TimeoutSec 2 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            $backendRunning = $true
        }
    } catch {}
    
    if ($backendRunning) {
        Write-ColorText "  [RUNNING] " "Green" -NoNewline
        Write-Host "Backend API    - http://localhost:8000"
        Write-ColorText "            " "Green" -NoNewline
        Write-Host "API Docs       - http://localhost:8000/docs"
    } else {
        Write-ColorText "  [STOPPED] " "Red" -NoNewline
        Write-Host "Backend API    - http://localhost:8000"
    }
    
    # Check frontend
    $frontendRunning = $false
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3001" -TimeoutSec 2 -ErrorAction Stop
        $frontendRunning = $true
    } catch {}
    
    if ($frontendRunning) {
        Write-ColorText "  [RUNNING] " "Green" -NoNewline
        Write-Host "Frontend       - http://localhost:3001"
    } else {
        Write-ColorText "  [STOPPED] " "Red" -NoNewline
        Write-Host "Frontend       - http://localhost:3001"
    }
    
    Write-Host ""
}

# ============================================
# Main Execution
# ============================================

if ($Help -or $h -or $Command -eq "--help" -or $Command -eq "-h" -or -not $Command) {
    Show-HelpMenu
    exit 0
}

$includeWeb = $web -or $w

switch ($Command.ToLower()) {
    "up" {
        Start-AllServices -IncludeWeb $includeWeb
    }
    "down" { Stop-AllServices }
    "dw" { Stop-AllServices }
    "status" { Show-ServiceStatus }
    "st" { Show-ServiceStatus }
    "restart" {
        Stop-AllServices
        Start-Sleep -Seconds 2
        Start-AllServices -IncludeWeb $includeWeb
    }
    "--help" { Show-HelpMenu }
    "-h" { Show-HelpMenu }
    default {
        Write-ColorText "Unknown command: $Command" "Red"
        Write-Host "Run 'vd-dl --help' for usage information"
    }
}
