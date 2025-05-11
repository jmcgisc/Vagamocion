import Hero from "../components/Hero";
import ExperienciasGrid from "../components/ExperienciasGrid";
import MapaInteractivo from "../components/MapaInteractivo"; 
import TestimoniosSlider from "../components/TestimoniosSlider";
import CtaViaje from "../components/CtaViaje"; 
import FormularioContacto from "../components/FormularioContacto";
import Servicios from "../components/Servicios";
import WhatsAppFloat from "../components/WhatsAppFloat";
import Footer from "../components/Footer";
import QuienesSomos from "../components/QuienesSomos";
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Helmet } from "react-helmet";

const destinos = [
  {
    id: "europa",
    nombre: "Europa",
    imagen: "/images/destino-paris.jpg",
    descripcion:
      "Sumérgete en un cuento de hadas entre castillos, calles adoquinadas y paisajes de ensueño. Vive la magia del romanticismo europeo en cada paso.",
    galeria: [
        "/images/destino-paris.jpg",
        "/images/Japon.webp",
        "/images/destino-paris.jpg",
      ],
    },
  {
    id: "japon",
    nombre: "Japón",
    imagen: "/images/Japon.webp",
    descripcion:
      "Descubre la armonía entre tecnología y tradición, con templos milenarios, cerezos en flor y una cultura fascinante.",
  },
  {
    id: "disneyland",
    nombre: "Disneyland",
    imagen: "/images/DISNEY.webp",
    descripcion:
      "Regresa a tu infancia con aventuras mágicas, castillos encantados y personajes que cobran vida en el lugar más feliz del mundo.",
  },
];

