import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lng = req.nextUrl.searchParams.get("lng");

  if (!lat || !lng) {
    return new NextResponse("Missing lat/lng", { status: 400 });
  }

  const apiKey =
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return new NextResponse("API key not configured", { status: 500 });
  }

  const url =
    `https://maps.googleapis.com/maps/api/streetview` +
    `?size=400x250&location=${lat},${lng}&fov=90&pitch=5&key=${apiKey}`;

  const res = await fetch(url, {
    next: { revalidate: 86400 }, // cache 24h no servidor
  });

  if (!res.ok) {
    return new NextResponse("Street View fetch failed", { status: res.status });
  }

  const buffer = await res.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
