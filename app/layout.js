import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

// Load Inter font with optimized subsets
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Toko Online - Belanja Mudah dan Aman",
  description: "Temukan produk berkualitas dengan harga terbaik dan pembayaran yang aman menggunakan Midtrans",
  keywords: ["toko online", "belanja", "midtrans", "pembayaran online"],
  authors: [{ name: "Your Name" }],
  metadataBase: new URL("https://your-website.com"),
  openGraph: {
    title: "Toko Online - Belanja Mudah dan Aman",
    description: "Temukan produk berkualitas dengan harga terbaik dan pembayaran yang aman menggunakan Midtrans",
    url: "https://your-website.com",
    siteName: "Toko Online",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900 antialiased`}>
        <Toaster position="top-center" toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }} />
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
          <footer className="py-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Toko Online. Hak Cipta Dilindungi.
          </footer>
        </div>
      </body>
    </html>
  );
}