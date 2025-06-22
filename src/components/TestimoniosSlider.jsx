import { useEffect, useState, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

export default function TestimoniosSlider() {
  const [testimonios, setTestimonios] = useState([]);
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    axios
      .get("/.netlify/functions/testimonios")
      .then((res) => setTestimonios(res.data))
      .catch((err) => console.error("Error al obtener testimonios:", err));
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
    onSwipedRight: () => setCurrent((prev) => (prev - 1 + testimonios.length) % testimonios.length),
    trackMouse: true,
  });

  if (!testimonios.length) return <p className="py-10 text-center">Cargando testimonios...</p>;

  const goPrev = () => setCurrent((prev) => (prev - 1 + testimonios.length) % testimonios.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % testimonios.length);

  return (
    <section {...handlers} className="relative max-w-3xl mx-auto py-12 text-center px-4">
      <h3 className="text-3xl font-bold mb-8">Testimonios</h3>
      {testimonios.map((t, i) => (
        <div
          key={t.id || i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <p className="italic mb-4">&ldquo;{t.texto}&rdquo;</p>
          <p className="font-semibold">{t.nombre}</p>
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, idx) => (
              <FontAwesomeIcon
                key={idx}
                icon={idx < t.estrellas ? faStarSolid : faStarRegular}
                className="text-yellow-400"
              />
            ))}
          </div>
          {t.imagen_url && (
            <img src={t.imagen_url} alt={t.nombre} className="mx-auto mb-4 w-24 h-24 rounded-full object-cover" />
          )}
        </div>
      ))}

      <button onClick={goPrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button onClick={goNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </section>
  );
}
