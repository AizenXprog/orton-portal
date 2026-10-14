import Link from "next/link";
import { Footer, Header, PageTop } from "../components";
import installerMeta from "../installer-meta.json";

export default function DownloadPage() {
  return (
    <><Header/><main>
      <PageTop eyebrow="DOWNLOAD" title="Orton 6 Beta 1" description="A primeira Beta pública do Orton. Instale, teste os sete módulos e ajude a identificar o que ainda precisa ser refinado." />
      <section className="shell downloadGrid">
        <article className="downloadCard featured">
          <div className="downloadBadge">RECOMENDADO</div>
          <h2>Orton 6 Beta 1 · Hotfix 1</h2>
          <p>Windows · instalador x64 · canal Beta · não exige .NET pré-instalado</p>
          <a className="button primary wide" href="/downloads/Orton_Setup_6.0_Beta1.exe" download>Baixar instalador</a>
          <dl className="downloadDetails"><div><dt>Versão</dt><dd>{installerMeta.version}</dd></div><div><dt>Canal</dt><dd>Beta</dd></div><div><dt>Status</dt><dd>Hotfix 1</dd></div></dl>
        </article>
        <article className="downloadCard">
          <span className="eyebrow">DOCUMENTAÇÃO</span>
          <h2>Manual compacto</h2>
          <p>Um guia curto para entender o Orton e o papel de cada módulo.</p>
          <a className="button secondary wide" href="/docs/Orton_Manual_Compacto.pdf" target="_blank">Abrir manual PDF</a>
        </article>
      </section>
      <section className="shell checksumCard">
        <div><span className="eyebrow">INTEGRIDADE</span><h3>SHA-256 do instalador</h3></div>
        <code>{installerMeta.sha256}</code>
      </section>
      <section className="shell betaWarning"><strong>Importante:</strong> esta é uma versão Beta. O Hotfix 1 corrige a instalação em PCs sem .NET 10 previamente instalado. A primeira instalação precisa de internet para preparar os componentes temporários. <Link href="/changelog">Veja as notas da versão.</Link></section>
    </main><Footer/></>
  );
}
