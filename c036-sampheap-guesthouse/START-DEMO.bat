@echo off
REM ==========================================================
REM  Sampheap Guesthouse (C036) - Local Demo Launcher
REM  Serves the site with Python's built-in HTTP server so
REM  relative paths, fonts, and scripts behave the same as on
REM  the live GitHub Pages subfolder.
REM ==========================================================
cd /d "%~dp0"

where python >nul 2>nul
if %errorlevel% neq 0 (
    where py >nul 2>nul
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Python was not found on this computer.
        echo Please install Python from https://www.python.org/downloads/
        echo then run this file again.
        echo.
        pause
        exit /b 1
    ) else (
        set PYCMD=py
    )
) else (
    set PYCMD=python
)

echo Starting local server at http://localhost:8080/
echo Press CTRL+C in this window to stop the server.
start "" "http://localhost:8080/"
%PYCMD% -m http.server 8080
