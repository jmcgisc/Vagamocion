import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ExperienciasGrid from "../components/ExperienciasGrid";
import MapaInteractivo from "../components/MapaInteractivo";
import TestimoniosSlider from "../components/TestimoniosSlider";
import CtaViaje from "../components/CtaViaje";
import FormularioContacto from "../components/FormularioContacto";
import Servicios from "../components/Servicios";
import WhatsAppFloat from "../components/WhatsAppFloat";
import VisaCheckerNuevo from '../components/VisaCheckerNuevo';
import Footer from "../components/Footer";
import QuienesSomos from "../components/QuienesSomos";
import ElevenLabsWidget from '../components/ElevenLabsWidget';
import AsistenteViaje from '../components/AsistenteViaje';
import ChatViaje from '../components/ChatViaje';

import 'swiper/css/navigation';

const destinos = [
  {
    id: "europa",
    nombre: "Europa",
    imagen: "/images/portadaEuropa.jpeg",
    descripcion:
      "Sumérgete en un cuento de hadas entre castillos, calles adoquinadas y paisajes de ensueño. Vive la magia del romanticismo europeo en cada paso.",
    galeria: [
      "/images/praga.webp",
      "images/destino-paris.jpg",
      "/images/brandeburgo.webp",
      "/images/sagradaFamilia.webp",
      "/images/santaSofia.webp",
      "/images/stonehenge.webp",
      "/images/TorreEiffel.webp"
    ],
  },
  {
    id: "japon",
    nombre: "Japón",
    imagen: "/images/portadaJapon.jpeg",
    descripcion:
      "Descubre la armonía entre tecnología y tradición, con templos milenarios, cerezos en flor y una cultura fascinante.",
    galeria: [
      "/images/castilloOsaka.webp",
      "/images/fushimiKyoto.webp",
      "/images/himeji.webp",
      "/images/pabellonOro.webp",
      "/images/palacioImperial.webp",
      "/images/palacioImperialTokio.webp",
      "/images/sensoJiTokio.webp",
      "/images/tokyoSkytree.webp",
      "/images/Japon.webp"
    ],
  },
  {
    id: "disneyland",
    nombre: "Disneyland",
    imagen: "/images/portadaDisney.jpeg",
    descripcion:
      "Regresa a tu infancia con aventuras mágicas, castillos encantados y personajes que cobran vida en el lugar más feliz del mundo.",
    galeria: [
      "/images/mickey-minnie.webp",
      "/images/Mickey-and-Minnie.webp",
      "/images/Disneyland.webp",
      "/images/mainStreet.webp",
      "/images/mk-temprano.webp",
      "/images/starwars.webp",
      "/images/DISNEY.webp",
    ],
  },
];

export default function Home() {

  const [selectedDestino, setSelectedDestino] = useState(null);
  const closeModal = () => setSelectedDestino(null);
  const [mostrarGaleria, setMostrarGaleria] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  // --- NUEVO ESTADO PARA LA IA ---
  const [activarIA, setActivarIA] = useState(false);

  // NUEVO ESTADO: Controla si eligió 'voz', 'texto' o 'seleccion'
  const [modoIA, setModoIA] = useState('seleccion');

  const cerrarAsistente = () => {
    setActivarIA(false);
    setModoIA('seleccion');
  };

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
          "streetAddress": "Gemelos 42 depto 1 col prado churubusco",
          "addressLocality": "Ciudad de México",
          "addressRegion": "CDMX",
          "postalCode": "04230",
          "addressCountry": "MX"
        },
        "telephone": "+52-55-1234-5678",w
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

              <Link to="/ofertas">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700">
                  Ver destinos
                </button>
              </Link>

              {/* --- BOTÓN MODIFICADO --- */}
              <button
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
                onClick={() => setActivarIA(true)}
              >
                Planifica tu viaje
              </button>

              {mostrarModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
                    <button
                      onClick={() => setMostrarModal(false)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl"
                    >
                      ✕
                    </button>

                    <FormularioContacto />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Imagen */}
          <div className="md:w-1/2">
            <img
              src="/images/Home.webp"
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
                  <a href="https://www.instagram.com/vagamocion_travel" target="_blank" rel="noopener noreferrer">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition font-semibold shadow-md">
                      Reservar ahora
                    </button>
                  </a>
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

        <Servicios />
        <CtaViaje />
        <ExperienciasGrid />

        <section id="mapa" className=" dark:bg-gray-900">
          <MapaInteractivo />
        </section>

        <TestimoniosSlider />
        <QuienesSomos />

        <section id="contacto" className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <FormularioContacto />
          </div>
        </section>

        <WhatsAppFloat />

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <VisaCheckerNuevo />
          </div>
        </section>

        {/* --- AQUÍ SE RENDERIZA EL WIDGET DE ELEVENLABS --- */}
        {/* AHORA: Modal centrado estilo "Planificador" */}
        {activarIA && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={cerrarAsistente}
            ></div>

            {/* Contenedor del Modal */}
            <div className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl animate-fade-in-up border border-gray-100 dark:border-gray-800 overflow-hidden">

              {/* Botón Cerrar (Solo visible si NO estamos en el chat, el chat tiene su propia X) */}
              {modoIA !== 'texto' && (
                <button
                  onClick={cerrarAsistente}
                  className="absolute top-4 right-4 z-10 text-gray-400 hover:text-red-500 transition-colors bg-gray-100 dark:bg-gray-800 rounded-full p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* === PANTALLA 1: SELECCIÓN (Voz o Texto) === */}
              {modoIA === 'seleccion' && (
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Tu Asistente de Viaje ✈️
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                    ¿Cómo prefieres planificar tu aventura hoy?
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Botón VOZ */}
                    <button
                      onClick={() => setModoIA('voz')}
                      className="flex flex-col items-center justify-center p-6 border-2 border-blue-100 rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all group"
                    >
                      <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 1.5a3 3 0 00-3 3v4.5a3 3 0 006 0v-4.5a3 3 0 00-3-3z" />
                        </svg>
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">Hablar con Agente</span>
                    </button>

                    {/* Botón TEXTO */}
                    <button
                      onClick={() => setModoIA('texto')}
                      className="flex flex-col items-center justify-center p-6 border-2 border-purple-100 rounded-2xl hover:border-purple-600 hover:bg-purple-50 transition-all group"
                    >
                      <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.286 3.423.379.35.028.719.048 1.09.048 1.481 0 5.99-1.2 5.99-4.2 0-3.05-4.59-4.2-5.99-4.2s-5.99 1.15-5.99 4.2z" />
                        </svg>
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">Chat</span>
                    </button>
                  </div>
                </div>
              )}

              {/* === PANTALLA 2: VOZ (Tu componente existente) === */}
              {modoIA === 'voz' && (
                <div className="p-8">
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Hola soy Karina 🎙️
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Hablemos sobre tu próximo destino.
                    </p>
                  </div>
                  {/* Componente existente */}
                  <AsistenteViaje />
                </div>
              )}

              {/* === PANTALLA 3: TEXTO (Nuevo componente) === */}
              {modoIA === 'texto' && (
                <ChatViaje onClose={cerrarAsistente} />
              )}

            </div>
          </div>
        )}

        <Footer />

      </div>

    </>
  );
}