import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) return NextResponse.json({ ok: true });

    const body = await request.json();
    const { pagina, referrer, userAgent } = body;

    const ua = userAgent || '';
    let dispositivo = 'Desktop';
    if (/Mobile|Android|iPhone|iPad/.test(ua)) {
      dispositivo = /iPad/.test(ua) ? 'Tablet' : 'Mobile';
    }

    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'desconocida';

    let pais = 'Argentina';
    let ciudad = 'Mendoza';
    try {
      if (ip !== 'desconocida' && ip !== '::1' && !ip.startsWith('127.')) {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=country,city&lang=es`, {
          signal: AbortSignal.timeout(2000),
        });
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (geo.country) pais = geo.country;
          if (geo.city) ciudad = geo.city;
        }
      }
    } catch {
      // fallback to defaults
    }

    const sql = getDb();
    await sql`
      INSERT INTO visitas (pagina, referrer, dispositivo, pais, ciudad, ip, user_agent)
      VALUES (${pagina || '/'}, ${referrer || null}, ${dispositivo}, ${pais}, ${ciudad}, ${ip}, ${ua.slice(0, 300)})
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error registrando visita:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
