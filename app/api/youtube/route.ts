import { NextResponse } from "next/server";

export const revalidate = 3600; // revalida a cada 1 hora

type VideoItem = {
  videoId: string;
  title: string;
  publishedAt: string;
  thumb: string;
};

function decodeXml(str: string) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function resolveChannelId(handle: string): Promise<string | null> {
  try {
    const res = await fetch(`https://www.youtube.com/@${handle}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 86400 }, // canal muda raramente — cache 24h
    });
    const html = await res.text();
    const match = html.match(/"channelId":"(UC[^"]+)"/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const channelId =
    process.env.YOUTUBE_CHANNEL_ID ||
    (await resolveChannelId("assembleiadedeusmissao-jar3253"));

  if (!channelId) {
    return NextResponse.json({ videos: [] });
  }

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      return NextResponse.json({ videos: [] });
    }

    const xml = await res.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

    const videos: VideoItem[] = entries.slice(0, 8).map((match) => {
      const entry = match[1];
      const videoId =
        (entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/) ?? [])[1] ?? "";
      const title =
        (entry.match(/<media:title[^>]*>(.*?)<\/media:title>/) ?? [])[1] ??
        (entry.match(/<title>(.*?)<\/title>/) ?? [])[1] ??
        "";
      const publishedAt =
        (entry.match(/<published>(.*?)<\/published>/) ?? [])[1] ?? "";

      return {
        videoId,
        title: decodeXml(title),
        publishedAt,
        thumb: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      };
    });

    return NextResponse.json({ videos });
  } catch {
    return NextResponse.json({ videos: [] });
  }
}
