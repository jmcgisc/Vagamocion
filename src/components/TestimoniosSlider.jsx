import { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

export default function TestimoniosSlider() {
  const [testimonios, setTestimonios] = useState([]);
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/testimonios")
  //     .then((res) => res.json())
  //     .then(setTestimonios)
  //     .catch((err) => console.error("Error cargando testimonios:", err));
  // }, []);


  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const response = await axios.get("/.netlify/functions/testimonios");
        setTestimonios(response.data);
      } catch (error) {
        console.error("Error al obtener testimonios:", error);
      }
    };

    fetchTestimonios();
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

  if (!Array.isArray(testimonios) || testimonios.length === 0) {
    return <p className="text-center py-10">Cargando testimonios...</p>;
  }

  const goToPrevious  = () => setCurrent((prev) => (prev - 1 + testimonios.length) % testimonios.length);
  const goToNext      = () => setCurrent((prev) => (prev + 1) % testimonios.length);

  return (
    <section id="testimonios" className="bg-gradient-to-b from-white to-blue-50 px-4 sm:px-6 md:px-20 py-24 text-center relative">
      <h3 className="text-4xl font-extrabold text-gray-800 mb-12">
        Testimonios de nuestros viajeros
      </h3>

      <div
        {...handlers}
        className="relative max-w-3xl mx-auto min-h-[380px] sm:min-h-[400px] transition-all"
      >
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
              <p className="text-lg sm:text-xl text-gray-700 italic relative leading-relaxed">
                <span className="line-clamp-4 py-4">{t.nombre}</span>
              </p>
              
              <img
                src={t.imagen_url || "/default-avatar.png"}
                onError={(e) => (e.target.src = "/default-avatar.png")}
                alt={t.nombre}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-6 border-4 border-blue-500 shadow"
              />
              <p className="text-lg sm:text-xl text-gray-700 italic relative leading-relaxed">
                <span className="line-clamp-4 py-4">{t.destino}</span>
              </p>

              <p className="text-lg sm:text-xl text-gray-700 italic relative leading-relaxed">
                <span className="text-4xl sm:text-5xl text-blue-400 absolute top-[-10px] left-[-20px]">
                  “
                </span>
                <span className="line-clamp-4">{t.texto}</span>
                <span className="text-4xl sm:text-5xl text-blue-400 absolute bottom-[-20px] right-[-20px]">
                  ”
                </span>
              </p>

              <p className="mt-6 text-lg font-semibold text-primary">{t.nombre}</p>
              <p className="text-sm text-gray-500">{new Date(t.fecha).toLocaleDateString()}</p>

              {/* Estrellas */}
              <div className="flex justify-center mt-2 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={i < t.estrellas ? faStarSolid : faStarRegular}
                    className="text-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 hover:bg-blue-100 text-gray-700 p-3 rounded-full shadow-lg transition hidden md:block"
        aria-label="Anterior"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 hover:bg-blue-100 text-gray-700 p-3 rounded-full shadow-lg transition hidden md:block"
        aria-label="Siguiente"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
      </button>

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
