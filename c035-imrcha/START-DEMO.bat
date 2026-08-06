@echo off
setlocal
title IMRCHA Website Demo - bizwebkh.com/c035-imrcha
cd /d "%~dp0"

echo ============================================
echo   IMRCHA Website - Local Preview Launcher
echo   BizWeb KH - Project C035
echo ============================================
echo.

where python >nul 2>nul
if %ERRORLEVEL%==0 (
    echo Starting local server with Python on port 8080...
    echo Opening http://localhost:8080/ in your browser...
    start "" http://localhost:8080/
    python -m http.server 8080
    goto :eof
)

where python3 >nul 2>nul
if %ERRORLEVEL%==0 (
    echo Starting local server with Python3 on port 8080...
    echo Opening http://localhost:8080/ in your browser...
    start "" http://localhost:8080/
    python3 -m http.server 8080
    goto :eof
)

echo Python was not found on this computer.
echo Opening index.html directly in your default browser instead...
start "" "index.html"
echo.
echo NOTE: Some browsers restrict local file access slightly when
echo opening index.html directly. For the most accurate preview,
echo install Python from https://www.python.org and re-run this file.
echo.
pause
