import React from "react";
import Hero from "../components/Hero";


const Ofertas = () => {
  return (
    
    <section className="min-h-screen bg-white dark:bg-gray-950 px-4 py-10 flex flex-col items-center justify-center">
        
        {/* Header */}
        <Hero /> 
      
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 text-blue-700 dark:text-purple-400 h-26 py-28">
            Ofertas Exclusivas
        </h1>

        <div className="w-full max-w-7xl aspect-[3/4] md:aspect-[16/9]">
            <iframe 
            src="https://www.megatravel.com.mx/tools/ofertas-viaje.php?Dest=&txtColor=1D1D1D&lblTPaq=9900FF&lblTRange=570090&lblNumRange=9900FF&itemBack=D5D5D5&ItemHov=360058&txtColorHov=ffffff&ff=1"
            className="w-full h-full border-0 rounded-lg shadow-xl"
            allowTransparency="true"
            frameBorder="0"
            title="Ofertas de Viaje"
            ></iframe>
        </div>
    </section>
  );
};

export default Ofertas;
