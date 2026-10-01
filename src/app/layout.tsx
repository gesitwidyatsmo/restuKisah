import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RestuKisah - All-in-One Wedding OS & Digital Invitation Platform",
  description:
    "Platform manajemen pernikahan dan undangan digital terintegrasi dari birokrasi KUA, checklist, pelacakan budget, hingga meja resepsi berbasis QR Code.",
  keywords: [
    "manajemen pernikahan",
    "wedding organizer",
    "undangan digital",
    "checklist pernikahan",
    "administrasi kua",
    "wedding budget planner",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${jakartaSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans bg-canvas-pattern text-[#1C1917] selection:bg-rose-200 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}
