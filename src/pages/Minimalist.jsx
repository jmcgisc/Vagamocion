import { useState } from 'react';
import { useEffect } from 'react';
import ExperienciasGrid from "../components/ExperienciasGrid";
import FormularioContacto from "../components/FormularioContacto";
import MapaInteractivo from "../components/MapaInteractivo";


const images = [
  '/images/playa.jpg',
  '/images/montana.jpg',
  '/images/ciudad.jpg',
];

export default function Minimalist() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, 4000); // cada 4 segundos

  return () => clearInterval(interval);
}, [images.length]);

  return (
    <section className="relative w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Destinos Populares</h1>
  
      <div className="relative w-full h-64 overflow-hidden rounded-2xl shadow-lg">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Destino ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
  
      {/* Dots */}
      <div className="flex justify-center gap-3 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === current ? 'bg-blue-600 w-6' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>

      <ExperienciasGrid />
      <FormularioContacto />
      <MapaInteractivo />


    </section>

    
  );
}
