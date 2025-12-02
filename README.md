# Next JS Payment Template

## Features
- Product display with image, description, and pricing
- Color selection for products
- Size selection for products
- Quantity adjustment with increment/decrement buttons
- Order summary display
- Midtrans payment integration (sandbox)
- Responsive design with Tailwind CSS
- Internationalization support (Indonesian and English)
- Error handling with retry mechanism
- Payment link generation
- Success page with order details
- Shipping information form
- Multiple payment method selection
- Coupon/discount system
- Complete API routes for checkout and payment link generation
- Product gallery with multiple images
- Wishlist functionality
- Recently viewed products

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Create a `.env` file based on `.env.example` and add your Midtrans credentials:
   ```
   MIDTRANS_SERVER_KEY=your_server_key_here
   MIDTRANS_CLIENT_KEY=your_client_key_here
   NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_public_client_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## New Features Added
- ✅ Color selection for products
- ✅ Order summary component
- ✅ Enhanced error handling with retry mechanism
- ✅ Improved accessibility features
- ✅ Complete API routes for checkout and payment link generation
- ✅ Environment variable configuration
- ✅ Shipping information collection
- ✅ Multiple payment method options
- ✅ Coupon/discount system
- ✅ Detailed order breakdown with discounts
- ✅ Product gallery with multiple images
- ✅ Size selection for products
- ✅ Wishlist functionality with localStorage persistence
- ✅ Recently viewed products section

## Testing Coupons
You can test the coupon system with these demo codes:
- `DISKON10` - 10% discount
- `SAVE20` - 20% discount

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Midtrans Documentation](https://docs.midtrans.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)