# MURIDKU

Mobile App untuk PKTB.

## Dependencies list

1. React Native (CREATE NEW APP ENVIRONMENT USING npx react-native init)
2. expo
3. Android Studio
4. JDK & JRE v1.8.0_219
5. redux
6. react-redux
7. redux-persist
8. @react-navigation/native
9. react-native-gesture-handler
10. react-native-screens
11. react-native-safe-area-context
12. @react-native-community/masked-view
13. @react-navigation/drawer
14. @react-navigation/stack
15. @react-native-async-storage/async-storage
16. react-dom
17. react-native-web
18. react-native-vector-icons
19. react-bootstrap-icons

## Commands

npx create-react-native-app muridku.ui or npx react-native init muridku.ui

npm install -g expo-cli
npm install expo

npm install redux react-redux redux-persist @react-navigation/native react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view @react-navigation/drawer @react-navigation/stack @react-native-async-storage/async-storage react-dom react-native-web react-native-vector-icons react-bootstrap-icons

## Dependencies installation (*NIX, macOS)

```sh
#!/bin/sh

NPMINSTALL="npm install"
NPMAUDIT="npm audit fix --force"

${NPMINSTALL} react-native
${NPMINSTALL} expo
${NPMINSTALL} react-native-vector-icons
${NPMINSTALL} react-bootstrap-icons
${NPMAUDIT}
```

## To Build the APK
1. register JAVA_HOME to Environment Variables (C:\Program Files\Java\jdk-11.0.1)
2. register LOCALAPPDATA to Environment Variables (C:\Users\vegi-laptop\AppData\Local)
3. register ANDROID_HOME to Environment Variables (%LOCALAPPDATA%\Android\Sdk)
4. register ADB to Environment Variables Path (%ANDROID_HOME%\platform-tools)
5. 

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

## Github vs Bitbucket compare tools
FreeFileSync