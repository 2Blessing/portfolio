"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Gère le thème clair/sombre :
 * - suit la préférence du système par défaut ;
 * - mémorise le choix du visiteur (localStorage) ;
 * - évite le « flash » au chargement.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
