 ==== Documentacion ====

 1) la aplicacion se dibide en 3 modulos principales
  - pomodor
  - task
  - users

2) el modulo pomodoro contempla todas las funciones del reloj 
  - el codigo principal del reloj se encuentra en
   Mainclock pomodoro
  - los controles visuales del pomodoro se encuentran en el componente pomodoro
  - La funciones de gurdado local del pomodor se encutran dentro del componente
    pomodor en el archivo pomodorTineFunctions.js

3) el modulo task funciona con una base de datos en Firebase con el siguiente diseño:
  - Users
    -task
      - tarea
      - descripcion
      - fecha
      - tamaño
      -user_id
    -times
      - timepo en segundos
      - fecha
      - user_id