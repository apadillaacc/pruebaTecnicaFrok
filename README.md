# H1 - Prueba tecnica 

Para poder ejecutar el proyecto en la plataforma android se deben seguir los siguiente pasos
  1. Instalar java
  2. Generar variable de entorno para java
  	- JAVA_HOME(C:\Program Files\Java\jdk{version})
  3. Agregar a la variable path
  	- %JAVA_HOME%\bin
    - %JAVA_HOME%\lib
    - %JAVA_HOME%\jre
    - %JAVA_HOME%\jre\lib 
  4. Instalar Android studio
  	- Ingresar a la seccion de tools -> sdkManager -> SDK Platforms y seleccionar Android 14
    - Continuar a la seccion SDK tools y seleccionar Android SDK Build-tools, Android SDK Command.line tools  (latest), Android sdk platform-Tools, google USB driver (encaso de querer ejecutar a un cellar conectado)
  5. Agregar variables de entorno para Android
    - ANDROID_HOME(C:\Users\xxxx\AppData\Local\Android\Sdk)
	6. Agregar a la variable path
		- %ANDROID_HOME%\tools
		- %ANDROID_HOME%\tools\bin
		- %ANDROID_HOME%\platform-tools
		- %ANDROID_HOME%\jre
		- %ANDROID_HOME%\bin
	7. Instalar gradle
    - Descargar gradle gradle-7.6.4-bin en [Gradle](https://gradle.org/next-steps/?version=7.6.4&format=bin)
    - Descomprimir en "C:\Program Files"
  8. Crear variable de entorno
    - GRADLE (C:\Program Files\gradle-7.6.4\bin)
  9. Agregar a variable path
    - %GRADLE%
  10. Instalar ionic cli con el comando `npm i -g @ionic/cli`
  11. Instalar cordova con el comando `npm i -g cordova@latest -g`
  12. Agregar la plataforma desde el proyecto con el comando `cordova add platform android`
  13. Ejecutar comando `ionic cordova build android`