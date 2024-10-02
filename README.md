# Documentación

1) La aplicación se divide en 3 módulos principales:
   - Pomodoro
   - Tareas
   - Usuarios

2) El módulo de **Pomodoro** contempla todas las funciones del reloj:
   - El código principal del reloj se encuentra en `MainClockPomodoro`.
   - Los controles visuales del Pomodoro están en el componente `Pomodoro`.
   - Las funciones de guardado local del Pomodoro se encuentran dentro del componente `Pomodoro` en el archivo `pomodoroTimeFunctions.js`.

3) El módulo de **Tareas** funciona con una base de datos en Firebase con el siguiente diseño:
   - **Usuarios**
     - **Tareas**
       - Tarea
       - Descripción
       - Fecha
       - Tamaño
       - user_id
     - **Tiempos**
       - Tiempo en segundos
       - Fecha
       - user_id