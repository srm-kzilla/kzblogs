import "./globals.css";
import type { Metadata } from "next";
import "cal-sans";
import AuthProvider from "@/components/AuthProvider";

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
      </body>
    </html>
  );
}
