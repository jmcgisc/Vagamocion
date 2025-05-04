import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Experiencias", href: "#experiencias" },
    { label: "Contacto", href: "#contacto" },
  ];

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

      {/* Menú lateral */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-64 h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg z-50 p-6 flex flex-col space-y-4 text-lg text-gray-800 dark:text-white"
            >
              <button onClick={() => setOpen(false)} className="self-end text-gray-500 hover:text-red-500 text-xl">✕</button>

              {links.map(({ label, href }, i) => (
                <div key={i} className="space-y-2">
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="hover:text-blue-600 transition-colors duration-200 block"
                  >
                    {label}
                  </a>
                  <hr className="border-t border-gray-300 dark:border-gray-700" />
                </div>
              ))}

              {/* Tarjeta de contacto con íconos */}
              <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md text-sm space-y-2">
                <p className="font-semibold text-gray-700 dark:text-white h-8">¿Necesitas ayuda?</p>
                <p className="text-gray-600 dark:text-gray-300 h-8"> <a href="mailto:admin@vagamociontravel.com" className="text-blue-600 dark:text-blue-400 underline text-xs">admin@vagamociontravel.com</a></p>
                <p className="text-gray-600 dark:text-gray-300 h-8">📞 <span className="font-semibold">+52 55 1234 5678</span></p>
              
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="inline-block w-full text-center mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-transform duration-300"
                >
                  ¡Contáctanos ahora!
                </a>
              
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
