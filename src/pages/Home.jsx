import Hero from "../components/Hero";
import ExperienciasGrid from "../components/ExperienciasGrid";
import MapaInteractivo from "../components/MapaInteractivo"; 
import TestimoniosSlider from "../components/TestimoniosSlider";
import CtaViaje from "../components/CtaViaje"; 
import FormularioContacto from "../components/FormularioContacto";
import Servicios from "../components/Servicios";
import WhatsAppFloat from "../components/WhatsAppFloat";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="pt-28 min-h-screen bg-white text-gray-800">
    {/* Header */}
    <Hero /> 

    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-20 gap-12">
        {/* Texto */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Explora el mundo con <span className="text-secondary">Vagamocion </span>  <span className="text-primary"> Travel</span>
          </h2>
          <p className="text-lg text-gray-600">
           
          En Vagamocion Travel transformamos tus sueños en experiencias inolvidables. Somos una agencia de viajes en línea comprometida con brindarte servicios personalizados, desde paquetes vacacionales y reservas de vuelos, hoteles, cruceros y tours exclusivos. Planeamos cada detalle de tu viaje para garantizarte calidad y comodidad. Ya sea que busques una escapada romántica, una salida familiar, aventura con tus amigos, incluso un viaje de negocios. Nuestro equipo de expertos está disponible para ayudarte. ¡Descubre el mundo con nosotros y vive momentos únicos que recordarás toda tu vida!

          Agencia de viajes en línea que transforma sueños en experiencias inolvidables, planeando cada detalle para garantizar calidad y comodidad en tus viajes
           
            Diseñamos experiencias a medida para que vivas cada destino como un local. Descubre, disfruta y déjalo en nuestras manos.
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
      <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
        <img
          src="/images/destino-paris.jpg"
          alt="París"
          className="w-full h-56 object-cover"
        />
        <div className="p-6">
          <h4 className="text-xl font-semibold text-gray-800">París</h4>
          <p className="text-gray-600 mt-2">Descubre la ciudad del amor con recorridos inolvidables.</p>
        </div>
      </div>

    {/* Destino 2 */}
      <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
        <img
          src="/images/destino-bali.jpg"
          alt="Bali"
          className="w-full h-56 object-cover"
        />
        <div className="p-6">
          <h4 className="text-xl font-semibold text-gray-800">Bali</h4>
          <p className="text-gray-600 mt-2">Playas, templos y cultura exótica en un solo viaje.</p>
        </div>
      </div>

    {/* Destino 3 */}
      <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
        <img
          src="/images/destino-nueva-york.jpg"
          alt="Nueva York"
          className="w-full h-56 object-cover"
        />
        <div className="p-6">
          <h4 className="text-xl font-semibold text-gray-800">Nueva York</h4>
          <p className="text-gray-600 mt-2">Vive la ciudad que nunca duerme como un verdadero neoyorquino.</p>
        </div>
      </div>
    </div>
    </section>  

    <Servicios/>
    <TestimoniosSlider />
    <CtaViaje />

    <ExperienciasGrid />
      <section id="mapa" className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
            Encuéntranos
          </h2>
          <MapaInteractivo />
        </div>
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
