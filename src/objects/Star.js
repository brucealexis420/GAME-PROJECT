// Define la clase Star
export class Star {
    // Constructor de la clase Star
    constructor(scene) {
        this.scene = scene; // Almacena la referencia a la escena del juego
        this.group = null; // Inicializa el grupo de estrellas como null
    }

    // Método para crear el grupo de estrellas
    create() {
        // Crea un grupo de estrellas con propiedades específicas
        this.group = this.scene.physics.add.group({
            key: 'star', // Clave de la imagen que se usará para las estrellas
            repeat: 11, // Número de estrellas a crear (total de 12 estrellas)
            setXY: { x: 12, y: 0, stepX: 70 } // Posiciona las estrellas en la escena, con un paso de 70 píxeles entre cada estrella
        });

        // Itera sobre cada estrella en el grupo y configura su comportamiento
        this.group.children.iterate(child => {
            // Establece un rebote aleatorio en el eje Y para cada estrella
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
    }

    // Método que se llama cuando el jugador recoge una estrella
    collectStar(player, star) {
        // Desactiva el cuerpo de la estrella y la oculta de la escena
        star.disableBody(true, true);

        // Incrementa el puntaje y actualiza el texto del puntaje en la escena
        this.scene.score += 1;
        this.scene.scoreText.setText('Score: ' + this.scene.score);

        // Verifica si no hay estrellas activas en el grupo
        if (this.group.countActive(true) === 0) {
            // Si no hay estrellas activas, reactiva todas las estrellas en el grupo
            this.group.children.iterate(child => {
                // Reactiva el cuerpo de cada estrella y la reposiciona en su lugar original
                child.enableBody(true, child.x, 0, true, true);
            });
        }
    }
}
