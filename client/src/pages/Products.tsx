import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import type { Product, Filter } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Products() {
  const { toast } = useToast();
  const [filters, setFilters] = useState<Filter>({});
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Get cart and wishlist from localStorage
  const [cart, setCart] = useState<number[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

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
    const updatedWishlist = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast({
      title: wishlist.includes(productId)
        ? "Removed from wishlist"
        : "Added to wishlist",
    });
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Price filter
    if (filters.maxPrice) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    // Material filter
    if (filters.material) {
      filtered = filtered.filter((p) => p.material.includes(filters.material!));
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, filters, searchQuery]);

  const priceRange = useMemo(() => {
    if (!products.length) return { min: 0, max: 5000 };
    const prices = products.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-muted animate-pulse rounded-2xl"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-ivory mb-4">
            Our Collection
          </h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jewelry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-card-border text-card-foreground"
              data-testid="input-search"
            />
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              minPrice={priceRange.min}
              maxPrice={priceRange.max}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-warm-grey text-lg">
                  No products found matching your criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isInWishlist={wishlist.includes(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
