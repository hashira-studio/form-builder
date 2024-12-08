import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Form Builder - Generate Dynamic Forms from JSON',
    template: '%s | Form Builder'
  },
  description: 'Create dynamic forms easily with our JSON-powered form builder. Generate React forms with validation, live preview, and code generation.',
  keywords: ['form builder', 'json form generator', 'react forms', 'dynamic forms', 'form validation', 'nextjs forms' , 'shadcn'],
  authors: [{ name: 'Form Builder Team' }],
  creator: 'Form Builder Team',
  publisher: 'Form Builder',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://formbuilder.hashira.studio',
    title: 'Form Builder - Generate Dynamic Forms from JSON',
    description: 'Create dynamic forms easily with our JSON-powered form builder. Generate React forms with validation, live preview, and code generation.',
    siteName: 'Form Builder',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Form Builder - JSON to React Forms'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Form Builder - Generate Dynamic Forms from JSON',
    description: 'Create dynamic forms easily with our JSON-powered form builder. Generate React forms with validation, live preview, and code generation.',
    images: ['/og-image.jpg'],
    creator: '@formbuilder',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/site.webmanifest',
  verification: {
    google: '',
    yandex: '',
    bing: '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://form-builder.com" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}