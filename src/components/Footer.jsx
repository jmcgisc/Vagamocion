import { motion } from "framer-motion";
import RedesSociales from "../components/RedesSociales";

export default function Footer() {
    return (
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 px-8 md:px-20 py-10 text-center"
      >
        <div className="flex justify-center gap-4 mt-2 text-lg">
          <RedesSociales/>
        </div>
      </motion.footer>
    );
  }