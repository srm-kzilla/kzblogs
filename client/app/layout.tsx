import "./globals.css";
import type { Metadata } from "next";
import "cal-sans";
const calSans = "cal-sans";
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
      <body className={calSans}>{children}</body>
    </html>
  );
}
