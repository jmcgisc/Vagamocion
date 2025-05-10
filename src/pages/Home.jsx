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

export default function Home() {
  return (
    
    <div className="pt-28 min-h-screen relative bg-white text-gray-800 overflow-hidden">

    {/* Imagen de fondo con transparencia */}
    <div className="absolute inset-0 z-0">
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

    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-20 gap-12">
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
            src="/images/travel-hero-clean.jpg"
            alt="Viajes por el mundo"
            className="w-full max-w-md mx-auto rounded-3xl shadow-xl"
          />
        </div>
      </section>

    {/* Destinos Destacados */}
    <section className="bg-gray-50 w-full px-8 md:px-20 py-16">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Destinos destacados
      </h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Destino 1 */}
      <div className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_10px_2px_#00fff7] transition-all duration-500">
        {/* Imagen con efecto hover */}
        <img
          src="/images/destino-paris.jpg"
          alt="Europa"
            className="w-full h-56 object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Overlay brillante */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:bg-[radial-gradient(circle,_rgba(0,255,247,0.2)_0%,_transparent_70%)] transition duration-500"></div>
          
        {/* Contenido */}
        <div className="p-6 bg-white">
          <h4 className="text-xl font-semibold text-gray-800 text-center">EUROPA</h4>
          <p className="text-gray-600 mt-2 text-center">
            Pasea entre calles empedradas y atardeceres dorados, donde cada rincón guarda una historia de amor eterna.
          </p>
        </div>
      </div>

    {/* Destino 2 */}
    <div className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_10px_2px_#D29BFD] transition-all duration-500">
      <img
          src="/images/Japon.webp"
          alt="JAPÓN"
        className="w-full h-56 object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Overlay brillante */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:bg-[radial-gradient(circle,_rgba(210,155,253,0.2)_0%,_transparent_70%)] transition duration-500"></div>
        
        {/* Contenido */}
        <div className="p-6">
          <h4 className="text-xl font-semibold text-gray-800 text-center">JAPÓN</h4>
          <p className="text-gray-600 mt-2 text-center">
            Entre cerezos en flor y templos milenarios, descubre una conexión única en un mundo de armonía y belleza.</p>
        </div>
      </div>

    {/* Destino 3 */}
    <div className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_10px_2px_#FEFF66] transition-all duration-500">
      <img
          src="/images/DISNEY.webp"
          alt="DISNEY"
        className="w-full h-56 object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Overlay brillante */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:bg-[radial-gradient(circle,_rgba(254,255,102,0.2)_0%,_transparent_70%)] transition duration-500"></div>
        
        <div className="p-6">
          <h4 className="text-xl font-semibold text-gray-800 text-center">DISNEYLAND</h4>
          <p className="text-gray-600 mt-2 text-center">
            Vivir su propio cuento de hadas, donde los sueños se hacen realidad y el amor tiene magia propia.</p>
        </div>
      </div>
    </div>
    </section>  

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
    
  );
}
