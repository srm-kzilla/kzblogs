import "./globals.css";
import type { Metadata } from "next";
import "cal-sans";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { cookieMiddleware } from "./utils/cookie";

export const metadata: Metadata = {
  title: "KZBlogs",
  description: "Blogs by Kzilla",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body bg-kz-primary">
        <main>
          <AuthProvider>{children}</AuthProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
