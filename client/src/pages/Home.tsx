import { Hero } from "@/components/Hero";
import { FeaturedCollections } from "@/components/FeaturedCollections";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sparkles, Truck, Shield, Heart } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: Sparkles,
      title: "Premium Quality",
      description: "Handcrafted with attention to detail",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders above ₹499",
    },
    {
      icon: Shield,
      title: "Secure Checkout",
      description: "100% safe and secure payments",
    },
    {
      icon: Heart,
      title: "Customer Love",
      description: "Trusted by thousands across India",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Offer Banner */}
      <motion.div
        className="bg-gradient-to-r from-gold/20 to-gold-light/20 py-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-center text-gold font-accent font-semibold">
          ✨ Free Shipping above ₹499 | Shop Now ✨
        </p>
      </motion.div>

      <FeaturedCollections />

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-onyx">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-ivory mb-2">
                  {feature.title}
                </h3>
                <p className="text-warm-grey text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory mb-4">
            Discover Your Perfect Piece
          </h2>
          <p className="text-warm-grey text-lg mb-8">
            Explore our complete collection of luxury imitation jewelry
          </p>
          <Button
            onClick={() => setLocation("/products")}
            className="bg-gradient-to-r from-gold to-gold-light text-charcoal font-accent font-medium px-8 py-6 text-lg rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-gold/50"
            data-testid="button-explore-collection"
          >
            Explore Collection
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
