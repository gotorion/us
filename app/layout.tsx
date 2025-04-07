import { Metadata } from "next";
import "./globals.css";
// 导入字体使用Next.js推荐的方式
import { Dancing_Script } from 'next/font/google';

// 初始化字体
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Timeline",
  description: "A beautiful timeline website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dancingScript.className}>
        {children}
      </body>
    </html>
  );
}
