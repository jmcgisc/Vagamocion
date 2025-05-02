import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setOpen(!open)}
        className="z-50 md:hidden relative flex flex-col gap-1"
        aria-label="Abrir menú"
      >
        <span className={`h-0.5 w-6 bg-gray-800 dark:bg-white transform transition duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`} />
        <span className={`h-0.5 w-6 bg-gray-800 dark:bg-white transition duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-6 bg-gray-800 dark:bg-white transform transition duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
      </button>

      {/* Menú lateral con animación y fondo blur */}
      <AnimatePresence>
        {open && (
          <>
            {/* Fondo semitransparente (click para cerrar) */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menú deslizante desde la derecha */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-64 h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg z-50 p-6 flex flex-col space-y-6 text-lg text-gray-800 dark:text-white"
            >
              <button onClick={() => setOpen(false)} className="self-end text-gray-500 hover:text-red-500">✕</button>
              <a href="#inicio" className="hover:text-blue-600">Inicio</a>
              <a href="#servicios" className="hover:text-blue-600">Servicios</a>
              <a href="#experiencias" className="hover:text-blue-600">Experiencias</a>
              <a href="#contacto" className="hover:text-blue-600">Contacto</a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
