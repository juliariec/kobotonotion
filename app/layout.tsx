import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Export Kobo to Notion",
  description: "Export Kobo highlights to Notion database.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header>
            <h1>Kobo to Notion</h1>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
