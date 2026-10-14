# ORTON_CONTEXT.md

> Fonte de verdade resumida do projeto Orton.
> Leia este arquivo antes de propor mudanças, alterar arquitetura, UI, instalador, portal, versões ou distribuição.
> Atualize este arquivo sempre que uma decisão importante mudar.

## 1. Identidade do projeto

**Produto:** Orton  
**Autor:** Vitor Monte Vaz  
**Assinatura pública:** Desenvolvido por Vitor Monte Vaz  
**Instagram principal / suporte:** https://www.instagram.com/mnttez/  
**Portal:** https://orton-portal.vercel.app  
**Repositório do portal:** AizenXprog/orton-portal

O Orton é um software Windows modular voltado para organização, manipulação, busca, digitalização e automação de arquivos e rotinas locais.

## 2. Stack atual do software

A base principal do Orton deve seguir:

- C# / .NET 10
- Avalonia 12
- Skia
- arquitetura separada entre UI, Core e Infrastructure
- `Orton.Core` e `Orton.Infrastructure` não devem depender da interface
- WinUI existe apenas como legado/referência e não é a direção principal atual

Não voltar a tratar WPF, WinUI ou PowerShell como arquitetura principal do produto.

## 3. Direção visual

Direção aprovada:

- premium
- minimalista
- Apple-inspired
- silenciosa
- menos texto
- animações suaves e naturais
- blur, iluminação e movimento com moderação
- sem aparência padrão Windows/Fluent
- sem slogans motivacionais
- sem excesso de controles visuais
- responsividade real

### Importante

A tentativa **Alpha 4.14 Preview 1 Liquid Glass** foi rejeitada.

Não usar esse redesign como referência aprovada.

A base visual deve evoluir incrementalmente a partir das versões consolidadas posteriores.

## 4. Módulos atuais

O Orton possui 7 módulos:

1. **Organizador**
   - análise
   - revisão
   - plano
   - organização de arquivos

2. **Explorer**
   - explorador próprio de arquivos
   - navegar por discos e pastas
   - busca
   - renomear
   - mover
   - copiar
   - excluir
   - criar pastas
   - propriedades
   - seleção múltipla
   - enviar arquivos para outros módulos por caminho/referência

3. **Scanner**
   - digitalizar páginas
   - gerar um único PDF
   - salvar ou enviar ao Organizador

4. **Studio**
   - Preview
   - PDF
   - Rename
   - Backup/versionamento

5. **Command**
   - produtividade
   - ações rápidas
   - acesso rápido a funções

6. **Search**
   - indexação local
   - busca por nome, caminho, tipo, metadados e conteúdo compatível

7. **Flow**
   - automação visual
   - canvas livre
   - blocos conectáveis
   - lógica determinada por conexões, não pela posição visual

## 5. Regras importantes por módulo

### Scanner

Fluxo correto:

**Digitalizar → transformar em 1 PDF → Salvar PDF OU enviar para Organizador**

Regras:

- um documento = um arquivo final
- não criar cópias inúteis
- ao enviar para Organizador, preferir referência pelo caminho do mesmo PDF
- arquivos temporários devem ser removidos após finalização
- não usar fluxo redundante de “Finalizar lote”

### Explorer

- deve ser módulo independente
- também pode ser acessado de dentro do Organizador
- operações devem preferir trabalhar no arquivo original
- envio entre módulos deve ser por caminho/referência, não por cópia ou staging desnecessário

### Flow

Direção atual:

- canvas livre
- blocos podem ficar em qualquer posição
- ordem vem das conexões
- conectar e desconectar livremente
- blocos podem permanecer fora da cadeia
- fios curvos, soltos, não ortogonais rígidos
- fluxo válido pode ter pulso neon/LED
- canvas, fios, glow, blocos, conectores e grid devem acompanhar o tema do Orton
- no mobile do portal, exemplos de Flow devem ser apresentados como sequência vertical clara para evitar sobreposição

## 6. Atalho global

**Alt + Espaço**

Comportamento desejado enquanto o processo estiver rodando:

- visível → ocultar
- oculto/minimizado → restaurar exatamente a última janela, módulo e aba

Se o Orton estiver completamente encerrado, o atalho não funciona sem um processo residente/tray futuro.

## 7. Histórico de versões relevante

Linha principal recente:

- Alpha 4.13 Preview 3 — GlobalQuickAccessToggle
- Alpha 4.14 Consolidation
- Alpha 4.15 Integration Pass
- Alpha 4.16 Search & Index
- Alpha 4.17 Flow
- Alpha 4.18 Flow Canvas / Freeform / Theme Sync
- Alpha 4.19 Commercial Foundation / Search Stability Hotfix
- Alpha 4.20 Stability & Polish
- Alpha 4.21 Release Candidate Foundation
- fase Alpha encerrada
- **Orton 6 Beta 1**

