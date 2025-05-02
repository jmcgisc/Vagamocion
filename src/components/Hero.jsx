import DarkModeToggle from "../components/DarkModeToggle";
import HamburgerMenu from "../components/HamburgerMenu"; 
import { Link } from 'react-router-dom';

     {/* Hero Section */}

export default function Hero() {
    return ( 
 
        <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-950 shadow-md z-30">
 
        {/* Header */}
            <header className="w-full flex justify-between items-center px-8 md:px-20 py-6 shadow-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"></div>
            
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

              <nav className="hidden md:flex gap-8 text-gray-600">
                <a href="#" className="hover:text-blue-600">Inicio</a>
                <a href="#" className="hover:text-blue-600">Destinos</a>
                <a href="#" className="hover:text-blue-600">Ofertas</a>
                <a href="#" className="hover:text-blue-600">Contacto</a>
              </nav>

            <DarkModeToggle />
            <button className="bg-secondary text-white px-4 py-2 rounded-full text-sm hover:bg-aqua">
                Reserva ahora
            </button>

            <HamburgerMenu />

            <div className="absolute bottom-0 left-0 w-full h-0.9 bg-gray-200 dark:bg-gray-700"></div>

            </header>

        </nav>
    );
  }
  