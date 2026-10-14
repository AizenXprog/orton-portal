import type { Metadata } from "next";
import "./globals.css";
import { MotionLayer } from "./motion";

export const metadata: Metadata = {
  title: "Orton — Seus arquivos. Um fluxo só.",
  description: "Portal oficial do Orton 6 — organização, busca, scanner, studio e automação visual em um único ecossistema. Desenvolvido por Vitor Monte Vaz.",
  authors: [{ name: "Vitor Monte Vaz", url: "https://www.instagram.com/mnttez/" }],
  creator: "Vitor Monte Vaz",
  icons: {
    icon: "/orton-logo.png",
    shortcut: "/orton-logo.png",
    apple: "/orton-logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="ambient" aria-hidden="true">
          <div className="ambientBlob ambientBlobA" />
          <div className="ambientBlob ambientBlobB" />
          <div className="ambientBlob ambientBlobC" />
          <div className="ambientGrid" />
        </div>
        <MotionLayer />
        {children}
      </body>
    </html>
  );
}
