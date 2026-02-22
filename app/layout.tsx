import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
export const metadata: Metadata = {
  title: "Code2Tech",
  description:
    "This is a tech blog site made in collabaration. The intent of this site is to demystify the jargon and make the tech world more accessible to everyone.Especailly the young indian developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <NavBar></NavBar>
          {children}
          <Footer></Footer>
        </ThemeProvider>
        <Script
          src="https://widget.verlyai.xyz/embed.js"
          data-chatbot-id="ij6it712urywufc029m4bdp1"
          data-position="bottom-right"
          data-primary-color="#007bff"
          strategy="lazyOnload"
        />
      </body>
      <Analytics></Analytics>
    </html>
  );
}