export default function Home() {
  
  const [selectedDestino, setSelectedDestino] = useState(null);
  const closeModal = () => setSelectedDestino(null);
  const [mostrarGaleria, setMostrarGaleria] = useState(false);
  
  return (
    <>
    <Helmet>
      <meta property="og:title" content="Contáctanos | Agencia de Viajes" />
      <meta property="og:description" content="Planea tu viaje ideal con nosotros. Llena el formulario y te contactamos." />
      <meta property="og:image" content="https://vagamociontravel.com/imagen-seo.jpg" />
      <meta property="og:url" content="https://vagamociontravel.com/contacto" />
      <meta property="og:type" content="website" />

      <script type="application/ld+json">
      {`
      {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": "Agencia de Viajes Vagamocion Travel",
        "url": "https://vagamociontravel.com",
        "logo": "https://vagamociontravel.com/logo.png",
        "image": "https://vagamociontravel.com/imagen.jpg",
        "description": "Especialistas en viajes personalizados. Vuelos, hoteles, tours y más.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. Principal 123",
          "addressLocality": "Ciudad de México",
          "addressRegion": "CDMX",
          "postalCode": "01234",
          "addressCountry": "MX"
        },
        "telephone": "+52-55-1234-5678",
        "openingHours": "Mo-Fr 09:00-18:00",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+52-55-1234-5678",
          "contactType": "Customer Service",
          "areaServed": "MX",
          "availableLanguage": ["Spanish", "English"]
        }
      }
      `}
      </script>
    </Helmet>
    
    <div className="pt-28 min-h-screen relative bg-white text-gray-800 overflow-hidden">

    <div className="absolute inset-0 z-0 pointer-events-none">
      <img
        src="/images/fondo-viajes.jpg"
        alt="Fondo viajes"
        className="w-full h-full object-cover opacity-10"
      />
    </div>
  
    {/* Contenido por encima del fondo */}
    <div className="relative z-10">
  
    </div> 
    {/* Header */}
    <Hero /> 

    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-20 gap-12 ">
        {/* Texto */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Explora el mundo con <span className="text-secondary">Vagamocion </span>  <span className="text-primary"> Travel</span>
          </h2>
          <p className="text-lg text-gray-600">
           
           Transformamos tus sueños en experiencias inolvidables. ¡Descubre el mundo con nosotros y vive momentos únicos que recordarás toda tu vida!
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700">
              Ver destinos
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50">
              Planifica tu viaje
            </button>
          </div>
        </div>

        {/* Imagen */}
        <div className="md:w-1/2">
          <img
            src="/images/Collage.webp"
            alt="Viajes por el mundo"
            className="w-full max-w-md mx-auto rounded-3xl shadow-xl transition duration-500 notgroup-hover:scale-105"
          />
        </div>
      </section>

    {/* Destinos Destacados */}
    <section id="destinos_destacados"
    className="bg-gray-50 w-full px-8 md:px-20 py-16  dark:bg-gray-950">
      <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">
        Destinos destacados
      </h3>
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {destinos.map((destino) => (
          <div
            key={destino.id}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_10px_2px_#00fff7] transition-all duration-500 cursor-pointer"
            onClick={() => setSelectedDestino(destino)}
          >
            <img
              src={destino.imagen}
              alt={destino.nombre}
              className="w-full h-56 object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="rounded-2xl pointer-events-none group-hover:bg-[radial-gradient(circle,_rgba(0,255,247,0.2)_0%,_transparent_70%)] transition duration-500"></div>
            <div className="p-6">
              <h4 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200">
                {destino.nombre.toUpperCase()}
              </h4>
              <p className="text-gray-600 mt-2 text-justify dark:text-gray-300">
                {destino.descripcion.substring(0, 60)}...
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Modal dinámico */}
      {selectedDestino && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-10 max-w-xl w-full relative animate-fade-in transition-all">
      {/* Cerrar */}
      <button
        className="absolute top-4 right-5 text-gray-500 hover:text-red-500 text-2xl font-bold"
        onClick={closeModal}
        aria-label="Cerrar modal"
      >
        ×
      </button>
      {/* Imagen */}
      <img
        src={selectedDestino.imagen}
        alt={selectedDestino.nombre}
        className="rounded-xl w-full h-48 object-cover mb-6 shadow-md"
      />
      {/* Título */}
      <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-3">
        {selectedDestino.nombre}
      </h3>
      {/* Descripción */}
      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6">
        {selectedDestino.descripcion}
      </p> 
      {/* Acciones */}
      <div className="flex justify-center gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition font-semibold shadow-md">
          Reservar ahora
        </button>
        <button
          onClick={() => setMostrarGaleria(true)}
          className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full transition font-semibold"
        > 
        Ver más fotos
      </button>
      </div>
      </div>
    </div>
    )}
    {/* Galeria de Fotos */}
    {mostrarGaleria && selectedDestino && (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-3xl w-full relative p-6">
      
      {/* Botón cerrar */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
        onClick={() => setMostrarGaleria(false)}
        aria-label="Cerrar galería"
      >
        ×
      </button>

      <h3 className="text-xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Galería de {selectedDestino.nombre}
      </h3>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        className="w-full relative"
      >
  {selectedDestino.galeria?.map((src, idx) => (
    <SwiperSlide key={idx}>
      <img
        src={src}
        alt={`Foto ${idx + 1} de ${selectedDestino.nombre}`}
        className="w-full h-96 object-cover rounded-xl"
      />
    </SwiperSlide>
  ))}

    {/* Flechas personalizadas */}
    <div className="custom-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-3 rounded-full shadow hover:bg-white dark:hover:bg-gray-700 cursor-pointer transition">
      <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </div>

    <div className="custom-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-3 rounded-full shadow hover:bg-white dark:hover:bg-gray-700 cursor-pointer transition">
      <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </Swiper>
      </div>
    </div>
  )}
    </section>  

        {/* Línea decorativa inferior */}
    <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700" />

    <Servicios/>
    <TestimoniosSlider />
    <QuienesSomos />
    <CtaViaje />

    <ExperienciasGrid />
      <section id="mapa" className=" dark:bg-gray-900"> 
          <MapaInteractivo /> 
      </section>

      <section id="contacto" className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <FormularioContacto />
        </div>
      </section>

      <WhatsAppFloat/>
      <Footer/>

    </div>
    
    </>
  );
}
