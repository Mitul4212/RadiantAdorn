import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
}

export function Navbar({ cartCount, wishlistCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-charcoal shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <span className="text-xl md:text-2xl font-heading font-bold text-gold hover:text-gold-light transition-colors duration-300 cursor-pointer">
              AURÉLIA JEWELS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  data-testid={`link-${link.label.toLowerCase()}`}
                  className={`font-accent text-sm transition-colors duration-300 cursor-pointer ${
                    location === link.href
                      ? "text-gold"
                      : "text-warm-grey hover:text-gold"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-ivory hover:text-gold"
                data-testid="button-wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gold text-charcoal text-xs"
                    data-testid="badge-wishlist-count"
                  >
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-ivory hover:text-gold"
                data-testid="button-cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gold text-charcoal text-xs"
                    data-testid="badge-cart-count"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-ivory"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 font-accent transition-colors duration-300 cursor-pointer ${
                    location === link.href
                      ? "text-gold"
                      : "text-warm-grey hover:text-gold"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
