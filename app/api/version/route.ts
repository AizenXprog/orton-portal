import { NextRequest, NextResponse } from "next/server";

const SHA256 = "f232e3681a385dcfbc49eb8e194c8e1cb28a8de14fd0e22d9119f45839ad4741";

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  return NextResponse.json({
    product: "Orton 6",
    channel: "beta",
    version: "6.0.0-beta.1",
    display_version: "Beta 1",
    published_at: "2026-10-14",
    download_url: `${origin}/downloads/Orton_Setup_6.0_Beta1.exe`,
    sha256: SHA256,
    release_notes_url: `${origin}/changelog`,
    minimum_os: "Windows 10/11 x64"
  }, { headers: { "Cache-Control": "public, max-age=300, s-maxage=300" } });
}
