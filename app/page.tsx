import Link from "next/link";
import { Footer, Header, ModuleIcon, type IconName } from "./components";

const modules: { name: string; icon: IconName; text: string; meta: string }[] = [
  { name: "Organizador", icon: "organizer", text: "Analise, revise e organize arquivos com um fluxo controlado.", meta: "Análise · Revisão · Plano" },
  { name: "Explorer", icon: "explorer", text: "Navegue e gerencie seus arquivos sem sair do ecossistema.", meta: "Navegação · Prévia · Ações" },
  { name: "Scanner", icon: "scanner", text: "Digitalize páginas, gere um único PDF e siga direto ao Organizador.", meta: "Digitalizar · PDF · Enviar" },
  { name: "Studio", icon: "studio", text: "Preview, PDF, renomeação e versões em uma bancada única.", meta: "Preview · PDF · Rename" },
  { name: "Command", icon: "command", text: "Encontre ações e recursos sem atravessar várias telas.", meta: "Ações · Atalhos · Produtividade" },
  { name: "Search", icon: "search", text: "Busca local por nome, caminho, tipo, metadados e conteúdo compatível.", meta: "Indexação · Filtros · Conteúdo" },
  { name: "Flow", icon: "flow", text: "Monte automações visuais com blocos livres e conexões inteligentes.", meta: "Canvas · Conexões · Automação" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero shell" data-reveal>
          <div className="heroCopy">
            <div className="statusPill"><span className="statusDot" /> Orton 6 · Beta 1</div>
            <h1>Seus arquivos.<br/><span>Um fluxo só.</span></h1>
            <p>Organize, encontre, digitalize, edite e automatize tarefas em um ambiente modular pensado para trabalhar sem interromper o contexto.</p>
            <div className="heroActions">
              <Link className="button primary" href="/download">Baixar Beta 1</Link>
              <Link className="button secondary" href="/docs">Conhecer o Orton</Link>
            </div>
            <div className="heroMeta"><span>Windows</span><span>7 módulos</span><span>Beta público</span></div>
          </div>
          <div className="heroVisual" aria-label="Ecossistema de módulos do Orton">
            <div className="orb orbA" /><div className="orb orbB" />
            <div className="glassWindow floatingWindow">
              <div className="windowBar"><span/><span/><span/><b>ORTON</b></div>
              <div className="miniGrid">
                {modules.map((m) => <div className="miniModule" key={m.name}><ModuleIcon name={m.icon}/><span>{m.name}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section shell" id="modules" data-reveal>
          <div className="sectionHead">
            <div><span className="eyebrow">ECOSSISTEMA</span><h2>Um módulo para cada momento.</h2></div>
            <p>O arquivo continua o mesmo. Você só muda a ferramenta.</p>
          </div>
          <div className="moduleGrid">
            {modules.map((m, i) => (
              <article className={`moduleCard moduleCard-${i+1}`} key={m.name} data-reveal style={{transitionDelay:`${Math.min(i,5)*55}ms`}}>
                <ModuleIcon name={m.icon}/>
                <h3>{m.name}</h3>
                <p>{m.text}</p>
                <span className="moduleMeta">{m.meta}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section flowShowcase" data-reveal>
          <div className="shell flowShowcaseGrid">
            <div className="flowPitch">
              <span className="eyebrow">ORTON FLOW</span>
              <h2>Automação que você consegue enxergar.</h2>
              <p>Monte processos com blocos livres no canvas. Conecte, desconecte, deixe ideias de fora e reorganize tudo sem perder a lógica.</p>
              <Link className="button secondary" href="/flow">Explorar o Flow →</Link>
            </div>
            <div className="flowMiniCanvas" aria-label="Prévia visual do Flow">
              <svg className="flowWireSvg" viewBox="0 0 680 360" preserveAspectRatio="none" aria-hidden="true">
                <path className="wire wireBase" d="M140 100 C245 80, 240 175, 340 176 S460 112, 548 126" />
                <path className="wire wireGlow" d="M140 100 C245 80, 240 175, 340 176 S460 112, 548 126" />
                <path className="wire wireBase" d="M340 176 C365 262, 475 280, 550 260" />
                <path className="wire wireGlow wireGlowDelay" d="M340 176 C365 262, 475 280, 550 260" />
              </svg>
              <div className="flowNode nodeTrigger"><span>GATILHO</span><strong>Nova entrada</strong><small>Downloads</small></div>
              <div className="flowNode nodeFilter"><span>FILTRO</span><strong>Somente PDF</strong><small>*.pdf</small></div>
              <div className="flowNode nodeAction"><span>AÇÃO</span><strong>Organizar</strong><small>Aplicar regra</small></div>
              <div className="flowNode nodeLoose"><span>RASCUNHO</span><strong>Renomear</strong><small>fora do fluxo</small></div>
            </div>
          </div>
        </section>

        <section className="section shell workflowSection" data-reveal>
          <div className="workflowCopy">
            <span className="eyebrow">CONTINUIDADE</span>
            <h2>Encontre. Trabalhe. Organize.</h2>
            <p>Os módulos compartilham contexto e preferem trabalhar com o caminho original do arquivo. Menos cópias, menos atrito.</p>
          </div>
          <div className="workflowLine">
            {[["01","Search"],["02","Studio"],["03","Organizador"],["04","Flow"]].map(([n,t], i) => (
              <div className="flowStep" key={t}><span>{n}</span><strong>{t}</strong>{i < 3 && <i>→</i>}</div>
            ))}
          </div>
        </section>

        <section className="section shell creatorPanel" data-reveal>
          <div className="creatorMark"><span>VMV</span></div>
          <div className="creatorCopy">
            <span className="eyebrow">DESENVOLVIMENTO</span>
            <h2>Desenvolvido por Vitor Monte Vaz.</h2>
            <p>O Orton é um projeto independente criado e desenvolvido por Vitor Monte Vaz.</p>
          </div>
          <a className="button secondary creatorButton" href="https://www.instagram.com/mnttez/" target="_blank" rel="noreferrer">Instagram · @mnttez ↗</a>
        </section>

        <section className="section shell betaPanel" data-reveal>
          <div>
            <span className="eyebrow">BETA 1</span>
            <h2>Ajude a construir o Orton 6.</h2>
            <p>A Beta 1 é uma versão de testes. Use, explore e reporte qualquer comportamento estranho antes da versão estável.</p>
          </div>
          <div className="betaActions">
            <Link className="button primary" href="/download">Baixar agora</Link>
            <Link className="textLink" href="/changelog">Ver o que mudou →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
