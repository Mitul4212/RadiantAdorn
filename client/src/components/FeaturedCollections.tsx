import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";

const collections = [
  {
    id: 1,
    name: "Festive Luxe",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070",
    description: "Celebrate in style",
  },
  {
    id: 2,
    name: "Everyday Glow",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070",
    description: "Daily elegance",
  },
  {
    id: 3,
    name: "Bridal Royale",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070",
    description: "Your special day",
  },
];

export function FeaturedCollections() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory mb-4">
            Featured Collections
          </h2>
          <p className="text-warm-grey text-lg">
            Curated designs for every occasion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className="group relative overflow-hidden rounded-2xl cursor-pointer h-80 bg-card border-card-border"
                onClick={() => setLocation("/products")}
                data-testid={`card-collection-${collection.id}`}
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-heading font-bold text-gold mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-warm-grey">{collection.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
