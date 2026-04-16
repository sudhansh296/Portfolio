@echo off
echo ========================================
echo  MusiqFlow APK Builder
echo ========================================

:: Sync latest web files
echo [1/2] Syncing web files...
call npx cap sync android
if errorlevel 1 goto error

:: Build APK
echo [2/2] Building APK...
cd android
call gradlew.bat assembleDebug
if errorlevel 1 goto error
cd ..

echo.
echo ========================================
echo  SUCCESS! APK is ready at:
echo  android\app\build\outputs\apk\debug\app-debug.apk
echo ========================================
explorer android\app\build\outputs\apk\debug
goto end

:error
echo.
echo BUILD FAILED. Make sure:
echo  1. Android Studio is installed
echo  2. Android SDK is at: C:\Users\sudha\AppData\Local\Android\Sdk
echo  3. Run this from musiqflow-android folder

:end
pause
