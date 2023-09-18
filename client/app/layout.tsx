import "./globals.css";
import type { Metadata } from "next";
import "cal-sans";

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
      <body className="font-main bg-kz-primary">{children}</body>
    </html>
  );
}
