import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Product, CartItem } from "@shared/schema";
import { motion } from "framer-motion";

export default function Cart() {
  const [, setLocation] = useLocation();
  const [cartItems, setCartItems] = useState<number[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const cart: CartItem[] = useMemo(() => {
    const itemCount = cartItems.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return Object.entries(itemCount).map(([productId, quantity]) => {
      const product = products.find((p) => p.id === parseInt(productId));
      return {
        productId: parseInt(productId),
        quantity,
        product: product!,
      };
    }).filter(item => item.product);
  }, [cartItems, products]);

  const updateQuantity = (productId: number, change: number) => {
    const currentCount = cartItems.filter((id) => id === productId).length;
    const newCount = currentCount + change;

    if (newCount <= 0) {
      removeItem(productId);
      return;
    }

    const newCart = cartItems.filter((id) => id !== productId);
    for (let i = 0; i < newCount; i++) {
      newCart.push(productId);
    }
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (productId: number) => {
    const newCart = cartItems.filter((id) => id !== productId);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal >= 499 ? 0 : 50;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ShoppingBag className="h-24 w-24 text-gold mx-auto mb-6" />
            <h2 className="text-2xl font-heading font-bold text-ivory mb-4">
              Your cart is empty
            </h2>
            <p className="text-warm-grey mb-8">
              Start adding beautiful jewelry to your cart
            </p>
            <Button
              onClick={() => setLocation("/products")}
              className="bg-gradient-to-r from-gold to-gold-light text-charcoal font-accent font-medium px-8 py-6 rounded-2xl hover:scale-105 transition-all duration-300"
              data-testid="button-shop-now"
            >
              Shop Now
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
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="p-4 bg-card border-card-border rounded-2xl"
                  data-testid={`card-cart-item-${item.productId}`}
                >
                  <div className="flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3
                        className="font-heading font-semibold text-card-foreground mb-1"
                        data-testid={`text-cart-item-name-${item.productId}`}
                      >
                        {item.product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {item.product.material}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-muted rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, -1)}
                            data-testid={`button-decrease-${item.productId}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span
                            className="font-medium text-card-foreground w-8 text-center"
                            data-testid={`text-quantity-${item.productId}`}
                          >
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, 1)}
                            data-testid={`button-increase-${item.productId}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-lg font-bold text-gold"
                            data-testid={`text-item-total-${item.productId}`}
                          >
                            ₹{item.product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.productId)}
                      data-testid={`button-remove-${item.productId}`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 bg-card border-card-border rounded-2xl sticky top-24">
              <h2 className="text-xl font-heading font-bold text-card-foreground mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span
                    className="text-card-foreground font-medium"
                    data-testid="text-subtotal"
                  >
                    ₹{subtotal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span
                    className={`font-medium ${
                      shipping === 0 ? "text-green-500" : "text-card-foreground"
                    }`}
                    data-testid="text-shipping"
                  >
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {subtotal < 499 && (
                  <p className="text-xs text-warm-grey">
                    Add ₹{499 - subtotal} more for free shipping
                  </p>
                )}
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-heading font-bold text-card-foreground">
                      Total
                    </span>
                    <span
                      className="text-lg font-bold text-gold"
                      data-testid="text-total"
                    >
                      ₹{total}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setLocation("/checkout")}
                className="w-full bg-gradient-to-r from-gold to-gold-light text-charcoal font-accent font-medium py-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-gold/50"
                data-testid="button-checkout"
              >
                Proceed to Checkout
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
