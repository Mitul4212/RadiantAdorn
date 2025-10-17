import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
  onToggleWishlist: (productId: number) => void;
  isInWishlist: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}: ProductCardProps) {
  const [, setLocation] = useLocation();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card
        className="group overflow-hidden bg-card border border-card-border rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-gold/20"
        data-testid={`card-product-${product.id}`}
      >
        {/* Image Container */}
        <div
          className="relative aspect-square overflow-hidden"
          onClick={() => setLocation(`/product/${product.id}`)}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse"></div>
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Wishlist & Cart Icons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              className={`bg-charcoal/80 backdrop-blur-sm rounded-full hover:bg-charcoal ${
                isInWishlist ? "text-gold" : "text-ivory"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              data-testid={`button-wishlist-${product.id}`}
            >
              <Heart
                className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-charcoal/80 backdrop-blur-sm text-ivory rounded-full hover:bg-gold hover:text-charcoal"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product.id);
              }}
              data-testid={`button-add-cart-${product.id}`}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>

          {/* Stock Badge */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center">
              <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-accent text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div
          className="p-4"
          onClick={() => setLocation(`/product/${product.id}`)}
        >
          <h3
            className="font-heading text-lg font-semibold text-card-foreground mb-2 line-clamp-1"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-3">
            {product.material}
          </p>
          <div className="flex items-center gap-3">
            <span
              className="text-xl font-bold text-gold"
              data-testid={`text-price-${product.id}`}
            >
              ₹{product.price}
            </span>
            {product.oldPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.oldPrice}
              </span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
