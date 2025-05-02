import TestimoniosSlider from "../components/TestimoniosSlider";
import CtaViaje from "../components/CtaViaje";
import DarkModeToggle from "../components/DarkModeToggle";


export default function Illustrated() {
  return (
    
    <main className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 md:px-20 py-6 shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">Viajando</h1>
        <nav className="hidden md:flex gap-8 text-gray-600">
          <a href="#" className="hover:text-blue-600">Inicio</a>
          <a href="#" className="hover:text-blue-600">Destinos</a>
          <a href="#" className="hover:text-blue-600">Ofertas</a>
          <a href="#" className="hover:text-blue-600">Contacto</a>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700">
          Reserva ahora
        </button>
      </header>
      <DarkModeToggle />

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-20 gap-12">
        {/* Texto */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Explora el mundo con <span className="text-blue-600">Viajando</span>
          </h2>
          <p className="text-lg text-gray-600">
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

<TestimoniosSlider />
<CtaViaje />
    </main>
  );
}