import { Player } from '../objects/Player..js'; // Importa la clase Player desde el archivo Player.js
import { Star } from '../objects/Star.js'; // Importa la clase Star desde el archivo Star.js
import { Platforms } from '../objects/Platforms.js'; // Importa la clase Platforms desde el archivo Platforms.js

// Define la clase GameScene que hereda de Phaser.Scene
export class GameScene extends Phaser.Scene {
    // Constructor de la escena del juego
    constructor() {
        super({ key: 'GameScene' }); // Configura la clave de la escena
        // Inicializa las propiedades de la escena
        this.score = 0; // Puntaje inicial
        this.scoreText = null; // Texto del puntaje, se asignará en create()
        this.player = null; // Referencia al jugador, se asignará en create()
        this.stars = null; // Referencia a las estrellas, se asignará en create()
        this.platforms = null; // Referencia a las plataformas, se asignará en create()
        this.cursors = null; // Referencia a las teclas de cursor, se asignará en create()
    }

    // Método para precargar recursos del juego
    preload() {
        // Carga las imágenes y spritesheets necesarios para la escena
        this.load.image('infernal', 'assets/infernal.png'); // Imagen del fondo
        this.load.image('city', 'assets/city.png'); // Imagen del fondo
        this.load.image('ground', 'assets/platform.png'); // Imagen de la plataforma
        this.load.image('star', 'assets/star.png'); // Imagen de la estrella
        this.load.image('bomb', 'assets/bomb.png'); // Imagen de la bomba
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 }); // Spritesheet del jugador
    }

    // Método para crear los objetos y configurar la escena
    create() {
        // Agrega la imagen de fondo a la escena
        this.add.image(400, 650, 'infernal').setDisplaySize(800, 1000);
        this.add.image(400, -60, 'city').setDisplaySize(800, 800);

        // Inicializa y crea las plataformas
        this.platforms = new Platforms(this);
        this.platforms.create();



        // Inicializa y crea el jugador
        this.player = new Player(this);
        this.player.create(); 

        // Detectar toques en la pantalla para moverse
        this.input.on('pointerdown', (pointer) => {
            if (pointer.x < this.scale.width / 2) {
                this.player.sprite.setVelocityX(-160); // Izquierda
                this.player.sprite.anims.play('left', true);
            } else {
                this.player.sprite.setVelocityX(160); // Derecha
                this.player.sprite.anims.play('right', true);
            }
        });

        this.input.on('pointerup', () => {
            this.player.sprite.setVelocityX(0); // Detener movimiento
            this.player.sprite.anims.play('turn');
        });

        // Detectar un swipe para saltar
        this.input.on('pointerdown', (pointer) => {
            this.startY = pointer.y;
        });

    this.input.on('pointerup', (pointer) => {
        if (this.startY - pointer.y > 50 && this.player.sprite.body.touching.down) {
            this.player.sprite.setVelocityY(-330); // Saltar con swipe
        }
    });

        // Configura la cámara
        this.cameras.main.setBounds(0, 0, 800, 5000); // Ajusta según el tamaño de tu mundo
        this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1); // La cámara seguirá al jugador con suavidad

        // Inicializa y crea las estrellas
        this.stars = new Star(this);
        this.stars.create();

        // Crea el texto para mostrar el puntaje
        this.createScoreText();

        // Configura las colisiones entre los objetos
        this.setupCollisions();

        // Configura las teclas de cursor para el control del jugador
        this.cursors = this.input.keyboard.createCursorKeys();
        
    }

    // Método que se llama en cada frame para actualizar la escena
    update() {
        // Maneja el movimiento del jugador según las teclas de cursor presionadas
        this.player.handleMovement(this.cursors);
        const camera = this.cameras.main;
        const player = this.player.sprite;

        // Ajusta la cámara para que siga al jugador
        if (player.y < camera.scrollY + camera.height / 2) {
            camera.scrollY = Math.max(player.y - camera.height / 2, 0);
        }

        // Actualiza la posición del texto del puntaje para que siga a la cámara
        this.scoreText.setPosition(camera.scrollX + 16, camera.scrollY + 16);

        
    }

    // Método para crear y mostrar el texto del puntaje
    createScoreText() {
        // Agrega el texto del puntaje en la esquina superior izquierda
        this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, { fontSize: '32px', fill: '#ffff' }); // Rojo

    }

    // Método para configurar las colisiones y superposiciones
    setupCollisions() {
        // Configura la colisión entre el jugador y las plataformas
        this.physics.add.collider(this.player.sprite, this.platforms.group);
        // Configura la colisión entre las estrellas y las plataformas
        this.physics.add.collider(this.stars.group, this.platforms.group);
        // Configura la superposición entre el jugador y las estrellas para recoger estrellas
        this.physics.add.overlap(this.player.sprite, this.stars.group, this.stars.collectStar.bind(this.stars), null, this);
    }
}