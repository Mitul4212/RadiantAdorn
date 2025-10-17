import { z } from "zod";

// Product Schema
export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  oldPrice: z.number(),
  category: z.enum(["Earrings", "Necklaces", "Bangles", "Rings", "Sets", "Chains"]),
  material: z.string(),
  plating: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  careInstructions: z.string(),
  inStock: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;

// Cart Item Schema
export const cartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
  product: productSchema,
});

export type CartItem = z.infer<typeof cartItemSchema>;

// Wishlist Item Schema  
export const wishlistItemSchema = z.object({
  productId: z.number(),
  product: productSchema,
});

export type WishlistItem = z.infer<typeof wishlistItemSchema>;

// Checkout Form Schema
export const checkoutFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),
});

export type CheckoutForm = z.infer<typeof checkoutFormSchema>;

// Order Schema
export const orderSchema = z.object({
  id: z.string(),
  items: z.array(cartItemSchema),
  total: z.number(),
  customerInfo: checkoutFormSchema,
  paymentMethod: z.enum(["razorpay", "upi", "cod"]),
  createdAt: z.string(),
});

export type Order = z.infer<typeof orderSchema>;

// Filter Schema
export const filterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  material: z.string().optional(),
  search: z.string().optional(),
});

export type Filter = z.infer<typeof filterSchema>;
