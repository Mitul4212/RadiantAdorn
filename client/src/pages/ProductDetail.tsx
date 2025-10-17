import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const productId = params?.id ? parseInt(params.id) : 0;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cart, setCart] = useState<number[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const product = products.find((p) => p.id === productId);
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== productId)
    .slice(0, 4);

  const handleAddToCart = (id: number) => {
    const updatedCart = [...cart, id];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast({
      title: "Added to cart",
      description: "Product has been added to your cart",
    });
  };

  const handleToggleWishlist = (id: number) => {
    const updatedWishlist = wishlist.includes(id)
      ? wishlist.filter((wid) => wid !== id)
      : [...wishlist, id];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast({
      title: wishlist.includes(id)
        ? "Removed from wishlist"
        : "Added to wishlist",
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <p className="text-warm-grey">Product not found</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-warm-grey">
          <a
            href="/"
            className="hover:text-gold transition-colors"
            onClick={(e) => {
              e.preventDefault();
              setLocation("/");
            }}
          >
            Home
          </a>
          <span className="mx-2">/</span>
          <a
            href="/products"
            className="hover:text-gold transition-colors"
            onClick={(e) => {
              e.preventDefault();
              setLocation("/products");
            }}
          >
            Products
          </a>
          <span className="mx-2">/</span>
          <span className="text-ivory">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-card">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-charcoal/80 backdrop-blur-sm text-ivory hover:bg-charcoal"
                    onClick={prevImage}
                    data-testid="button-prev-image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-charcoal/80 backdrop-blur-sm text-ivory hover:bg-charcoal"
                    onClick={nextImage}
                    data-testid="button-next-image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? "border-gold"
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                    data-testid={`button-thumbnail-${idx}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-3xl md:text-4xl font-heading font-bold text-ivory mb-4"
              data-testid="text-product-name"
            >
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <span
                className="text-3xl font-bold text-gold"
                data-testid="text-product-price"
              >
                ₹{product.price}
              </span>
              {product.oldPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through">
                  ₹{product.oldPrice}
                </span>
              )}
              {product.oldPrice > product.price && (
                <Badge className="bg-gold text-charcoal">
                  {Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100
                  )}
                  % OFF
                </Badge>
              )}
            </div>

            <p className="text-warm-grey mb-6">{product.description}</p>

            {/* Product Specs */}
            <Card className="bg-card border-card-border p-6 mb-6 rounded-2xl">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Material:</span>
                  <span className="text-ivory font-medium">
                    {product.material}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plating:</span>
                  <span className="text-ivory font-medium">
                    {product.plating}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="text-ivory font-medium">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability:</span>
                  <span
                    className={
                      product.inStock ? "text-green-500" : "text-destructive"
                    }
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </Card>

            {/* Care Instructions */}
            <div className="mb-6">
              <h3 className="text-lg font-heading font-semibold text-ivory mb-2">
                Care Instructions
              </h3>
              <p className="text-warm-grey text-sm">
                {product.careInstructions}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() => handleAddToCart(product.id)}
                disabled={!product.inStock}
                className="flex-1 bg-gradient-to-r from-gold to-gold-light text-charcoal font-accent font-medium px-8 py-6 text-lg rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-gold/50 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={() => handleToggleWishlist(product.id)}
                variant="outline"
                className={`border-2 font-accent font-medium px-6 py-6 rounded-2xl transition-all duration-300 ${
                  wishlist.includes(product.id)
                    ? "border-gold bg-gold text-charcoal"
                    : "border-gold text-gold hover:bg-gold hover:text-charcoal"
                }`}
                data-testid="button-toggle-wishlist"
              >
                <Heart
                  className={`h-5 w-5 ${
                    wishlist.includes(product.id) ? "fill-current" : ""
                  }`}
                />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ivory mb-8">
              Complete the Look
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isInWishlist={wishlist.includes(relatedProduct.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
