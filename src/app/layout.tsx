import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abhay Kumar Gautam — Paintings & Sculpture",
  description: "Portfolio of Abhay Kumar Gautam, painter, sculptor, and retired art teacher from Kanpur, India.",
  openGraph: {
    title: "Abhay Kumar Gautam — Paintings & Sculpture",
    description: "Exploring the dynamism of equine form, the quiet poetry of landscapes, and the surreal spaces between memory and dream.",
    images: ["/images/artwork/polo-match.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
