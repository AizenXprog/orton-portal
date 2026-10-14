import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

const root = process.cwd();
const exePath = path.join(root, "public", "downloads", "Orton_Setup_6.0_Beta1.exe");
const psPath = path.join(root, "tools", "OrtonInstaller-Beta1-Hotfix.ps1");

if (!fs.existsSync(exePath)) throw new Error(`Installer não encontrado: ${exePath}`);
if (!fs.existsSync(psPath)) throw new Error(`Script de hotfix não encontrado: ${psPath}`);

const data = fs.readFileSync(exePath);
if (data[0] !== 0x4d || data[1] !== 0x5a) throw new Error("O instalador não é um PE válido.");

const start = data.indexOf(Buffer.from("param("));
const pngSig = Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]);
const png = data.indexOf(pngSig, start);
if (start < 0 || png < 0 || png <= start) throw new Error("Região PowerShell embutida não encontrada.");

let psText = fs.readFileSync(psPath, "utf8");

// Hotfix 2: no WPF, RowDefinitions deve ser declarada antes dos filhos visuais do Grid.
// O Hotfix 1 colocava dois Ellipse antes de Grid.RowDefinitions, causando:
// "A propriedade 'Children' já foi definida em 'Grid'."
const rowDefs = '<Grid.RowDefinitions><RowDefinition Height="48"/><RowDefinition Height="*"/></Grid.RowDefinitions>';
const rootNeedle = '<Grid>\n<Ellipse Width="430" Height="430" HorizontalAlignment="Right" VerticalAlignment="Top" Margin="0,-210,-170,0" IsHitTestVisible="False">';
if (!psText.includes(rootNeedle)) throw new Error("Estrutura raiz do XAML do instalador não encontrada.");
psText = psText.replace(
  rootNeedle,
  '<Grid>\n' + rowDefs + '\n<Ellipse Width="430" Height="430" HorizontalAlignment="Right" VerticalAlignment="Top" Margin="0,-210,-170,0" IsHitTestVisible="False">'
);
const duplicateNeedle = '</Ellipse>\n' + rowDefs + '\n<Border Grid.Row="0"';
if (!psText.includes(duplicateNeedle)) throw new Error("RowDefinitions antiga não encontrada para reposicionamento.");
psText = psText.replace(duplicateNeedle, '</Ellipse>\n<Border Grid.Row="0"');

psText = psText
  .replace("$ProductVersion='6.0.0-beta.1'", "$ProductVersion='6.0.0-beta.1-hotfix.2'")
  .replace("Orton 6 Beta 1 instalado e pronto para usar", "Orton 6 Beta 1 Hotfix 2 instalado e pronto para usar")
  .replace("Iniciando instalação do Orton 6 Beta 1.", "Iniciando instalação do Orton 6 Beta 1 Hotfix 2.");

const ps = Buffer.from(psText, "utf8");
const regionSize = png - start;
if (ps.length >= regionSize) throw new Error(`Script de hotfix excede a região embutida: ${ps.length} >= ${regionSize}`);

const zipStart = data.indexOf(Buffer.from([0x50,0x4b,0x03,0x04]), png);
const zipEndSig = data.indexOf(Buffer.from([0x50,0x4b,0x05,0x06]), zipStart);
if (zipStart < 0 || zipEndSig < 0) throw new Error("Payload ZIP embutido não encontrado.");
const zipEnd = zipEndSig + 22;
const beforeHash = crypto.createHash("sha256").update(data.subarray(zipStart, zipEnd)).digest("hex");

const patched = Buffer.from(data);
ps.copy(patched, start);
patched.fill(0x20, start + ps.length, png - 1);
patched[png - 1] = 0x00;

const afterRegion = patched.subarray(start, png);
if (!afterRegion.includes(Buffer.from("dotnet-install.ps1"))) throw new Error("Marcador do bootstrap .NET ausente após o patch.");
if (!afterRegion.includes(Buffer.from("6.0.0-beta.1-hotfix.2"))) throw new Error("Marcador do Hotfix 2 ausente após o patch.");
if (afterRegion.indexOf(Buffer.from(rowDefs)) > afterRegion.indexOf(Buffer.from('<Ellipse Width="430"'))) {
  throw new Error("RowDefinitions ainda está depois dos filhos visuais do Grid.");
}

const afterHash = crypto.createHash("sha256").update(patched.subarray(zipStart, zipEnd)).digest("hex");
if (beforeHash !== afterHash) throw new Error("O payload do Orton foi alterado durante o patch.");

fs.writeFileSync(exePath, patched);
const finalSha = crypto.createHash("sha256").update(patched).digest("hex");
const metaPath = path.join(root, "app", "installer-meta.json");
fs.writeFileSync(metaPath, JSON.stringify({
  version: "6.0.0-beta.1-hotfix.2",
  label: "Beta 1 · Hotfix 2",
  sha256: finalSha,
  sizeBytes: patched.length,
  requiresPreinstalledDotnet: false,
  requiresInternetDuringInstall: true
}, null, 2) + "\n");

console.log("Hotfix 2 do instalador Beta 1 aplicado e validado.");
console.log("SHA256:", finalSha);
