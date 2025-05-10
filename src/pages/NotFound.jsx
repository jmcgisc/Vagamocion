import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";  
import Hero from "../components/Hero";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-cover bg-[center_top_223rem] flex flex-col items-center justify-center text-center px-6 py-12"
      style={{
        backgroundImage: "url('/images/404.webp')",
      }}
    >
    {/* Header */}
    <Hero />  
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800">
          ¡Ups! Parece que nos perdimos...
        </h2>
        <p className="mt-2 text-gray-600">
          No encontramos la página que buscas. Quizás tomamos el camino equivocado.
        </p>
        <Link
            to="/"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold shadow-lg hover:from-cyan-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
            <FaArrowLeft className="text-white" />
            Volver a Vagamocion
        </Link>
      </div>
    </div>
  );
}
