import {
  FaFacebook,
  FaInstagram, 
  FaWhatsapp,
  FaLinkedin,
} from 'react-icons/fa';
import { FaX } from "react-icons/fa6";

import { MdEmail, MdPhone } from 'react-icons/md';
import { HiLocationMarker } from 'react-icons/hi'; 
import { Link } from 'react-router-dom'; 

export default function RedesSociales() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 px-6 sm:px-12 relative z-10 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-20">
        
        {/* Logo y descripción */}
        <div className="flex flex-col items-start space-y-4 w-full md:w-auto">
          <Link to="/" className="flex items-center space-x-4">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
              <img
                src="/logo.png"
                alt="Logo Vagamocion Travel"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-aqua dark:text-white tracking-wide">
                Vagamocion
              </span>
              <span className="text-xl font-bold text-primary dark:text-gray-300">
                Travel
              </span>
            </div>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            Explorando el mundo contigo. Viajes únicos, recuerdos eternos.
          </p>
        </div>

        {/* Redes sociales */}
        <div className="flex space-x-6 text-2xl">
          <a href="https://www.facebook.com/share/1Aa6QuQvPh/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/vagamocion_travel/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaX />
          </a>
          <a href="https://wa.me/525575597065" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
            <FaWhatsapp />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition">
            <FaLinkedin />
          </a>
        </div>

        {/* Contacto */}
        <div className="text-sm space-y-2">
          <div className="flex items-center space-x-2">
            <MdPhone className="text-lg" />
            <span>+52 55 7559 7065</span>
          </div>
          <div className="flex items-center space-x-2">
            <MdEmail className="text-lg" />
            <span>reservas@vagamociontravel.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <HiLocationMarker className="text-lg" />
            <span>CDMX, México</span>
          </div>
        </div>
      </div>

      {/* Sección de Disclaimer */}
      <Link
          to="/disclaimer"
          className="text-sm text-gray-500 hover:text-secondary dark:text-gray-400 dark:hover:text-white transition"
        >
          Aviso Legal
      </Link>

      {/* Derechos reservados y Powered by */}
      <div className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
        <p>© {new Date().getFullYear()} Vagamocion Travel. Todos los derechos reservados.</p>
        <p className="mt-1 text-[11px] italic"> Powered by 
          <a href="https://codexa.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-500 transition"> CODEXA</a>
        </p>
      </div>
    </footer>
  );
}
