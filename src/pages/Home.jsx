import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// ... (tus otras importaciones se mantienen igual)
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
import AsistenteViaje from '../components/AsistenteViaje';
import ChatViaje from '../components/ChatViaje';

import 'swiper/css/navigation';

// ... (tu constante 'destinos' se mantiene igual)
const destinos = [ /* ... */];

export default function Home() {

  const [selectedDestino, setSelectedDestino] = useState(null);
  const closeModal = () => setSelectedDestino(null);
  const [mostrarGaleria, setMostrarGaleria] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  // --- ESTADOS PARA LA IA ---
  const [activarIA, setActivarIA] = useState(false);
  const [modoIA, setModoIA] = useState('seleccion');

  // --- NUEVO: ESTADO PARA EL MODAL DE AGENDAR CITA ---
  const [mostrarModalCita, setMostrarModalCita] = useState(false);
  const [enviandoCita, setEnviandoCita] = useState(false);
  const [mensajeCita, setMensajeCita] = useState("");

  const cerrarAsistente = () => {
    setActivarIA(false);
    setModoIA('seleccion');
  };

  // --- FUNCIÓN PARA ENVIAR DATOS A N8N ---
  const handleAgendarSubmit = async (e) => {
    e.preventDefault();
    setEnviandoCita(true);
    setMensajeCita("");

    const formData = new FormData(e.target);
    const data = {
      nombre: formData.get("nombre"),
      email: formData.get("email"), // Ojo: En tu n8n esto se llama "jose manuel" actualmente
      telefono: formData.get("telefono"),
      fecha_inicio: formData.get("fecha_inicio") // Formato datetime-local
    };

    try {
      // REEMPLAZA ESTA URL CON LA URL DE PRODUCCIÓN DE TU WEBHOOK DE N8N
      const WEBHOOK_URL = "https://n8n.stratik.cloud/webhook/agendar-cita";

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMensajeCita("¡Cita agendada con éxito! Revisa tu correo.");
        setTimeout(() => {
          setMostrarModalCita(false);
          setMensajeCita("");
        }, 3000);
      } else {
        setMensajeCita("Hubo un error al agendar. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensajeCita("Error de conexión con el servidor.");
    } finally {
      setEnviandoCita(false);
    }
  };

  return (
    <>
      <Helmet>
        {/* ... (tus metadatos se mantienen igual) ... */}
      </Helmet>

      <div className="pt-28 min-h-screen relative bg-white text-gray-800 overflow-hidden">

        {/* ... (fondo y Hero se mantienen igual) ... */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="/images/fondo-viajes.jpg" alt="Fondo" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="relative z-10"></div>

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

              {/* --- BOTÓN MODIFICADO: AGENDAR REUNIÓN --- */}
              <button
                onClick={() => setMostrarModalCita(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition-colors"
              >
                Agendar Reunión
              </button>

              <button
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
                onClick={() => setActivarIA(true)}
              >
                Planifica tu viaje
              </button>

              {/* Modal existente de Contacto (si lo usas) */}
              {mostrarModal && (
                /* ... tu modal existente ... */
                <div className="fixed inset-0 bg-black bg-opacity-50..."><FormularioContacto /></div>
              )}
            </div>
          </div>

          <div className="md:w-1/2">
            <img src="/images/Home.webp" alt="Viajes" className="w-full max-w-md mx-auto rounded-3xl shadow-xl transition duration-500 hover:scale-105" />
          </div>
        </section>

        {/* --- NUEVO: MODAL PARA AGENDAR CITA CON N8N --- */}
        {mostrarModalCita && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 px-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-md w-full relative animate-fade-in-up">
              <button
                onClick={() => setMostrarModalCita(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">Agenda tu Asesoría</h3>
              <p className="text-sm text-gray-500 text-center mb-6">Selecciona una fecha y te enviaremos la confirmación a tu correo.</p>

              <form onSubmit={handleAgendarSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre Completo</label>
                  <input type="text" name="nombre" required className="mt-1 w-full border border-gray-300 rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="Juan Pérez" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
                  <input type="email" name="email" required className="mt-1 w-full border border-gray-300 rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="juan@ejemplo.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono (con lada)</label>
                  <input type="tel" name="telefono" required className="mt-1 w-full border border-gray-300 rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="52 55 1234 5678" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha y Hora</label>
                  <input type="datetime-local" name="fecha_inicio" required className="mt-1 w-full border border-gray-300 rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>

                {mensajeCita && (
                  <div className={`text-center text-sm font-semibold ${mensajeCita.includes('éxito') ? 'text-green-600' : 'text-red-600'}`}>
                    {mensajeCita}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={enviandoCita}
                  className={`w-full py-3 rounded-lg text-white font-bold shadow-md transition-all ${enviandoCita ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {enviandoCita ? "Agendando..." : "Confirmar Cita"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ... (resto del código: destinos destacados, modales de destinos, servicios, footer, etc.) ... */}

        {/* Asegúrate de mantener todo el resto del código original debajo de aquí */}
        <section id="destinos_destacados" className="bg-gray-50 w-full px-8 md:px-20 py-16 dark:bg-gray-950">
          {/* ... lógica de destinos ... */}
          <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">Destinos destacados</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinos.map((destino) => (
              <div key={destino.id} className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_10px_2px_#00fff7] transition-all duration-500 cursor-pointer" onClick={() => setSelectedDestino(destino)}>
                <img src={destino.imagen} alt={destino.nombre} className="w-full h-56 object-cover transition duration-500 group-hover:scale-105" />
                {/* ... resto de las tarjetas ... */}
                <div className="p-6"><h4 className="text-xl font-semibold text-center">{destino.nombre}</h4></div>
              </div>
            ))}
          </div>
          {/* ... Modales de destinos ... */}
        </section>

        {/* ... Resto de componentes (Servicios, CTA, etc) ... */}
        <Servicios />
        <CtaViaje />
        <ExperienciasGrid />
        <section id="mapa"><MapaInteractivo /></section>
        <TestimoniosSlider />
        <QuienesSomos />
        <section id="contacto" className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4"><FormularioContacto /></div>
        </section>
        <WhatsAppFloat />
        <section className="py-16 bg-white"><div className="max-w-7xl mx-auto px-6"><VisaCheckerNuevo /></div></section>

        {/* IA MODAL (Mantenido igual) */}
        {activarIA && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* ... tu lógica de IA existente ... */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={cerrarAsistente}></div>
            <div className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl p-8">
              {/* ... contenido del modal IA ... */}
              {modoIA === 'seleccion' && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-8">Tu Asistente de Viaje ✈️</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setModoIA('voz')} className="p-6 border rounded-2xl hover:bg-blue-50">Hablar</button>
                    <button onClick={() => setModoIA('texto')} className="p-6 border rounded-2xl hover:bg-purple-50">Chat</button>
                  </div>
                </div>
              )}
              {modoIA === 'voz' && <AsistenteViaje />}
              {modoIA === 'texto' && <ChatViaje onClose={cerrarAsistente} />}
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}