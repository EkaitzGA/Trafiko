import React, { useEffect, useRef } from 'react';

const TextSlider = ({ apiDataFunction, options = {} }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const textsRef = useRef([]);
  const textPositionsRef = useRef([]);

  const defaultOptions = {
    height: 15,
    fontSize: 10,
    fontFamily: 'Arial, sans-serif',
    textColor: 'rgba(210, 250, 255, 0.8)',
    speed: 1,
    textSpacing: 600,
    ...options
  };

  const formatIncidenceText = (incidence) => {
    return incidence.incidenceType === "Obras" ?
      `🚧${incidence.province.toUpperCase()}: ${incidence.incidenceType} en ${incidence.road} (${incidence.direction}) - ${incidence.cause}🚧` :
      `⚠️${incidence.province.toUpperCase()}: ${incidence.incidenceType} en ${incidence.road} (${incidence.direction}) - ${incidence.cause}⚠️`;
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = defaultOptions.height;

    if (textsRef.current.length > 0) {
      textPositionsRef.current = textsRef.current.map((_, index) =>
        canvas.width + index * defaultOptions.textSpacing
      );
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (textsRef.current.length === 0) return;

    ctx.font = `${defaultOptions.fontSize}px ${defaultOptions.fontFamily}`;
    ctx.fillStyle = defaultOptions.textColor;

    textsRef.current.forEach((text, index) => {
      textPositionsRef.current[index] -= defaultOptions.speed;

      ctx.fillText(text, textPositionsRef.current[index], canvas.height / 2);

      if (textPositionsRef.current[index] < -defaultOptions.textSpacing) {
        textPositionsRef.current[index] = Math.max(...textPositionsRef.current) + defaultOptions.textSpacing;
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  const initCanvas = async () => {
    try {
      const data = await apiDataFunction();
      textsRef.current = data.map(formatIncidenceText);
      textPositionsRef.current = textsRef.current.map((_, index) =>
        canvasRef.current.width + index * defaultOptions.textSpacing
      );
      
      animationRef.current = requestAnimationFrame(animate);
    } catch (error) {
      console.error('Error initializing text slider:', error);
    }
  };

  useEffect(() => {
    resizeCanvas();
    initCanvas();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="text-slider-canvas"
      style={{ width: '100%' }}
    />
  );
};

export default TextSlider;