# 🛒GreenBaskett - Modern E-Commerce Platform

A full-stack e-commerce web application built with Next.js 15, TypeScript, and Supabase. Features a complete shopping experience with user authentication, shopping cart, wishlist, and order management.

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://greenbaskett.vercel.app/)
[![GitHub](https://img.shields.io/badge/github-repository-blue)](https://github.com/E-ugine/Greenbaskett)

## Features

### Customer Features
-  **Product Catalog** - Browse 20+ products with detailed specifications
-  **Search & Filter** - Find products by name, category, brand, and price
-  **Shopping Cart** - Add/remove items, update quantities, persistent across sessions
-  **Wishlist** - Save favorite products for later
-  **User Authentication** - Secure registration and login with Supabase Auth
-  **Order Management** - Complete checkout flow with order history
-  **User Profile** - Manage account details and view order history
-  **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Technical Features
-  **Next.js 15** - Latest React framework with App Router
-  **Tailwind CSS** - Modern, utility-first styling
-  **Supabase Backend** - PostgreSQL database with real-time capabilities
-  **Secure Authentication** - Row-level security policies
-  **Type Safety** - Full TypeScript implementation
-  **Optimized Performance** - Image optimization, lazy loading
-  **State Management** - Zustand for cart and wishlist

##  Tech Stack

**Frontend:**
- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React Hook Form](https://react-hook-form.com/) - Form handling

**Backend:**
- [Supabase](https://supabase.com/) - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Row Level Security
  - Real-time subscriptions

**Deployment:**
- [Vercel](https://vercel.com/) - Hosting and CI/CD

##  Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- Git

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/mcdev7777/Greenbaskett.git
   cd Greenbaskett
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up Supabase database**
   
   Run the SQL schema in your Supabase SQL Editor (see `Database Schema` section below)

5. **Run the development server**
```bash
   npm run dev
```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

##  Database Schema

### Tables

**products**
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),
  images TEXT[],
  category TEXT,
  brand TEXT,
  rating DECIMAL(2,1),
  color TEXT,
  condition TEXT,
  screen_size TEXT,
  memory TEXT,
  inventory INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**cart**
```sql
CREATE TABLE cart (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

**wishlist**
```sql
CREATE TABLE wishlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

**orders**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'processing',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Row Level Security (RLS)

Enable RLS on all tables and create policies:
```sql
-- Cart policies
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart"
  ON cart FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items"
  ON cart FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart"
  ON cart FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON cart FOR DELETE
  USING (auth.uid() = user_id);

-- Similar policies for wishlist and orders
-- Products table is publicly readable
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);
```

## Project Structure
```
greenbaskett/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── products/          # Product listing and details
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout flow
│   │   ├── profile/           # User profile
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── layout/           # Layout components (Header, Footer)
│   │   └── product-detail/   # Product-related components
│   ├── contexts/             # React contexts
│   │   └── AuthContext.tsx  # Authentication context
│   ├── store/               # State management (Zustand)
│   │   └── cart-store.ts   # Cart state
│   ├── lib/                 # Utilities
│   │   ├── api.ts          # API functions
│   │   ├── supabase.ts     # Supabase client
│   │   └── utils.ts        # Helper functions
│   └── types/              # TypeScript types
│       └── index.ts
├── public/                 # Static assets
├── .env.local             # Environment variables
└── package.json
```

##  Key Features Implementation

### Authentication Flow
- User registration with email/password
- Secure login with Supabase Auth
- Protected routes (cart, checkout, profile)
- Persistent sessions with cookies

### Shopping Cart
- Real-time cart updates
- Quantity management
- User-specific cart items
- Persisted in database

### Checkout Process
1. User adds items to cart
2. Proceeds to checkout (requires authentication)
3. Fills in billing/shipping information
4. Selects payment method
5. Places order
6. Order saved to database
7. Cart cleared
8. Redirected to order history

## Live Demo

Visit the live application: [https://greenbaskett.vercel.app/](https://greenbaskett.vercel.app/)

**Test Account:**
- Feel free to register your own account to test all features

## Screenshots

### Homepage
![Homepage](https://via.placeholder.com/800x400?text=Homepage+Screenshot)

### Product Listing
![Products](https://via.placeholder.com/800x400?text=Products+Screenshot)

### Shopping Cart
![Cart](https://via.placeholder.com/800x400?text=Cart+Screenshot)

### Checkout
![Checkout](https://via.placeholder.com/800x400?text=Checkout+Screenshot)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Environment Variables

Required environment variables for production:
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications (order confirmation, password reset)
- [ ] Product reviews and ratings
- [ ] Admin dashboard
- [ ] Order tracking
- [ ] Multiple shipping addresses
- [ ] Coupon/discount codes
- [ ] Advanced search with filters
- [ ] Product recommendations
- [ ] Social media integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

- GitHub: [@mcdev7777](https://github.com/mcdev7777)
- Project Link: [https://github.com/mcdev7777/Greenbaskett](https://github.com/mcdev7777/Greenbaskett)

##  Acknowledgments

- Product images sourced from Pinterest
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Inspiration from modern e-commerce platforms figma designs(https://www.figma.com/design/BVt4jj3jj0nORO0yuBHpZb/75--Ecommerce---Shop-MultiPurpose-Template--Community-?node-id=0-1&t=QPsHjOVRRcTS4p9g-1)

---

⭐ If you found this project helpful, please give it a star on GitHub!