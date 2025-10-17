import { motion } from "framer-motion";
import { Sparkles, Users, Award, Heart } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Sparkles,
      title: "Quality Craftsmanship",
      description:
        "Every piece is crafted with meticulous attention to detail, ensuring premium quality that lasts.",
    },
    {
      icon: Heart,
      title: "Passion for Design",
      description:
        "Our designers blend traditional artistry with contemporary trends to create timeless pieces.",
    },
    {
      icon: Award,
      title: "Affordable Luxury",
      description:
        "We believe luxury should be accessible. Premium jewelry at prices that don't break the bank.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We're committed to delivering exceptional service.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-ivory mb-6">
            About <span className="text-gold">AURÉLIA JEWELS</span>
          </h1>
          <p className="text-xl text-warm-grey max-w-3xl mx-auto">
            Our passion for design meets craftsmanship — creating jewelry that
            shines with modern luxury
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-ivory mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-warm-grey">
                <p>
                  Founded with a vision to make luxury jewelry accessible to
                  every woman, AURÉLIA JEWELS has become a trusted name in the
                  imitation jewelry industry across India.
                </p>
                <p>
                  We understand that jewelry is more than just an accessory —
                  it's an expression of your personality, a celebration of your
                  moments, and a reflection of your style.
                </p>
                <p>
                  Each piece in our collection is carefully designed to capture
                  the essence of timeless elegance while staying true to
                  contemporary fashion trends.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070"
                alt="Jewelry craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-heading font-bold text-ivory mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-ivory mb-2">
                  {value.title}
                </h3>
                <p className="text-warm-grey text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="bg-onyx rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-heading font-bold text-ivory mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-warm-grey max-w-4xl mx-auto">
            To empower every woman to embrace her unique style with jewelry that
            combines affordability, quality, and timeless elegance. We're not
            just selling jewelry — we're creating experiences, memories, and
            moments that shine.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
