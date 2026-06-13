import { motion } from "framer-motion";

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end gap-3 z-50">

      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/7251828404?text=Hi%20I%20want%20to%20order%20products"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg"
      >
        💬

        {/* Pulse Badge */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      </motion.a>

      {/* Instagram */}
      <motion.a
        href="https://instagram.com/deveshplasticstore"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white shadow-lg"
      >
        📸
      </motion.a>

    </div>
  );
}