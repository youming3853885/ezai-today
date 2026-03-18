import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Eddie Chen 智造教育實驗室 | AI · IoT · Robotics",
  description: "科技不只是知識，而是解決問題的工具。透過整合 AI 應用、物聯網(IoT)與智慧機器人課程，激發學生探索未來的熱情。",
  keywords: ["AI", "IoT", "機器人", "程式教育", "科技教育", "Eddie Chen"],
  authors: [{ name: "Eddie Chen" }],
  openGraph: {
    title: "Eddie Chen 智造教育實驗室",
    description: "科技不只是知識，而是解決問題的工具",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${notoSansTC.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
