import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Logo } from "@/components/ui/logo";
import { UserStatus } from "@/components/ui/user-status";
import { AuthProvider } from "@/components/ui/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Configuratore Serramenti - ALM Infissi",
  description: "Configura il tuo serramento personalizzato con ALM Infissi di Alessandro Cappello. Serramenti su misura per Palermo e provincia.",
  keywords: "serramenti, infissi, Palermo, finestre, porte, configuratore online, serramenti su misura",
  authors: [{ name: "ALM Infissi di Alessandro Cappello" }],
  creator: "ALM Infissi",
  publisher: "ALM Infissi di Alessandro Cappello",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  openGraph: {
    title: "Configuratore Serramenti - ALM Infissi",
    description: "Configura il tuo serramento personalizzato con ALM Infissi di Alessandro Cappello",
    type: "website",
    locale: "it_IT",
    images: [
      {
        url: "/alm.png",
        width: 1200,
        height: 630,
        alt: "ALM Infissi - Configuratore Serramenti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Configuratore Serramenti - ALM Infissi",
    description: "Configura il tuo serramento personalizzato con ALM Infissi di Alessandro Cappello",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${inter.variable} ${manrope.variable} font-sans antialiased`}
      >
        {/* Header con Logo - Fissa in alto */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo a sinistra */}
              <div className="flex items-center">
                <Logo className="text-blue-600" width={80} height={40} />
              </div>
              
              {/* Stato utente a destra */}
              <UserStatus />
            </div>
          </div>
        </header>

        {/* Contenuto principale con padding per navbar fissa */}
        <main className="pt-16">
          <AuthProvider>
            {children}
          </AuthProvider>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <Logo className="text-white mb-4" width={100} height={50} />
                <p className="text-gray-300 text-sm">
                  Serramenti su misura per Palermo e provincia.
                  Qualità, precisione e servizio clienti eccellente.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Contatti</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>
                <a 
                  href="https://maps.app.goo.gl/1AAN1oaNqLJ9g3eF7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  📍 Dove siamo
                </a>
              </p>
              <p>📞 +39 320 123 4567</p>
              <p>📧 info@alminfissi.it</p>
              <p>🕒 Lun-Ven: 8:00-18:00</p>
            </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Servizi</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Configuratore Online</li>
                  <li>• Serramenti su Misura</li>
                  <li>• Installazione Professionale</li>
                  <li>• Assistenza Post-Vendita</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © 2025 ALM Infissi di Alessandro Cappello - Tutti i diritti riservati
              </p>
              <p className="text-gray-500 text-xs mt-2">
                P.IVA: 06365120820
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
