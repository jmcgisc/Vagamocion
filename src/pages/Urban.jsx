export default function Urban() {
return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 px-8 md:px-20 py-16 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Vive experiencias únicas con <span className="text-blue-600">Viajando</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600">
          Encuentra tu próximo destino, reserva con facilidad y deja que la aventura comience.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition">
            Explorar destinos
          </button>
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full text-lg hover:bg-blue-50 transition">
            Contactar
          </button>
        </div>
      </div>

      <div className="mt-16 w-full max-w-5xl">
        <img
          src="/images/hero-modern.jpg"
          alt="Imagen de destinos"
          className="w-full rounded-3xl shadow-2xl"
        />
      </div>
    </main>
  );
  }
  