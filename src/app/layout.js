'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/auth";
import Header from "./header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}