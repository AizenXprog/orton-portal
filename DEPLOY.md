# Publicar o Orton Portal

## Caminho recomendado: Vercel

1. Crie uma conta na Vercel.
2. Suba esta pasta para um repositório GitHub.
3. Na Vercel, escolha **Add New > Project**.
4. Importe o repositório do Orton Portal.
5. Framework: **Next.js** (detectado automaticamente).
6. Build command: `npm run build`.
7. Clique em **Deploy**.

Depois do deploy você recebe um endereço `*.vercel.app`.

## Domínio próprio

Em **Project > Settings > Domains**, adicione o domínio do Orton e siga os registros DNS mostrados pela Vercel.

## Download da Beta

O instalador da Beta 1 continua em `public/downloads/` e a rota `/download` usa esse arquivo.

## Updater

O endpoint `/api/version` deve ser mantido para o Orton consultar versão/canal futuramente.
