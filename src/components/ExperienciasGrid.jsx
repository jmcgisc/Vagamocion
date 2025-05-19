const tours = [
    {
      id: 1,
      titulo: "Aventura en Machu Picchu",
      descripcion: "Explora las ruinas incas con un guía local.",
      imagen: "/images/machuPichu.jpg"
    },
    {
      id: 2,
      titulo: "Safari en Sudáfrica",
      descripcion: "Observa la vida salvaje en su hábitat natural.",
      imagen: "/images/SafariSudafrica.jpeg"
    },
    {
      id: 3,
      titulo: "Navegación por los Fiordos Noruegos",
      descripcion: "Viaje escénico entre montañas y agua.",
      imagen: "/images/Noruega.jpg"
    },
  ];
  
  export default function ExperienciasGrid() {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Experiencias Únicas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
                <img src={tour.imagen} alt={tour.titulo} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{tour.titulo}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{tour.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }