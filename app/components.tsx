import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="Orton — início">
      <span className="brandLogoWrap" aria-hidden="true">
        <Image
          className="brandLogo"
          src="/orton-logo.png"
          alt=""
          width={36}
          height={36}
          priority
        />
      </span>
      <span>Orton</span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="siteHeader">
      <div className="navWrap">
        <Logo />
        <nav className="navLinks" aria-label="Navegação principal">
          <Link href="/#modules">Módulos</Link>
          <Link href="/flow">Flow</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/changelog">Changelog</Link>
          <Link href="/roadmap">Roadmap</Link>
        </nav>
        <Link className="navDownload" href="/download">Baixar Beta</Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <Logo />
        <p>Desenvolvido por <strong>Vitor Monte Vaz</strong>.</p>
        <a className="creatorSocial" href="https://www.instagram.com/mnttez/" target="_blank" rel="noreferrer">@mnttez no Instagram ↗</a>
      </div>
      <div className="footerLinks">
        <Link href="/download">Download</Link>
        <Link href="/flow">Flow</Link>
        <Link href="/docs">Documentação</Link>
        <Link href="/changelog">Changelog</Link>
        <Link href="/roadmap">Roadmap</Link>
      </div>
    </footer>
  );
}

export type IconName = "organizer" | "explorer" | "scanner" | "studio" | "command" | "search" | "flow";

export function ModuleIcon({ name }: { name: IconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const icon = {
    organizer: <><rect x="6" y="5" width="12" height="4" rx="1.5" {...common}/><rect x="6" y="10" width="12" height="4" rx="1.5" {...common}/><rect x="6" y="15" width="12" height="4" rx="1.5" {...common}/></>,
    explorer: <><path d="M4.5 8.5h5l1.8-2h8.2v11H4.5z" {...common}/><path d="M4.5 10.5h15" {...common}/></>,
    scanner: <><rect x="6" y="4.5" width="12" height="6.5" rx="1.3" {...common}/><rect x="4.5" y="11" width="15" height="7.5" rx="2" {...common}/><path d="M8 15.5h8" {...common}/></>,
    studio: <><circle cx="12" cy="12" r="6.5" {...common}/><path d="M12 7.7v8.6M7.7 12h8.6" {...common}/><path d="M8.8 8.8l6.4 6.4M15.2 8.8l-6.4 6.4" {...common}/></>,
    command: <><path d="M6.5 8.5l4 3.5-4 3.5" {...common}/><path d="M12.5 15.5h5" {...common}/></>,
    search: <><circle cx="10.5" cy="10.5" r="5.2" {...common}/><path d="M14.4 14.4l4.2 4.2" {...common}/></>,
    flow: <><circle cx="6.5" cy="7" r="2" {...common}/><circle cx="17.5" cy="7" r="2" {...common}/><circle cx="12" cy="17" r="2" {...common}/><path d="M8.5 7h7M7.5 8.7l3.5 6.3M16.5 8.7L13 15" {...common}/></>,
  }[name];
  return <span className={`moduleIcon icon-${name}`}><svg viewBox="0 0 24 24" aria-hidden="true">{icon}</svg></span>;
}

export function PageTop({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="pageTop shell">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
