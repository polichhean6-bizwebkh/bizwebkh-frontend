@echo off
setlocal

REM ==========================================================
REM  Kep Ocean Resort - Local Production Preview
REM  Builds the site and serves the production build locally.
REM ==========================================================

cd /d "%~dp0"

echo.
echo ============================================
echo   Kep Ocean Resort - Build + Preview
echo ============================================
echo.

if not exist "node_modules" (
    echo [1/3] Installing dependencies, this may take a minute...
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: npm install failed. See the messages above.
        echo.
        pause
        exit /b 1
    )
) else (
    echo [1/3] Dependencies already installed, skipping npm install.
)

echo.
echo [2/3] Building the production bundle...
echo.
call npm run build
if errorlevel 1 (
    echo.
    echo ERROR: Build failed. See the messages above.
    echo.
    pause
    exit /b 1
)

echo.
echo [3/3] Starting the production preview server...
echo.
echo Public website:   http://localhost:4173/
echo Admin dashboard:  http://localhost:4173/#/admin
echo.
echo Press Ctrl+C in this window to stop the server.
echo.

call npm run preview

if errorlevel 1 (
    echo.
    echo ERROR: The preview server exited with an error.
    echo.
    pause
    exit /b 1
)

pause
