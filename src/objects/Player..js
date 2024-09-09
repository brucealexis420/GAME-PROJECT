// Define la clase Player
export class Player {
    // Constructor de la clase Player
    constructor(scene) {
        this.scene = scene; // Almacena la referencia a la escena del juego
        this.sprite = null; // Inicializa el sprite del jugador como null
    }

    // Método para crear el sprite del jugador y sus animaciones
    create() {
        // Crea el sprite del jugador en la escena con las siguientes propiedades
       // this.sprite = this.scene.physics.add.sprite(100, 450, 'dude');
        this.sprite = this.scene.physics.add.sprite(100, 650, 'dude');
       //this.sprite.setCollideWorldBounds(true); // Evita que el jugador salga de los límites del mundo
        this.sprite.setBounce(0.2); // Establece el rebote del jugador
        this.sprite.body.setGravityY(300); // Aplica gravedad en el eje Y al jugador

        // Define la animación para moverse hacia la izquierda
        this.scene.anims.create({
            key: 'left', // Clave de la animación
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), // Frames de la animación
            frameRate: 10, // Velocidad de la animación
            repeat: -1 // Repite la animación indefinidamente
        });

        // Define la animación para estar de pie (sin movimiento)
        this.scene.anims.create({
            key: 'turn', // Clave de la animación
            frames: [{ key: 'dude', frame: 4 }], // Frame único para esta animación
            frameRate: 20 // Velocidad de la animación
        });

        // Define la animación para moverse hacia la derecha
        this.scene.anims.create({
            key: 'right', // Clave de la animación
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }), // Frames de la animación
            frameRate: 10, // Velocidad de la animación
            repeat: -1 // Repite la animación indefinidamente
        });

        
    }

    // Método para manejar el movimiento del jugador basado en las teclas de cursor
    handleMovement(cursors) {
        // Verifica si la tecla izquierda está presionada
        if (cursors.left.isDown) {
            this.sprite.setVelocityX(-160); // Mueve al jugador hacia la izquierda
            this.sprite.anims.play('left', true); // Reproduce la animación de moverse hacia la izquierda
        } 
        // Verifica si la tecla derecha está presionada
        else if (cursors.right.isDown) {
            this.sprite.setVelocityX(160); // Mueve al jugador hacia la derecha
            this.sprite.anims.play('right', true); // Reproduce la animación de moverse hacia la derecha
        } 
        // Si ninguna tecla de dirección está presionada
        else {
            this.sprite.setVelocityX(0); // Detiene el movimiento horizontal
            this.sprite.anims.play('turn'); // Reproduce la animación de estar de pie
        }

        // Verifica si la tecla arriba está presionada y el jugador está tocando el suelo
        if (cursors.up.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-330); // Aplica una fuerza hacia arriba para saltar
        }
    }
}