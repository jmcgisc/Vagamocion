import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-8xl font-extrabold text-blue-600 dark:text-aqua">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800 dark:text-white">
        Página no encontrada
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
