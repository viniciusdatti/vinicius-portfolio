@echo off
REM VD-DL CLI Launcher for Windows
REM Usage: vd-dl up | vd-dl dw | vd-dl --help

powershell -ExecutionPolicy Bypass -File "%~dp0scripts\vd-dl.ps1" %*
