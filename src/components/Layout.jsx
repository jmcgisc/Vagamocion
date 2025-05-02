import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from '../pages/Navbar';


export default function Layout({ children }) {
  return (

    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

      {/* Navbar */}
      <nav className="flex gap-4 p-4 bg-gray-100 shadow-md text-sm md:text-base">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/minimalist" className="text-green-700 hover:underline">Minimalista</Link>
        <Link to="/aventura" className="text-green-700 hover:underline">Aventura</Link>
        <Link to="/urbano" className="text-white bg-gray-800 px-2 py-1 rounded hover:bg-gray-700">Urbano</Link>
        <Link to="/tropical" className="text-yellow-600 hover:underline">Tropical</Link>
        <Link to="/ilustrado" className="text-pink-600 hover:underline">Ilustrado</Link>
      </nav>

      {/* Página activa */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}