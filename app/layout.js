import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { siteConfig } from "./config/site";
import { layoutTranslations } from "./config/translations";
import ErrorBoundary from "./components/ErrorBoundary";
import Script from "next/script";

// Load Inter font with optimized subsets
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Get translations (can be made dynamic based on user preference/location)
const lang = "id";
const t = layoutTranslations[lang];

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: t.metadata.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: t.metadata.description,
  keywords: t.metadata.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: lang === "id" ? "id_ID" : "en_US",
    url: siteConfig.url,
    title: t.metadata.title,
    description: t.metadata.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: t.metadata.title,
    description: t.metadata.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.creator}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang={lang} className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900 antialiased`}>
        <Toaster 
          position="top-center" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }} 
        />
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <ErrorBoundary lang={lang}>
              {children}
            </ErrorBoundary>
          </main>
          <footer className="py-6 bg-white border-t">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center justify-center space-y-2">
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} {siteConfig.name}. {t.footer.allRights}.
                </p>
                <div className="flex items-center space-x-1 text-sm text-gray-400">
                  <span>{t.footer.poweredBy}</span>
                  <a 
                    href="https://nextjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Next.js
                  </a>
                  <span>&</span>
                  <a 
                    href="https://midtrans.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Midtrans
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>

        {/* Midtrans Client Key */}
        <Script 
          src="https://app.sandbox.midtrans.com/snap/snap.js" 
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}