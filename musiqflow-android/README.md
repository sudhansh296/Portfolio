# MusiqFlow Android APK

## Prerequisites
- Node.js 18+
- Android Studio (with Android SDK)
- Java JDK 17+

## Steps to build APK

### 1. Install dependencies
```bash
cd musiqflow-android
npm install
```

### 2. Add Android platform
```bash
npx cap add android
```

### 3. Sync web files to Android
```bash
npx cap sync android
```

### 4. Open in Android Studio
```bash
npx cap open android
```

### 5. In Android Studio
- Wait for Gradle sync to finish
- Go to **Build → Build Bundle(s) / APK(s) → Build APK(s)**
- APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## How the app works

The Android app is a WebView wrapper. It needs your **Node.js server** running on the same WiFi network.

### Run the server (on your PC)
```bash
node server.js
```
Server starts at `http://localhost:5500`

### Connect from phone
1. Open the app
2. Enter your PC's local IP (e.g. `192.168.1.5:5500`)
3. Tap **Connect**

Find your PC's IP: run `ipconfig` on Windows, look for IPv4 address.

---

## Features
- Search songs (iTunes API via server)
- Stream full songs (YouTube via yt-dlp on server)
- Synced lyrics (LrcLib + BetterLyrics)
- Download songs to device (saved as blobs in IndexedDB)
- Offline playback of downloaded songs
- Artist grid, language filters
- Playlist management

## Offline mode
Downloaded songs are stored in IndexedDB as audio blobs.
They play without any server or internet connection.
