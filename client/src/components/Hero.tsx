import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function Hero() {
  const [, setLocation] = useLocation();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070"
          alt="Luxury jewelry"
          className="w-full h-full object-cover"
        />
        {/* Golden gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/80"></div>
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-ivory mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Timeless Elegance,
          <br />
          <span className="text-gold">Crafted to Shine</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-warm-grey mb-10 font-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Affordable luxury jewelry that makes every moment special
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            onClick={() => setLocation("/products")}
            className="bg-gradient-to-r from-gold to-gold-light text-charcoal font-accent font-medium px-8 py-6 text-lg rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-gold/50"
            data-testid="button-shop-now"
          >
            Shop Now
          </Button>
          <Button
            onClick={() => setLocation("/products")}
            variant="outline"
            className="border-2 border-gold text-gold bg-charcoal/50 backdrop-blur-sm font-accent font-medium px-8 py-6 text-lg rounded-2xl hover:bg-gold hover:text-charcoal transition-all duration-300"
            data-testid="button-view-collection"
          >
            View Collection
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gold rounded-full flex justify-center"
        >
          <motion.div className="w-1 h-3 bg-gold rounded-full mt-2"></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
