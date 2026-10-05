# Chess AI ♞

Juego de ajedrez en español para practicar contra una IA local, en móvil y escritorio.

## Funciones
- Reglas legales con chess.js (incluido en `vendor/`, con su licencia en el encabezado).
- Seis dificultades: Principiante, Fácil, Intermedio, Difícil, Experto y Maestro. Las cifras Elo de la interfaz son orientativas y no están calibradas.
- Blancas, negras o color aleatorio; pistas, deshacer, girar, reiniciar y rendirse.
- Tablero con ocho filas y columnas iguales, independientes del contenido.
- Registro de las últimas 50 partidas y estadísticas de resultados en este navegador.
- Ocho lecciones con tutoriales de tres pasos y ejercicios interactivos: torre, alfil, caballo, peones, centro, enroque, ataque doble y mate.
- Progreso de lecciones guardado en este navegador, independiente del registro de partidas.

Abre `index.html` o publica la raíz de `main` con GitHub Pages. No necesita compilación ni servidor.

La IA utiliza minimax y poda alfa-beta; todavía no es Stockfish. El registro y el progreso se guardan con localStorage: no se sincronizan entre dispositivos y se eliminan al borrar los datos del sitio.
