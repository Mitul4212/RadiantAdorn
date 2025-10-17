import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic would go here
    setEmail("");
  };

  return (
    <footer className="bg-onyx border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-heading font-bold text-gold mb-4">
              AURÉLIA JEWELS
            </h3>
            <p className="text-warm-grey text-sm leading-relaxed">
              Our passion for design meets craftsmanship — creating jewelry that
              shines with modern luxury.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-ivory font-accent font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["About Us", "Contact", "Shipping", "Returns", "FAQs"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-warm-grey hover:text-gold transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-ivory font-accent font-semibold mb-4">
              Shop By
            </h4>
            <ul className="space-y-2">
              {[
                "Earrings",
                "Necklaces",
                "Bangles",
                "Rings",
                "Bridal Sets",
              ].map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    className="text-warm-grey hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-ivory font-accent font-semibold mb-4">
              Join the Luxe Circle
            </h4>
            <p className="text-warm-grey text-sm mb-4">
              Exclusive access to offers and new drops
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-charcoal border-border text-ivory placeholder:text-muted-foreground"
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-gold to-gold-light text-charcoal font-accent hover:scale-105 transition-transform duration-300"
                data-testid="button-newsletter-submit"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-warm-grey text-sm">
            © 2024 AURÉLIA JEWELS. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-warm-grey hover:text-gold"
              data-testid="button-instagram"
            >
              <Instagram className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-warm-grey hover:text-gold"
              data-testid="button-facebook"
            >
              <Facebook className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-warm-grey hover:text-gold"
              data-testid="button-twitter"
            >
              <Twitter className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-warm-grey hover:text-gold"
              data-testid="button-email"
            >
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Offer Banner */}
        <div className="mt-8 text-center">
          <p className="text-gold font-accent text-sm">
            Free Shipping above ₹499
          </p>
        </div>
      </div>
    </footer>
  );
}
