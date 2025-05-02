import { useState, useEffect } from "react";
import DarkModeToggle from "../components/DarkModeToggle"; 

export default function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Estado para el menú hamburguesa

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        sticky
          ? "bg-white dark:bg-gray-900 shadow-lg"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold text-blue-600 dark:text-white">
          Viajando
        </a>

        {/* Menú Hamburguesa en móvil */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 dark:text-white focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Menú en Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex space-x-6 text-gray-800 dark:text-white">
            <li>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Destinos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Ofertas
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Contacto
              </a>
            </li>
          </ul>
          <DarkModeToggle />
        </div>
      </div>

      {/* Menú desplegable en Móvil */}
      <div
        className={`lg:hidden ${isOpen ? "block" : "hidden"} bg-white dark:bg-gray-900 text-gray-800 dark:text-white`}
      >
        <ul className="flex flex-col items-center py-4 space-y-4">
          <li>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={toggleMenu}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={toggleMenu}
            >
              Destinos
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={toggleMenu}
            >
              Ofertas
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={toggleMenu}
            >
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
