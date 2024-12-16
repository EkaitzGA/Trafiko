# 🚀 Proyecto de Gestión de Incidencias 🛖

Este proyecto es una aplicación web diseñada para gestionar incidencias y visualizarlas a través de mapas interactivos, carruseles y componentes filtrables. 

## 📂 Estructura del Proyecto

La organización de carpetas y archivos es la siguiente:

```
src/
👉
├── assets/                    # Recursos estáticos como imágenes, íconos, etc.
├── components/                # Componentes reutilizables de React
│   ├── cameras/               # Componentes relacionados con cámaras
│   ├── carousel/              # Carrusel interactivo
│   ├── footer/                # Pie de página
│   ├── incidences/            # Tarjetas y filtros de incidencias
│   ├── LandingPage/           # Página principal
│   ├── map/                   # Mapa interactivo con Leaflet
│   ├── navbar/                # Barra de navegación
│   ├── Root/                  # Componente raíz
│   └── textSlider/            # Componente deslizante de texto
│
├── utils/                     # Utilidades y funciones auxiliares
├── App.jsx                    # Componente principal de React
├── index.css                  # Estilos globales de la aplicación
├── main.jsx                   # Punto de entrada principal
├── Router.jsx                 # Configuración de rutas
│
├── public/                    # Archivos públicos (favicon, index.html, etc.)
├── changelog.md               # Historial de cambios del proyecto
├── README.md                  # Documentación del proyecto
├── eslint.config.js           # Configuración de ESLint
├── vite.config.js             # Configuración de Vite
└── package.json               # Dependencias y configuración del proyecto
```

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. **Clona el repositorio**  
   ```bash
   git clone git@github.com:EkaitzGA/Trafiko.git
   cd tu-repositorio
   ```

2. **Instala las dependencias**  
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**  
   ```bash
   npm run dev
   ```

4. **Abre en tu navegador**  
   El proyecto estará disponible en:  
   ```
   http://localhost:5173
   ```

---

## 📦 Dependencias Principales

- **React**: Librería para construir la interfaz de usuario.
- **Leaflet**: Biblioteca de mapas interactivos.
- **React Router**: Manejo de rutas en la aplicación.
- **Vite**: Herramienta de construcción rápida para proyectos modernos.
- **ESLint**: Análisis de código estático para mantener la calidad.

---

## 🛖 Funcionalidades Clave

- **Gestión de incidencias**: Filtrado y visualización de incidencias mediante tarjetas.  
- **Mapa interactivo**: Muestra cámaras e incidencias usando Leaflet.  
- **Carrusel interactivo**: Componente deslizante para mostrar información destacada.  
- **Text Slider**: Slider de texto para avisos y actualizaciones.  
- **Barra de navegación**: Navegación intuitiva para acceder a las secciones principales.  

---

## 🛡️ Buenas Prácticas

- Sigue la estructura modular y reutilizable para los componentes.  
- Usa ESLint para analizar y corregir errores de sintaxis.  
- Documenta los cambios en el archivo **`CHANGELOG.md`**.  

---

## 👨‍💻 Contribución

Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un *fork* del repositorio.  
2. Crea una nueva rama:  
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz *commit*:  
   ```bash
   git commit -m "Descripción de los cambios"
   ```
4. Envía tus cambios al repositorio:  
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un *Pull Request*.

---

## 📞 Contacto

Si tienes dudas o sugerencias, puedes abrir un **issue** en el repositorio o contactarme directamente.

---

¡Espero que esta documentación sea útil! 🚀🛖
