import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono, Noto_Sans_TC } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-noto',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "陳又鳴 Eddie Chen｜智造教育實驗室",
  description:
    "陳又鳴（Eddie Chen），智造教育實驗室創辦人。AI · IoT · Robotics 教育專家，10+ 年經驗，200+ 演講，致力培養具備數位韌性的科技創造者。",
  keywords: ["AI", "IoT", "機器人", "程式教育", "科技教育", "Eddie Chen", "陳又鳴", "智造教育"],
  authors: [{ name: "陳又鳴 Eddie Chen" }],
  openGraph: {
    title: "陳又鳴 Eddie Chen｜智造教育實驗室",
    description: "致力培養具備數位韌性的科技創造者",
    type: "website",
    url: "https://ezai.today",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-TW"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} ${notoSansTC.variable}`}
    >
      <body
        style={{
          fontFamily:
            "var(--font-sans), var(--font-noto), system-ui, -apple-system, sans-serif",
        }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
