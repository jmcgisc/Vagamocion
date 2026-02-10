import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense } from "react";
import Spinner from './components/Spinner';
import SearchResults from "./pages/SearchResults";

// Lazy load de páginas
const Ofertas = lazy(() => import("./pages/Ofertas"));
const Adventure = lazy(() => import("./pages/Adventure"));
const Urban = lazy(() => import("./pages/Urban"));
const Tropical = lazy(() => import("./pages/Tropical"));
const Illustrated = lazy(() => import("./pages/Illustrated"));
const Home = lazy(() => import("./pages/Home"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TestimoniosPage = lazy(() => import("./pages/TestimoniosPage"));

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
    <AnimatePresence mode="wait">
      <Suspense fallback={<Spinner />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/ofertas" element={<PageWrapper><Ofertas /></PageWrapper>} />
          <Route path="/aventura" element={<PageWrapper><Adventure /></PageWrapper>} />
          <Route path="/urbano" element={<PageWrapper><Urban /></PageWrapper>} />
          <Route path="/tropical" element={<PageWrapper><Tropical /></PageWrapper>} />
          <Route path="/ilustrado" element={<PageWrapper><Illustrated /></PageWrapper>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/resultados" element={<SearchResults />} />

          <Route
            path="/disclaimer"
            element={
              <PageWrapper>
                <Suspense fallback={<Spinner />}>
                  <Disclaimer />
                </Suspense>
              </PageWrapper>
            }
          />

          <Route
            path="/testimonios"
            element={
              <PageWrapper>
                <Suspense fallback={<Spinner />}>
                  <TestimoniosPage />
                </Suspense>
              </PageWrapper>
            }
          />


        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
