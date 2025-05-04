import { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function TestimoniosSlider() {
  const [testimonios, setTestimonios] = useState([]);
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Cargar testimonios desde el JSON
    fetch("/testimonios.json")
      .then((res) => res.json())
      .then(setTestimonios)
      .catch((err) => console.error("Error cargando testimonios:", err));
  }, []);

  useEffect(() => {
    if (testimonios.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % testimonios.length);
      }, 6000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, testimonios]);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrent((prev) => (prev + 1) % testimonios.length),
    onSwipedRight: () =>
      setCurrent((prev) => (prev - 1 + testimonios.length) % testimonios.length),
    trackMouse: true,
  });

  if (testimonios.length === 0) {
    return <p className="text-center py-10">Cargando testimonios...</p>;
  }

  // Funciones de cambio de testimonios
  const goToPrevious = () => setCurrent((prev) => (prev - 1 + testimonios.length) % testimonios.length);
  const goToNext = () => setCurrent((prev) => (prev + 1) % testimonios.length);

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 px-4 sm:px-6 md:px-20 py-24 text-center relative">
      <h3 className="text-4xl font-extrabold text-gray-800 mb-12">
        Testimonios de nuestros viajeros
      </h3>

      <div
        {...handlers}
        className="relative max-w-3xl mx-auto min-h-[380px] sm:min-h-[400px] transition-all"
      >
        {/* Cards de Testimonios */}
        {testimonios.map((t, index) => (
          <div
            key={index}
            className={`absolute inset-0 px-6 sm:px-10 transition-all duration-700 ease-in-out ${
              index === current
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-95 z-0 pointer-events-none"
            }`}
          >
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-6 sm:p-10 h-full flex flex-col items-center justify-center text-left">
              <img
                src={t.imagen}
                alt={t.nombre}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-6 border-4 border-blue-500 shadow"
              />
              <p className="text-lg sm:text-xl text-gray-700 italic relative leading-relaxed">
                <span className="text-4xl sm:text-5xl text-blue-400 absolute top-[-10px] left-[-20px]">
                  “
                </span>
                {/* Limitar el número de líneas de texto */}
                <span className="line-clamp-4">{t.texto}</span>
                <span className="text-4xl sm:text-5xl text-blue-400 absolute bottom-[-20px] right-[-20px]">
                  ”
                </span>
              </p>
              <p className="mt-6 text-lg font-semibold text-primary">{t.nombre}</p>
              <p className="text-sm text-gray-500">{new Date(t.fecha).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón anterior fuera de las cards (más cerca y ajustado a móvil) */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 hover:bg-blue-100 text-gray-700 p-3 rounded-full shadow-lg transition hidden md:block"
        aria-label="Anterior"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
      </button>

      {/* Botón siguiente fuera de las cards (más cerca y ajustado a móvil) */}
      <button
        onClick={goToNext}
        className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 hover:bg-blue-100 text-gray-700 p-3 rounded-full shadow-lg transition hidden md:block"
        aria-label="Siguiente"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
      </button>

      {/* Dots indicadores solo para móviles */}
      <div className="flex justify-center mt-10 gap-3 md:hidden">
        {testimonios.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-4 w-4 sm:h-5 sm:w-5 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-secondary w-7 h-7 sm:w-8 sm:h-8 shadow-lg scale-110"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
