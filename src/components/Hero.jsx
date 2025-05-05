import DarkModeToggle from "../components/DarkModeToggle";
import HamburgerMenu from "../components/HamburgerMenu";
import { Link } from "react-router-dom";


export default function Hero() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-950 shadow-md z-30">
        {/* Línea decorativa superior */}
        <div className="w-full h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500" />

        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-10 py-4">
          {/* Logo + Texto */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="bg-white dark:bg-gray-800 p-2 md:p-3 rounded-full shadow-md border border-gray-300 dark:border-gray-600">
              <img
                src="/logo.png"
                alt="Logo Vagamocion Travel"
                className="h-12 sm:h-14 md:h-16 w-auto max-w-[80px] transition-transform duration-200 ease-in-out hover:scale-110"
              />
            </div>

            {/* Texto solo "Vagamocion" en sm y md */}
            <div className="block lg:hidden ml-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-aqua dark:text-white">
                Vagamocion
              </h1>
            </div>

            {/* Texto completo en lg+ */}
            <div className="hidden lg:flex flex-col ml-4">
              <span className="flex flex-col">
                <span className="text-4xl font-extrabold text-aqua dark:text-white tracking-wide transition duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Vagamocion
                </span>
                <span className="text-2xl font-bold text-primary dark:text-gray-300 ml-24 tracking-widest">
                  Travel
                </span>
              </span>
            </div>
          </Link>

          {/* Navbar centrado */}
        <nav className="hidden tracking-widest md:flex flex-1 justify-center gap-24">
            <Link
                to="/"
                className="relative group text-gray-800 dark:text-gray-300 font-Montserrat tracking-wide hover:text-secondary transition-colors duration-300"
            >
                <span className="group-hover:text-secondary transition">
                INICIO
                </span>
                <span className="hover:text-primary absolute left-0 -bottom-1 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>

            <a
                href="#destinos"
                className="relative group text-gray-800 dark:text-gray-300 font-Montserrat tracking-wide hover:text-secondary transition-colors duration-300"
            >
                <span className="group-hover:text-secondary transition">DESTINOS</span>
                <span className="hover:text-primary absolute left-0 -bottom-1 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>

            <a
                href="#contacto"
                className="relative group text-gray-800 dark:text-gray-300 font-Montserrat tracking-wide hover:text-secondary transition-colors duration-300"
            >
                <span className="group-hover:text-secondary transition">CONTACTO</span>
                <span className="hover:text-primary absolute left-0 -bottom-1 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>

            <Link to="/ofertas" className="hover:text-primary dark:text-gray-300 duration-300">
                OFERTAS
            </Link>
        </nav>

          {/* Controles a la derecha */}
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <button className="hidden lg:inline-block bg-secondary text-white px-4 py-2 rounded-full text-sm hover:bg-aqua transition">
              Reserva ahora
            </button>
            <div className="md:hidden">
              <HamburgerMenu />
            </div>
          </div>
        </header>

        {/* Línea decorativa inferior */}
        <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700" />
      </nav>
 
    </>
  );
}
