import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@shared/schema";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Wishlist() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<number[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const wishlistProducts = useMemo(() => {
    return products.filter((p) => wishlist.includes(p.id));
  }, [products, wishlist]);

  const handleAddToCart = (productId: number) => {
    const updatedCart = [...cart, productId];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast({
      title: "Added to cart",
      description: "Product has been added to your cart",
    });
  };

  const handleToggleWishlist = (productId: number) => {
    const updatedWishlist = wishlist.filter((id) => id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast({
      title: "Removed from wishlist",
    });
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Heart className="h-24 w-24 text-gold mx-auto mb-6" />
            <h2 className="text-2xl font-heading font-bold text-ivory mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-warm-grey mb-8">
              Save your favorite jewelry pieces here
            </p>
            <Button
              onClick={() => setLocation("/products")}
              className="bg-gradient-to-r from-gold to-gold-light text-charcoal font-accent font-medium px-8 py-6 rounded-2xl hover:scale-105 transition-all duration-300"
              data-testid="button-browse-products"
            >
              Browse Products
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl md:text-4xl font-heading font-bold text-ivory mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Wishlist
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isInWishlist={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
