'use client'
import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// tambah provider lain jika perlu (HeroUI, dll.)

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      {children}
    </NextThemesProvider>
  );
}
