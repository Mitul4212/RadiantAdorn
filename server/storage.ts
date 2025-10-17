import type { CartItem, WishlistItem, Order } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Cart operations
  getCart(sessionId: string): Promise<CartItem[]>;
  addToCart(sessionId: string, productId: number): Promise<CartItem[]>;
  updateCartQuantity(sessionId: string, productId: number, quantity: number): Promise<CartItem[]>;
  removeFromCart(sessionId: string, productId: number): Promise<CartItem[]>;
  
  // Wishlist operations
  getWishlist(sessionId: string): Promise<number[]>;
  toggleWishlist(sessionId: string, productId: number): Promise<number[]>;
  
  // Order operations
  createOrder(order: Omit<Order, "id" | "createdAt">): Promise<Order>;
  getOrders(): Promise<Order[]>;
}

export class MemStorage implements IStorage {
  private carts: Map<string, number[]> = new Map();
  private wishlists: Map<string, number[]> = new Map();
  private orders: Map<string, Order> = new Map();

  async getCart(sessionId: string): Promise<CartItem[]> {
    const cartItems = this.carts.get(sessionId) || [];
    const itemCount = cartItems.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const products = await import("./data/products").then(m => m.products);
    
    return Object.entries(itemCount).map(([productId, quantity]) => {
      const product = products.find((p) => p.id === parseInt(productId));
      return {
        productId: parseInt(productId),
        quantity,
        product: product!,
      };
    }).filter(item => item.product);
  }

  async addToCart(sessionId: string, productId: number): Promise<CartItem[]> {
    const cart = this.carts.get(sessionId) || [];
    cart.push(productId);
    this.carts.set(sessionId, cart);
    return this.getCart(sessionId);
  }

  async updateCartQuantity(sessionId: string, productId: number, quantity: number): Promise<CartItem[]> {
    const cart = this.carts.get(sessionId) || [];
    const filtered = cart.filter(id => id !== productId);
    
    for (let i = 0; i < quantity; i++) {
      filtered.push(productId);
    }
    
    this.carts.set(sessionId, filtered);
    return this.getCart(sessionId);
  }

  async removeFromCart(sessionId: string, productId: number): Promise<CartItem[]> {
    const cart = this.carts.get(sessionId) || [];
    const filtered = cart.filter(id => id !== productId);
    this.carts.set(sessionId, filtered);
    return this.getCart(sessionId);
  }

  async getWishlist(sessionId: string): Promise<number[]> {
    return this.wishlists.get(sessionId) || [];
  }

  async toggleWishlist(sessionId: string, productId: number): Promise<number[]> {
    const wishlist = this.wishlists.get(sessionId) || [];
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(productId);
    }
    
    this.wishlists.set(sessionId, wishlist);
    return wishlist;
  }

  async createOrder(orderData: Omit<Order, "id" | "createdAt">): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...orderData,
      id,
      createdAt: new Date().toISOString(),
    };
    this.orders.set(id, order);
    
    // Clear cart after order
    if (orderData.items.length > 0) {
      const sessionId = `session-${Date.now()}`; // This would come from session
      this.carts.delete(sessionId);
    }
    
    return order;
  }

  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
}

export const storage = new MemStorage();
