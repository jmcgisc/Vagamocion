
/*
export default function Adventure() {
    return (
      <section className="bg-green-100 text-green-900 p-10">
        <h1 className="text-4xl font-bold">Viajes de Aventura</h1>
        <p className="mt-4 text-lg">Explora la naturaleza, senderos ocultos, y destinos extremos para aventureros de corazón.</p>
      </section>
    );
  }
  */ 


  export default function Minimalist() {
    return (
      <section className="min-h-screen bg-white text-gray-800 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16">
        {/* Texto principal */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Tu próxima <span className="text-blue-600">aventura</span> empieza aquí
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Descubre los mejores destinos con experiencias inolvidables.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition">
              Explorar destinos
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl transition">
              Ver promociones
            </button>
          </div>
        </div>
  
        {/* Imagen destacada */}
        <div className="md:w-1/2 mt-12 md:mt-0">
          <img
            src="/images/hero-viaje.jpg"
            alt="Destinos espectaculares"
            className="w-full max-w-md mx-auto rounded-3xl shadow-xl"
          />
        </div>
      </section>
    );
  }
  