import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion }    from 'framer-motion';

import Layout from './components/Layout';
import Minimalist   from './pages/Minimalist';
import Adventure    from './pages/Adventure';
import Urban        from './pages/Urban';
import Tropical     from './pages/Tropical';
import Illustrated  from './pages/Illustrated';
import Home         from './pages/Home';

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
      {/* Layout */}
  return (
      
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
            path="minimalist"
            element={
              <PageWrapper>
                <Minimalist />
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
  );
}