// components/QuienesSomos.jsx
export default function QuienesSomos() {
    return (
      <section id="quienes-somos" className="bg-white dark:bg-gray-950 py-20 px-6 md:px-20 text-gray-800 dark:text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* Imagen ilustrativa */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/images/quienes_somos.webp" 
              alt="Equipo Vagamocion" 
              className="w-full h-auto object-cover"
            />
          </div>
  
          {/* Texto */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-primary dark:text-aqua">
              ¿Quiénes somos?
            </h2>
            <p className="text-lg text-justify leading-relaxed mb-6">
              En <strong>Vagamocion Travel</strong> transformamos tus sueños en experiencias inolvidables. Somos una agencia de viajes en línea comprometida con brindarte servicios personalizados, desde paquetes vacacionales y reservas de vuelos, hoteles, cruceros y tours exclusivos. Planeamos cada detalle de tu viaje para garantizarte calidad y comodidad. Ya sea que busques una escapada romántica, una salida familiar, aventura con tus amigos, incluso un viaje de negocios. Nuestro equipo de expertos está disponible para ayudarte. ¡Descubre el mundo con nosotros y vive momentos únicos que recordarás toda tu vida
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Nuestro objetivo es conectar personas con destinos inolvidables, combinando tecnología, asesoría profesional y una atención cercana que convierte cada viaje en una historia para recordar.
            </p>
            <a 
              href="#contacto"
              className="inline-block bg-secondary text-white px-6 py-3 rounded-full font-medium shadow hover:bg-aqua transition"
            >
              Conoce más
            </a>
          </div>
  
        </div>
      </section>
    );
  }
  