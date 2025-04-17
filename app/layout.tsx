import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DndProviderWrapper } from "@/components/providers/dnd-provider";
import "./globals.css";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import OfflineNotification from "@/components/ui/offline-notification";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stylish E-Commerce | Premium Shopping Experience",
  description: "A sophisticated e-commerce web application offering a premium shopping experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Clerk authentication is handled in the Header component */}
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <DndProviderWrapper>
              <div className="flex min-h-screen flex-col">
                <Header />
                <OfflineNotification />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </DndProviderWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
