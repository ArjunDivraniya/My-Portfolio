import React from "react";
import { motion } from "framer-motion";
import "../index.css";

const photos = [
  "https://res.cloudinary.com/dncosrakg/image/upload/v1739952177/nc24cfk1agfrrrdpcryo.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1739952501/jzruiokcmichun4bombt.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1739952478/lm01xmiqfjfeqchxf0c6.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1739952478/lm01xmiqfjfeqchxf0c6.jpg",
];

const Photography = () => {
  return (
    <section id="photography" className="py-16 text-center">
      <motion.h2 
        className="text-4xl font-bold text-white mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        My Photography
      </motion.h2>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {photos.map((photo, index) => (
          <motion.div 
            key={index} 
            className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <img 
              src={photo} 
              alt={`Photography ${index + 1}`} 
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Photography;