Versão base pública atual:

**6.0.0-beta.1**

## 8. Instalação e distribuição

Regra definitiva para distribuição pública:

**Não compilar o Orton no PC do usuário.**

O fluxo correto deve ser:

**compilar → publicar self-contained → gerar instalador final → assinar digitalmente → publicar**

O usuário final não deve precisar instalar:

- .NET SDK
- Visual Studio
- ferramentas de build
- dependências de desenvolvimento

### Estado atual da Beta 1

A primeira Beta usou um instalador que preparava/publicava o Orton durante a instalação.

Isso causou problemas em PCs sem `dotnet.exe`.

Foram criados hotfixes temporários:

- Hotfix 1: prepara temporariamente o .NET 10 quando necessário e publica como self-contained
- Hotfix 2: corrige erro de XAML no instalador WPF

Esses hotfixes são paliativos.

A direção correta para próximas versões é distribuir **binário já pré-compilado e self-contained**.

## 9. Assinatura digital

Antes de uma versão Stable, o instalador deve ser assinado digitalmente.

Direção preferida:

- Microsoft Artifact Signing / Trusted Signing
- SHA-256
- timestamp
- não alterar o EXE depois da assinatura

Objetivo:

- evitar “Editor desconhecido”
- melhorar confiança do instalador
- construir reputação no SmartScreen

Assinatura digital não garante remoção imediata de todo aviso do SmartScreen.

## 10. Portal

Stack atual:

- Next.js
- GitHub
- Vercel
- sem banco de dados externo no momento

O portal possui:

- Home
- Download
- Flow
- Docs
- Changelog
- Roadmap
- `/api/version`

Direção visual:

- dark premium
- responsivo
- animações leves
- parallax discreto
- fundo com profundidade
- não usar preto chapado demais no mobile

O portal deve deixar claro:

**Desenvolvido por Vitor Monte Vaz**

Canal principal de dúvidas e bugs:

**Instagram @mnttez**

## 11. Atualizações do portal

O portal está conectado ao GitHub e à Vercel.

Fluxo:

**commit no GitHub → Vercel detecta → build → deploy automático**

Mudanças normais no portal podem ser feitas diretamente no repositório via integração GitHub.

## 12. Sistema de versões planejado

Cada versão pública deve conter:

- número da versão
- canal
- status
- changelog
- instalador correspondente
- SHA-256
- data
- notas de versão

Canais planejados:

- Stable
- Beta
- Legacy, quando necessário

Quando uma versão for considerada estável, atualizar:

- portal
- changelog
- página Download
- histórico de versões
- `/api/version`
- instalador correspondente

Preferir GitHub Releases para armazenar instaladores no futuro, em vez de manter muitos binários no código do portal.

## 13. Comercialização

Arquitetura comercial prevista:

- Free
- Pro

Durante Alpha/Beta:

**não bloquear recursos para testers.**

Estratégia possível no futuro:

- Free com recursos básicos
- Pro com recursos avançados de Organizador, Studio, Flow, Scanner e Search
- licença perpétua inicialmente
- assinatura apenas quando houver custo recorrente real de cloud/IA

## 14. Regras de produto

Evitar:

- duplicar arquivos sem necessidade
- telas cheias de texto
- navegação confusa
- funcionalidades escondidas
- aparência de “painel técnico”
- controles serrilhados ou sombras ruins
- mudanças de tamanho da janela ao trocar módulo
- elementos sem responsividade
- regressão de recursos de versões anteriores
- voltar para redesigns já rejeitados

Priorizar:

- continuidade
- clareza
- contexto
- fluidez
- segurança
- preservação dos arquivos originais
- arquitetura modular
- estabilidade antes de novas features

## 15. Regra para novos chats

Ao iniciar um novo chat sobre Orton:

1. ler este arquivo;
2. verificar a versão atual;
3. verificar decisões recentes do projeto;
4. não assumir que designs antigos ainda são válidos;
5. não afirmar que uma build Windows foi compilada/testada se isso não aconteceu de fato;
6. preservar decisões aprovadas;
7. atualizar este arquivo quando uma decisão estrutural mudar.

## 16. Estado de validação

O ambiente usado pelo assistente pode não ter o SDK Windows/.NET necessário para compilar o Orton localmente.

Portanto:

- validação estrutural não equivale a build real
- nunca afirmar que “compilou com sucesso” sem build real
- validar XAML, estrutura e arquivos quando possível
- testes finais de Windows devem ser feitos em ambiente Windows real

---

Última atualização deste contexto: 14/10/2026
