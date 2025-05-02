import { useState, useEffect } from "react";

const testimonios = [
  {
    nombre: "María López",
    texto: "¡El mejor viaje de mi vida! Todo fue perfecto y súper bien organizado.",
    imagen: "/images/user1.jpg",
  },
  {
    nombre: "Carlos Herrera",
    texto: "Recomiendo Viajando a todo el mundo. Atención de primera y destinos increíbles.",
    imagen: "/images/user2.jpg",
  },
  {
    nombre: "Lucía Martínez",
    texto: "Desde que llegamos al aeropuerto hasta el último día, todo fue mágico.",
    imagen: "/images/user3.jpg",
  },
];

export default function TestimoniosSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonios.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white px-8 md:px-20 py-16 text-center relative">
      <h3 className="text-3xl font-bold text-gray-800 mb-10">Testimonios</h3>

      <div className="max-w-2xl mx-auto relative min-h-[220px]">
        {testimonios.map((t, index) => (
          <div
            key={index}
            className={`transition-opacity duration-700 ${
              index === current ? "opacity-100 relative" : "opacity-0 absolute"
            }`}
          >
            <img
              src={t.imagen}
              alt={t.nombre}
              className="mx-auto w-24 h-24 rounded-full object-cover mb-4"
            />
            <p className="text-lg italic text-gray-600">"{t.texto}"</p>
            <p className="mt-4 font-semibold text-gray-800">{t.nombre}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-6">
        {testimonios.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-blue-600 w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
