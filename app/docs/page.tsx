import { Footer, Header, ModuleIcon, PageTop, type IconName } from "../components";

const docs: { icon: IconName; name: string; text: string }[] = [
  {icon:"organizer",name:"Organizador",text:"Analise os arquivos, revise o plano e defina o destino antes de aplicar a organização."},
  {icon:"explorer",name:"Explorer",text:"Navegue, renomeie, mova, copie e encaminhe arquivos aos outros módulos."},
  {icon:"scanner",name:"Scanner",text:"Digitalize páginas em sequência e finalize tudo em um único PDF."},
  {icon:"studio",name:"Studio",text:"Use preview e ferramentas contextuais para PDF, renomeação e versões."},
  {icon:"command",name:"Command",text:"Acesse ações e recursos rapidamente por uma central de comandos."},
  {icon:"search",name:"Search",text:"Localize arquivos por nome, pasta, tipo, metadados e conteúdo compatível."},
  {icon:"flow",name:"Flow",text:"Monte rotinas visuais com caixas livres, conexões e automações."},
];
export default function DocsPage(){return <><Header/><main><PageTop eyebrow="DOCS" title="Conheça o Orton" description="O suficiente para começar sem transformar a documentação em uma parede de texto."/><section className="shell docsGrid">{docs.map(d=><article className="docCard" key={d.name}><ModuleIcon name={d.icon}/><div><h2>{d.name}</h2><p>{d.text}</p></div></article>)}</section><section className="shell shortcutCard"><div><span className="eyebrow">ATALHO GLOBAL</span><h2>Alt + Espaço</h2></div><p>Com o Orton em execução, o atalho alterna entre ocultar e restaurar a janela ativa, preservando o módulo e o contexto.</p></section><section className="shell docsManual"><div><span className="eyebrow">GUIA</span><h2>Prefere PDF?</h2><p>Abra o manual compacto para uma visão resumida do ecossistema.</p></div><a className="button secondary" href="/docs/Orton_Manual_Compacto.pdf" target="_blank">Abrir manual</a></section></main><Footer/></>}
