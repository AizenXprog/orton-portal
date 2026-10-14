import { Footer, Header, PageTop } from "../components";
const phases=[
  ["Alpha","Concluída","Arquitetura, módulos, integração e fundação comercial."],
  ["Beta 1","Agora","Testes reais, correção de crashes, UX e compatibilidade."],
  ["Beta 2","Próxima","Correções vindas dos testers, desempenho e acabamento."],
  ["RC","Depois","Assinatura, updater real, licença e validação final."],
  ["Orton 6.0","Objetivo","Primeira versão estável para distribuição pública."],
];
export default function Roadmap(){return <><Header/><main><PageTop eyebrow="ROADMAP" title="Do Beta à versão estável" description="Agora o foco é reduzir risco. Novos módulos ficam congelados até o Orton 6.0."/><section className="shell roadmapList">{phases.map(([name,status,text],i)=><article className={`roadmapItem road-${i}`} key={name}><div className="roadNumber">0{i+1}</div><div><div className="roadTop"><h2>{name}</h2><span>{status}</span></div><p>{text}</p></div></article>)}</section></main><Footer/></>}
