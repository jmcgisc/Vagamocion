import { useState } from "react";
import FormularioContacto from "../components/FormularioContacto";

export default function CtaViaje() {
  const [mostrarModal, setMostrarModal] = useState(false);
  return (
    <>
      <section className="bg-darkaqua dark:bg-primary text-white dark:text-gray-100 px-8 md:px-20 py-16 text-center rounded-t-3xl">
        <h3 className="text-3xl font-bold mb-4">¿Listo para tu próxima aventura?</h3>
        <p className="text-lg mb-8">
          Contáctanos y te ayudamos a planear un viaje hecho a tu medida.
        </p>

        <button className="bg-white text-blue-600 dark:bg-gray-900 dark:text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          onClick={() => setMostrarModal(true)} >
          Cotizar ahora
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
      </section>
    </>
  );
}