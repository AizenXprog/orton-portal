import Link from "next/link";
import { Footer, Header, ModuleIcon } from "../components";

const features = [
  ["Canvas livre", "Posicione cada bloco onde quiser. A posição visual não limita a lógica do fluxo."],
  ["Conexões inteligentes", "Conecte e desconecte etapas para definir claramente o que vem antes e depois."],
  ["Blocos fora do fluxo", "Mantenha ideias e ações soltas no canvas sem executá-las por acidente."],
  ["Validação visual", "Quando a cadeia está coerente, os fios ganham vida com um pulso de LED/neon."],
  ["Tema sincronizado", "Canvas, blocos, fios, conectores e glow acompanham o tema escolhido no Orton."],
  ["Sem cópias inúteis", "As automações priorizam trabalhar com o arquivo original e o caminho existente."],
];

export default function FlowPage() {
  return (
    <>
      <Header />
      <main>
        <section className="flowHero shell" data-reveal>
          <div className="flowHeroCopy">
            <div className="flowTitleIcon"><ModuleIcon name="flow" /></div>
            <span className="eyebrow">ORTON FLOW</span>
            <h1>Construa o processo.<br/><span>Veja ele acontecer.</span></h1>
            <p>Um editor visual para automações locais. Sem linhas rígidas, sem ordem escondida e sem transformar lógica em uma tela técnica.</p>
            <div className="heroActions">
              <Link className="button primary" href="/download">Baixar Orton</Link>
              <Link className="button secondary" href="/#modules">Ver outros módulos</Link>
            </div>
          </div>
          <div className="flowHeroCanvas">
            <svg className="flowWireSvg full" viewBox="0 0 820 580" preserveAspectRatio="none" aria-hidden="true">
              <path className="wire wireBase" d="M145 120 C260 88, 280 200, 405 198 S560 105, 680 146"/>
              <path className="wire wireGlow" d="M145 120 C260 88, 280 200, 405 198 S560 105, 680 146"/>
              <path className="wire wireBase" d="M405 198 C420 334, 565 370, 672 332"/>
              <path className="wire wireGlow wireGlowDelay" d="M405 198 C420 334, 565 370, 672 332"/>
            </svg>
            <div className="flowNode flowNodeLg flowLg1"><span>GATILHO</span><strong>Arquivo recebido</strong><small>Downloads</small></div>
            <div className="flowNode flowNodeLg flowLg2"><span>FILTRO</span><strong>É um PDF?</strong><small>*.pdf</small></div>
            <div className="flowNode flowNodeLg flowLg3"><span>AÇÃO</span><strong>Renomear</strong><small>Padrão do projeto</small></div>
            <div className="flowNode flowNodeLg flowLg4"><span>DESTINO</span><strong>Organizador</strong><small>Continuar fluxo</small></div>
            <div className="flowNode flowNodeLg flowLgLoose"><span>RASCUNHO</span><strong>Comprimir</strong><small>fora da cadeia</small></div>
          </div>
        </section>

        <section className="section shell" data-reveal>
          <div className="sectionHead">
            <div><span className="eyebrow">LIBERDADE VISUAL</span><h2>Você decide a forma do fluxo.</h2></div>
            <p>O canvas é um espaço de trabalho, não uma fila obrigatória.</p>
          </div>
          <div className="flowFeatureGrid">
            {features.map(([title, text], i) => (
              <article className="flowFeature" key={title} data-reveal style={{transitionDelay:`${i*55}ms`}}>
                <span>{String(i+1).padStart(2,"0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell flowSequence" data-reveal>
          <div className="sequenceIntro">
            <span className="eyebrow">EXEMPLO</span>
            <h2>Do arquivo novo ao destino final.</h2>
            <p>Uma automação pode começar simples e crescer conforme a rotina exigir.</p>
          </div>
          <div className="sequenceTrack">
            {[
              ["01", "Detectar", "Arquivo aparece em uma pasta monitorada."],
              ["02", "Filtrar", "O Flow valida tipo, nome ou outra condição."],
              ["03", "Agir", "Renomeia, organiza ou encaminha o arquivo."],
              ["04", "Finalizar", "O arquivo chega ao módulo ou destino certo."],
            ].map(([n,t,d]) => <div className="sequenceCard" key={n}><span>{n}</span><strong>{t}</strong><p>{d}</p></div>)}
          </div>
        </section>

        <section className="section shell flowCta" data-reveal>
          <span className="eyebrow">BETA 1</span>
          <h2>O Flow já faz parte do Orton.</h2>
          <p>Baixe a Beta e experimente o editor visual junto aos outros módulos.</p>
          <Link className="button primary" href="/download">Baixar Orton 6 Beta 1</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
