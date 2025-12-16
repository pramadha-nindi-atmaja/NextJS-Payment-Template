import "./globals.css";
import { Inter } from "next/font/google";
import { WishlistProvider } from "./contexts/WishlistContext";
import { RecentlyViewedProvider } from "./contexts/RecentlyViewedContext";
import { RatingProvider } from "./contexts/RatingContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Pay",
  description: "Next.js Payment Template with Midtrans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        ></script>
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900 antialiased`}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
                <RatingProvider>
                  <Toaster 
                    position="top-center" 
                    toastOptions={{
                      duration: 3000,
                    }}
                  />
                  {children}
                </RatingProvider>
              </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
