import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Minimalist from './pages/Minimalist';
import Adventure from './pages/Adventure';
import Urban from './pages/Urban';
import Tropical from './pages/Tropical';
import Illustrated from './pages/Illustrated';


// Lazy loaded
const Ofertas = lazy(() => import('./pages/Ofertas'));
const Disclaimer = lazy(() => import("./components/Disclaimer"));


const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<div className="text-center p-20">Cargando página...</div>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />

          <Route
            path="/ofertas"
            element={
              <PageWrapper>
                <Ofertas />
              </PageWrapper>
            }
          />

          <Route
            path="/disclaimer"
            element={
              <PageWrapper>
                <Suspense fallback={<div className="text-center py-10">Cargando disclaimer...</div>}>
                  <Disclaimer />
                </Suspense>
              </PageWrapper>
            }
          />

          <Route
            path="/aventura"
            element={
              <PageWrapper>
                <Adventure />
              </PageWrapper>
            }
          />
          <Route
            path="/urbano"
            element={
              <PageWrapper>
                <Urban />
              </PageWrapper>
            }
          />
          <Route
            path="/tropical"
            element={
              <PageWrapper>
                <Tropical />
              </PageWrapper>
            }
          />
          <Route
            path="/ilustrado"
            element={
              <PageWrapper>
                <Illustrated />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
