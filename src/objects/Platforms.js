// Define la clase Platforms
export class Platforms {
    // Constructor de la clase Platforms
    constructor(scene) {
        this.scene = scene; // Almacena la referencia a la escena del juego
        this.group = null; // Inicializa el grupo de plataformas como null
    }

    // Método para crear el grupo de plataformas
    create() {
        // Crea un grupo de plataformas estáticas en la escena
        this.group = this.scene.physics.add.staticGroup();

        // Agrega varias plataformas al grupo
        // La primera plataforma se posiciona en (400, 568), se escala 2 veces su tamaño y se actualiza su cuerpo para el sistema de físicas
        this.group.create(400, 1068, 'ground').setScale(10).refreshBody();

        // La segunda plataforma se posiciona en (600, 490) sin escala adicional
        this.group.create(600, 850, 'ground');

        // La tercera plataforma se posiciona en (800, 250) sin escala adicional
        this.group.create(400, 770, 'ground');

        // La cuarta plataforma se posiciona en (850, 220) sin escala adicional
        this.group.create(45 , 690, 'ground');

        // La quinta plataforma se posiciona en (900, 190) sin escala adicional
        this.group.create(900, 620, 'ground');

        // La sexta plataforma se posiciona en (950, 160) sin escala adicional
        this.group.create(450, 550, 'ground');

        // La septima plataforma se posiciona en (1000, 130) sin escala adicional
        this.group.create(200, 480, 'ground');

        // La octava plataforma se posiciona en (1050, 100) sin escala adicional
        this.group.create(300, 400, 'ground');


      // La novena plataforma se posiciona en (1100, 70) sin escala adicional
      this.group.create(780, 320, 'ground');

  
    }
}
