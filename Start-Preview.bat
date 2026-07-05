@echo off
title Hotel 1954 - Local Preview
cd /d "%~dp0"

rem --- Find Python (needed to run a tiny local web server) ---
set "PYCMD="
where python >nul 2>nul && set "PYCMD=python"
if not defined PYCMD ( where py >nul 2>nul && set "PYCMD=py -3" )
if not defined PYCMD ( where python3 >nul 2>nul && set "PYCMD=python3" )

if not defined PYCMD (
  echo.
  echo   Python is needed to preview the site.
  echo   1^) Install it from https://www.python.org/downloads/
  echo   2^) During install, TICK "Add Python to PATH"
  echo   3^) Double-click this file again.
  echo.
  pause
  exit /b
)

echo.
echo   ============================================
echo     HOTEL 1954  -  Local Preview
echo   ============================================
echo.
echo   Opening your site at:  http://localhost:8080/
echo.
echo   Keep THIS window open while you browse.
echo   Close it (or press Ctrl+C) to stop.
echo.

rem --- open the browser a moment after the server starts ---
start "" /min cmd /c "timeout /t 2 >nul & start "" http://localhost:8080/"

rem --- run the server (this keeps the window busy on purpose) ---
%PYCMD% -m http.server 8080
