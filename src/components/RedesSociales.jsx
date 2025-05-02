import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
} from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { HiLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function RedesSociales() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-start md:items-center gap-2">
                  
        <div className="flex flex-col items-start">
          <div className="">
            <Link href="/" className="flex items-center space-x-5 transition duration-300">
                <div className="flex items-center space-x-12">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 transform group-hover:scale-105 transition duration-300">
                        <img
                        src="/logo.png"
                        alt="Logo Vagamocion Travel"
                        className="h-24 w-auto max-w-[180px] object-contain"/>
                    </div>

                    <span className="flex flex-col">
                        <span className="text-4xl font-extrabold text-aqua dark:text-white tracking-wide transition duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            Vagamocion
                        </span>
                        <span className="text-3xl font-bold text-primary dark:text-gray-300 ml-24 tracking-widest">
                            Travel
                        </span>
                    </span>
                    
                </div>
              </Link>
        </div>

          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-4 mb-2 min-h-6"> 
          </div>

          <p className="text-sm  text-gray-500 dark:text-gray-800 max-w-xs">
            Explorando el mundo contigo. Viajes únicos, recuerdos eternos.
          </p>

          </div>
        </div>

        {/* Redes sociales */}
        <div className="flex space-x-6 text-2xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaTwitter />
          </a>
          <a href="https://wa.me/34600123456" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
            <FaWhatsapp />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition">
            <FaLinkedin />
          </a>
        </div>

        {/* Información de contacto */}
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

      <div className="mt-10 text-center text-xs text-gray-400 dark:text-gray-600">
        © {new Date().getFullYear()} Vagamocion Travel. Todos los derechos reservados.
      </div>
    </footer>
  );
}
