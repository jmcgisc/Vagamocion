import React, { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";

const Ofertas = () => {
  const iframeRef = useRef(null);
  const [loadIframe, setLoadIframe] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadIframe(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => {
      if (iframeRef.current) observer.unobserve(iframeRef.current);
    };
  }, []);

  return (
    <section className="min-h-screen bg-white dark:bg-gray-950 px-4 py-10 flex flex-col items-center justify-center">
      <Hero />

      <h1 className="text-3xl md:text-5xl font-poppins text-center mb-6 text-secondary dark:text-primary h-16 py-28">
        Ofertas Destacadas
      </h1>

      <div className="w-full max-w-7xl aspect-[3/4] md:aspect-[16/9]" ref={iframeRef}>
        {loadIframe ? (
          <iframe
            src="https://www.megatravel.com.mx/tools/ofertas-viaje.php?Dest=&txtColor=1D1D1D&lblTPaq=9900FF&lblTRange=570090&lblNumRange=9900FF&itemBack=D5D5D5&ItemHov=360058&txtColorHov=ffffff&ff=1"
            className="w-full h-full border-0 rounded-lg shadow-xl"
            allowTransparency="true"
            frameBorder="0"
            title="Ofertas de Viaje"
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse">
            <span className="text-gray-500 dark:text-gray-300">Cargando ofertas...</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Ofertas;
