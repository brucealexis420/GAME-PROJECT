// Importa la clase GameScene desde el archivo GameScene.js
import { GameScene } from './scenes/GameScene.js';

// Función para iniciar el juego
function startGame() {
    // Configuración del juego utilizando Phaser
    const config = {
        type: Phaser.AUTO, // Utiliza el renderizador automáticamente (WebGL o Canvas)
        width: 800, // Ancho del juego en píxeles
        height: 600, // Alto del juego en píxeles
        parent: 'game-container', // ID del contenedor HTML donde se renderizará el juego
        scene: [GameScene], // Lista de escenas que se cargarán, en este caso solo GameScene
        physics: {
            default: 'arcade', // Tipo de físicas a usar (Arcade Physics)
            arcade: {
                gravity: { y: 300 }, // Gravedad aplicada en el eje Y
                debug: false // Desactiva el modo de depuración de físicas
            }
        }
    };

    // Crea una nueva instancia del juego con la configuración proporcionada
    const game = new Phaser.Game(config);

    // Oculta el botón de inicio después de iniciar el juego
    const startButton = document.getElementById('start-button');
    startButton.style.display = 'none';
}

// Configura el evento de clic para el botón de inicio del juego
document.getElementById('start-button').addEventListener('click', startGame);
