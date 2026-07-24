@echo off
setlocal

REM ==========================================================
REM  Kep Ocean Resort - Local Demo Launcher
REM  Do not double-click index.html - use this file instead.
REM ==========================================================

cd /d "%~dp0"

echo.
echo ============================================
echo   Kep Ocean Resort - Starting Local Demo
echo ============================================
echo.

if not exist "node_modules" (
    echo [1/2] Installing dependencies, this may take a minute...
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: npm install failed. See the messages above.
        echo.
        pause
        exit /b 1
    )
) else (
    echo [1/2] Dependencies already installed, skipping npm install.
)

echo.
echo [2/2] Starting the development server...
echo.
echo When the server is ready, open the Local URL shown below in your browser.
echo Public website:   http://localhost:5173/
echo Admin dashboard:  http://localhost:5173/#/admin
echo.
echo Press Ctrl+C in this window to stop the server.
echo.

call npm run dev

if errorlevel 1 (
    echo.
    echo ERROR: The development server exited with an error.
    echo.
    pause
    exit /b 1
)

pause
