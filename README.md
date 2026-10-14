# Orton Portal v0.4 — Official Mark

Portal oficial do Orton 6. Nesta versão o símbolo oficial do software é usado no header, footer e favicon.

## Rodar localmente

```powershell
npm.cmd install
npm.cmd run dev
```

Abra `http://localhost:3000`.

## Publicar

Veja `DEPLOY.md`.

# Orton Portal v0.2

Portal público do Orton 6 Beta 1.

## O que mudou na v0.2
- fundo ambiente animado, leve e contínuo;
- elementos entram de forma progressiva durante o scroll;
- microparallax sutil guiado pelo ponteiro;
- showcase animado do Orton Flow na Home;
- página dedicada `/flow` com canvas visual, fios curvos e efeito neon;
- animações respeitam `prefers-reduced-motion`;
- sem biblioteca pesada de animação.

## Rodar no Windows
Extraia o ZIP. O `package.json` já fica na raiz desta versão.

No PowerShell dentro da pasta:

```powershell
npm.cmd install
npm.cmd run dev
```

Depois abra no navegador:

```text
http://localhost:3000
```

## Build

```powershell
npm.cmd run build
npm.cmd start
```

O instalador Beta 1 continua em `public/downloads` e o manual compacto em `public/docs`.


## Autoria
Desenvolvido por Vitor Monte Vaz — Instagram: https://www.instagram.com/mnttez/
