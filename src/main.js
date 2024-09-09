// Importa la clase GameScene desde el archivo GameScene.js
import { GameScene } from './scenes/GameScene.js';

// Función para iniciar el juego
function startGame() {
    // Configuración del juego utilizando Phaser
    const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: 'game-container',
        scene: [GameScene],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        input: {
            activePointers: 3,
        }
    };

    // Crea una nueva instancia del juego con la configuración proporcionada
    const game = new Phaser.Game(config);

    window.addEventListener('resize', () => {
        game.scale.resize(window.innerWidth, window.innerHeight);
    });

    const startButton = document.getElementById('start-button');
    startButton.style.display = 'none';
}

// Configura el evento de clic para el botón de inicio del juego
document.getElementById('start-button').addEventListener('click', startGame);
