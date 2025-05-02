import { Briefcase, Globe, Headset, Hotel } from 'lucide-react';

const servicios = [
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    titulo: "Viajes Internacionales",
    descripcion: "Organizamos paquetes a todo el mundo con vuelos, hoteles y tours incluidos.",
  },
  {
    icon: <Hotel className="w-8 h-8 text-darkaqua" />,
    titulo: "Reservas de Hoteles",
    descripcion: "Accede a descuentos exclusivos en hoteles de todo el mundo.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    titulo: "Gestiones de visas y pasaportes",
    descripcion: "Te ayudamos con las tediosas tareas de la gesión de tu visa y/o pasaporte.",
  },
  {
    icon: <Headset className="w-8 h-8 text-darkaqua" />,
    titulo: "Asesoría Personalizada",
    descripcion: "Te ayudamos a planear el viaje ideal según tu presupuesto y estilo.",
  },
];

export default function Servicios() {
  return (
    <section id="servicios" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Nuestros Servicios
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {servicios.map((servicio, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 text-center transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="flex justify-center mb-4">{servicio.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {servicio.titulo}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {servicio.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
