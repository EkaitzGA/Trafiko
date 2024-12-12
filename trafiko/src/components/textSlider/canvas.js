
class TextSliderCanvas {
    constructor(apiDataFunction, options = {}) {
        // Configuraciones por defecto
        this.options = {
            height: 50,
            backgroundColor: 'rgba(240,240,240,0.8)',
            fontSize: 16,
            fontFamily: 'Arial, sans-serif',
            textColor: 'white',
            speed: 1, // Reducir velocidad
            textSpacing: 600, // Aumentar espacio entre textos
            ...options
        };

        // Crear el canvas
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        // Configurar estilos del canvas
        this.canvas.style.position = 'fixed';
        this.canvas.style.bottom = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = `${this.options.height}px`;
        this.canvas.style.backgroundColor = this.options.backgroundColor;
        this.canvas.style.zIndex = '1000';

        // Añadir al body
        document.body.appendChild(this.canvas);

        this.apiDataFunction = apiDataFunction;
        this.texts = [];
        this.textPositions = [];

        // Configuraciones de texto
        this.fontSize = this.options.fontSize;
        this.fontFamily = this.options.fontFamily;
        this.textColor = this.options.textColor;
        this.speed = this.options.speed;
        this.textSpacing = this.options.textSpacing;

        // Ajustar el tamaño del canvas
        this.resizeCanvas();

        // Escuchar cambios de tamaño de ventana
        window.addEventListener('resize', this.resizeCanvas.bind(this));

        this.init();
    }

    resizeCanvas() {
        // Ajustar tamaño del canvas al ancho de la ventana
        this.canvas.width = window.innerWidth;
        this.canvas.height = this.options.height;

        // Reiniciar posiciones de textos si ya existen
        if (this.texts.length > 0) {
            this.textPositions = this.texts.map((_, index) =>
                this.canvas.width + index * this.textSpacing
            );
        }
    }

    async init() {
        try {
            // Obtener datos de la API
            this.texts = await this.apiDataFunction();
            this.texts = this.texts.map(this.formatIncidenceText);

            // Inicializar posiciones de textos
            this.textPositions = this.texts.map((_, index) =>
                this.canvas.width + index * this.textSpacing
            );

            this.startAnimation();
        } catch (error) {
            console.error('Error inicializando text slider:', error);
        }
    }

    formatIncidenceText(incidence) {
             
            return incidence.incidenceType === "Obras" ?
            `🚧${incidence.province.toUpperCase()}: ${incidence.incidenceType} en ${incidence.road} (${incidence.direction}) - ${incidence.cause}🚧`:
            `⚠️${incidence.province.toUpperCase()}: ${incidence.incidenceType} en ${incidence.road} (${incidence.direction}) - ${incidence.cause}⚠️`
            
    }
    startAnimation() {
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    animate() {
        // Limpiar el canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Si no hay textos, detener la animación
        if (this.texts.length === 0) return;

        // Configurar estilo de texto
        this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        this.ctx.fillStyle = this.textColor;

        // Dibujar y mover todos los textos
        this.texts.forEach((text, index) => {
            // Mover texto
            this.textPositions[index] -= this.speed;

            // Dibujar texto
            this.ctx.fillText(text, this.textPositions[index], this.canvas.height / 2);

            // Medir ancho del texto
            const textWidth = this.ctx.measureText(text).width;

            // Si un texto sale completamente, reiniciar su posición
            if (this.textPositions[index] < -this.textSpacing) {
                this.textPositions[index] = Math.max(...this.textPositions) + this.textSpacing;
            }

        });

        // Continuar animación
        requestAnimationFrame(this.animate);
    }
}

// Exportar para uso
export { TextSliderCanvas };