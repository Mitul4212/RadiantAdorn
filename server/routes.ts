import type { Express } from "express";
import { createServer, type Server } from "http";
import { products } from "./data/products";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Helper to get session ID (using a simple approach for demo)
  const getSessionId = (req: any) => {
    if (!req.session.id) {
      req.session.id = `session-${Date.now()}-${Math.random()}`;
    }
    return req.session.id;
  };

  // Get all products
  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  // Get single product by ID
  app.get("/api/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(product);
  });

  // Cart endpoints
  app.get("/api/cart", async (req, res) => {
    const sessionId = getSessionId(req);
    const cart = await storage.getCart(sessionId);
    res.json(cart);
  });

  app.post("/api/cart", async (req, res) => {
    const sessionId = getSessionId(req);
    const { productId } = req.body;
    const cart = await storage.addToCart(sessionId, productId);
    res.json(cart);
  });

  app.put("/api/cart/:productId", async (req, res) => {
    const sessionId = getSessionId(req);
    const productId = parseInt(req.params.productId);
    const { quantity } = req.body;
    const cart = await storage.updateCartQuantity(sessionId, productId, quantity);
    res.json(cart);
  });

  app.delete("/api/cart/:productId", async (req, res) => {
    const sessionId = getSessionId(req);
    const productId = parseInt(req.params.productId);
    const cart = await storage.removeFromCart(sessionId, productId);
    res.json(cart);
  });

  // Wishlist endpoints
  app.get("/api/wishlist", async (req, res) => {
    const sessionId = getSessionId(req);
    const wishlist = await storage.getWishlist(sessionId);
    res.json(wishlist);
  });

  app.post("/api/wishlist/:productId", async (req, res) => {
    const sessionId = getSessionId(req);
    const productId = parseInt(req.params.productId);
    const wishlist = await storage.toggleWishlist(sessionId, productId);
    res.json(wishlist);
  });

  // Order endpoints
  app.post("/api/orders", async (req, res) => {
    const order = await storage.createOrder(req.body);
    res.json(order);
  });

  app.get("/api/orders", async (req, res) => {
    const orders = await storage.getOrders();
    res.json(orders);
  });

  const httpServer = createServer(app);

  return httpServer;
}
