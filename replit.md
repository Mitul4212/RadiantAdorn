# AURÉLIA JEWELS - Luxury E-Commerce Website

## Project Overview
A premium luxury imitation jewelry e-commerce demo website for the Indian market, targeting women aged 15-40. Features a sophisticated dark theme with gold accents, smooth animations, and complete shopping flow from browsing to checkout.

## Tech Stack
- **Frontend**: React + TypeScript, Vite, TailwindCSS, Framer Motion
- **Backend**: Express.js, Node.js
- **State Management**: React Query, localStorage (for cart/wishlist persistence)
- **Styling**: Custom luxury design system with gold (#D4AF37) and charcoal (#1A1A1A) palette
- **Typography**: Playfair Display (headings), Inter (body), Poppins (accents)

## Architecture

### Data Storage Approach
The application uses a **hybrid storage approach** optimized for an MVP demo:

1. **localStorage for Cart & Wishlist**: 
   - Provides instant persistence across sessions without authentication
   - Enables seamless user experience for demo purposes
   - Perfect for MVP/prototype showcasing

2. **Backend Order Persistence**: 
   - Orders are saved to server-side storage after checkout
   - Provides order history and analytics capability
   - Ready for future authentication integration

3. **Product Data**: 
   - Static product catalog served from backend
   - 15 diverse jewelry items with complete metadata
   - Easy to migrate to database when needed

This approach balances demo simplicity with architectural scalability. For production, cart/wishlist would migrate to authenticated sessions or database storage.

## Features Implemented

### Core User Journeys
1. **Browse & Discover**
   - Hero section with luxury branding
   - Featured collections (Festive Luxe, Everyday Glow, Bridal Royale)
   - Product listing with filters (category, price, material)
   - Search functionality

2. **Product Detail**
   - Image carousel with multiple product angles
   - Complete product specifications (material, plating, care)
   - Related products ("Complete the Look")
   - Breadcrumb navigation

3. **Shopping Cart**
   - Add/remove items
   - Quantity management
   - Real-time total calculation
   - Free shipping above ₹499

4. **Wishlist**
   - Heart icon toggle on product cards
   - Dedicated wishlist page
   - Persistent across sessions

5. **Checkout Flow**
   - Customer information form with validation
   - Mock payment gateway (Razorpay, UPI, COD)
   - Order summary
   - Success confirmation with order persistence

### Design System
- **Color Palette**: Gold (#D4AF37), Deep Charcoal (#1A1A1A), Rich Onyx (#2C2C2C), Ivory (#F8F5F0)
- **Animations**: Fade-in on scroll, parallax hero, product hover zoom, gold glow effects
- **Responsive**: Mobile-first design with tablet and desktop breakpoints
- **Accessibility**: Proper alt text, ARIA labels, keyboard navigation, high contrast

## Key Pages
- `/` - Home (Hero, Featured Collections, Features)
- `/products` - Product Listing (Filters, Search, Grid)
- `/product/:id` - Product Detail (Carousel, Specs, Related Products)
- `/cart` - Shopping Cart
- `/checkout` - Checkout & Payment
- `/wishlist` - Saved Items
- `/about` - Brand Story
- `/contact` - Contact Form

## API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update quantity
- `DELETE /api/cart/:productId` - Remove item

### Wishlist
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist/:productId` - Toggle wishlist item

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders

## Running the Project
The workflow "Start application" runs `npm run dev` which starts both Express backend and Vite frontend on port 5000.

## Future Enhancements
1. User authentication (login/signup)
2. Database integration (PostgreSQL)
3. Real payment gateway integration
4. Email notifications
5. Order tracking
6. Product reviews & ratings
7. Admin dashboard
8. Inventory management
9. Multiple currency support
10. Regional shipping options

## Design Philosophy
The design follows luxury e-commerce principles:
- Generous whitespace for premium feel
- Gold accents for elegance
- Smooth animations for sophistication
- High-quality imagery
- Clear typography hierarchy
- Intuitive navigation
- Mobile-optimized experience

Brand Voice: Premium, sophisticated, aspirational yet accessible - "Affordable luxury that feels premium"
