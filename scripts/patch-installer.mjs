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

const region = data.subarray(start, png);
if (region.includes(Buffer.from("dotnet-install.ps1")) && region.includes(Buffer.from("6.0.0-beta.1"))) {
  console.log("Installer Beta 1 já contém o hotfix de bootstrap .NET.");
  process.exit(0);
}

const ps = fs.readFileSync(psPath);
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
if (!afterRegion.includes(Buffer.from("6.0.0-beta.1"))) throw new Error("Marcador da versão Beta 1 ausente após o patch.");

const afterHash = crypto.createHash("sha256").update(patched.subarray(zipStart, zipEnd)).digest("hex");
if (beforeHash !== afterHash) throw new Error("O payload do Orton foi alterado durante o patch.");

fs.writeFileSync(exePath, patched);
console.log("Hotfix do instalador Beta 1 aplicado.");
console.log("SHA256:", crypto.createHash("sha256").update(patched).digest("hex"));
