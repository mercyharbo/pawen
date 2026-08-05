import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { NominationFormDialog } from "@/components/nomination/nomination-form-dialog";
import { SmoothScroll } from "@/components/smooth-scroll";
import { rootMetadata } from "@/lib/seo";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
          <NominationFormDialog />
        </SmoothScroll>
      </body>
    </html>
  );
}
