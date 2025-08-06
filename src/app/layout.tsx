// src/app/layout.tsx
import { Providers } from "./providers";
import MainLayout from "../components/Layout";
import React from "react";
import '../styles/globals.css';

export const metadata = {
  title: "Anime Streaming - Dark Modern",
  description: "Anime website modern, dark theme, Next.js, HeroUI, Vidstack",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-dark-surface text-white min-h-screen">
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
