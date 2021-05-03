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
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

## Github vs Bitbucket compare tools
FreeFileSync