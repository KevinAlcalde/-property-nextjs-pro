import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getDb } from '@/lib/db';
import {
  getPriceRange, getProjection, marketData, getBarrioFactor,
  type ZoneName, type PropertyKind,
} from '@/app/data/marketData';

const modicaProperties = [
  { title: 'Casa Martín Zapata 458', address: 'Capital', zone: 'Capital' as ZoneName, type: 'Casa', operation: 'Venta', currency: 'USD', price: 180000, m2Cubiertos: 180, m2Total: 280 },
  { title: 'Casa Santa María de Oro', address: 'Capital', zone: 'Capital' as ZoneName, type: 'Casa', operation: 'Venta', currency: 'USD', price: 220000, m2Cubiertos: 220, m2Total: 350 },
  { title: 'Departamento Ayacucho 380', address: 'Capital', zone: 'Capital' as ZoneName, type: 'Departamento', operation: 'Venta', currency: 'USD', price: 85000, m2Cubiertos: 75 },
  { title: 'Departamento Colón y Chile', address: 'Capital', zone: 'Capital' as ZoneName, type: 'Departamento', operation: 'Venta', currency: 'USD', price: 72000, m2Cubiertos: 55 },
  { title: 'Pasaje Las Glicinas', address: 'Capital', zone: 'Capital' as ZoneName, type: 'Departamento', operation: 'Venta', currency: 'USD', price: 95000, m2Cubiertos: 90 },
  { title: 'Casa Barrio ATSA', address: 'Godoy Cruz', zone: 'Godoy Cruz' as ZoneName, type: 'Casa', operation: 'Venta', currency: 'USD', price: 145000, m2Cubiertos: 160, m2Total: 260 },
  { title: 'Casa Barrio Bombal', address: 'Godoy Cruz', zone: 'Godoy Cruz' as ZoneName, type: 'Casa', operation: 'Venta', currency: 'USD', price: 140000, m2Cubiertos: 200 },
  { title: 'Torres El Marqués', address: 'Godoy Cruz', zone: 'Godoy Cruz' as ZoneName, type: 'Departamento', operation: 'Venta', currency: 'USD', price: 92000, m2Cubiertos: 85 },
  { title: 'Casa Barrio La Barraca', address: 'Guaymallén', zone: 'Guaymallén' as ZoneName, type: 'Casa', operation: 'Venta', currency: 'USD', price: 110000, m2Cubiertos: 155, m2Total: 240 },
  { title: 'Casa Complejo Los Guindos', address: 'Guaymallén', zone: 'Guaymallén' as ZoneName, type: 'Casa', operation: 'Venta', currency: 'USD', price: 142000, m2Cubiertos: 170 },
  { title: 'Dúplex Elpidio González 2150', address: 'Guaymallén', zone: 'Guaymallén' as ZoneName, type: 'Dúplex', operation: 'Venta', currency: 'USD', price: 118000, m2Cubiertos: 130 },
  { title: 'Casa Prestigie B Sur Mer', address: 'Las Heras', zone: 'Las Heras' as ZoneName, type: 'Casa', operation: 'Venta', currency: 'USD', price: 185000, m2Cubiertos: 230, m2Total: 400 },
  { title: 'Casa Lomas de Terrada', address: 'Luján de Cuyo', zone: 'Luján de Cuyo' as ZoneName, type: 'Casa', operation: 'Venta', currency: 'USD', price: 195000, m2Cubiertos: 250, m2Total: 450 },
  { title: 'Casa Terruños de Araoz', address: 'Luján de Cuyo', zone: 'Luján de Cuyo' as ZoneName, type: 'Casa', operation: 'Venta', currency: 'USD', price: 155000, m2Cubiertos: 180, m2Total: 320 },
  { title: 'Casa Tierras Altas Terrada', address: 'Luján de Cuyo', zone: 'Luján de Cuyo' as ZoneName, type: 'Casa', operation: 'Venta', currency: 'USD', price: 210000, m2Cubiertos: 280, m2Total: 500 },
  { title: 'PH Vista Oliva 115', address: 'Maipú', zone: 'Maipú' as ZoneName, type: 'PH', operation: 'Venta', currency: 'USD', price: 132000, m2Cubiertos: 155 },
  { title: 'Casa Pinar del Sol 3', address: 'Maipú', zone: 'Maipú' as ZoneName, type: 'Casa', operation: 'Venta', currency: 'USD', price: 118000, m2Cubiertos: 160, m2Total: 280 },
  { title: 'Casa Barrio Quintas', address: 'El Challao', zone: 'El Challao' as ZoneName, type: 'Casa', operation: 'Venta', currency: 'USD', price: 88000, m2Cubiertos: 145, m2Total: 500 },
  { title: 'Casa Nuevas Quintas El Challao', address: 'El Challao', zone: 'El Challao' as ZoneName, type: 'Casa', operation: 'Venta', currency: 'USD', price: 95000, m2Cubiertos: 155, m2Total: 600 },
  { title: 'Casa Altos la Consulta', address: 'San Carlos', zone: 'San Carlos' as ZoneName, type: 'Casa', operation: 'Venta', currency: 'USD', price: 235000, m2Cubiertos: 260, m2Total: 520 },
  { title: 'Lote Barrio Privado Palmares', address: 'Godoy Cruz', zone: 'Godoy Cruz' as ZoneName, type: 'Lote', operation: 'Venta', currency: 'USD', price: 65000, m2Total: 600 },
  { title: 'Lote Callejón Astorga', address: 'Guaymallén', zone: 'Guaymallén' as ZoneName, type: 'Lote', operation: 'Venta', currency: 'USD', price: 38000, m2Total: 500 },
  { title: 'Lote La Bastilla', address: 'Las Heras', zone: 'Las Heras' as ZoneName, type: 'Lote', operation: 'Venta', currency: 'USD', price: 45000, m2Total: 600 },
  { title: 'Lote Barrio La Quebrada', address: 'Luján de Cuyo', zone: 'Luján de Cuyo' as ZoneName, type: 'Lote', operation: 'Venta', currency: 'USD', price: 75000, m2Total: 900 },
  { title: 'Finca Julio A. Roca', address: 'Maipú', zone: 'Maipú' as ZoneName, type: 'Finca', operation: 'Venta', currency: 'USD', price: 320000, m2Total: 15000 },
  { title: 'Finca Talavera', address: 'San Martín', zone: 'San Martín' as ZoneName, type: 'Finca', operation: 'Venta', currency: 'USD', price: 480000, m2Total: 80000 },
  { title: 'Finca 14 Has Santa Rosa', address: 'Santa Rosa', zone: 'Santa Rosa' as ZoneName, type: 'Finca', operation: 'Venta', currency: 'USD', price: 280000, m2Total: 140000 },
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const nombre      = formData.get('nombre') as string;
    const email       = formData.get('email') as string;
    const telefono    = formData.get('telefono') as string;
    const tipo        = formData.get('tipo') as PropertyKind;
    const zona        = formData.get('zona') as ZoneName;
    const direccion   = formData.get('direccion') as string || '';
    const barrio      = formData.get('barrio') as string || '';
    const lat         = parseFloat(formData.get('lat') as string) || 0;
    const lon         = parseFloat(formData.get('lon') as string) || 0;
    const m2Total     = parseFloat(formData.get('m2Total') as string) || 0;
    const m2Cubiertos = parseFloat(formData.get('m2Cubiertos') as string) || 0;
    const habitaciones = parseInt(formData.get('habitaciones') as string) || 0;
    const banos       = parseInt(formData.get('banos') as string) || 0;
    const garage      = formData.get('garage') === 'true';
    const antiguedad  = parseInt(formData.get('antiguedad') as string) || 0;
    const estado      = formData.get('estado') as string;

    const barrioInfo = getBarrioFactor(zona, `${barrio} ${direccion}`);

    // Upload photos to Vercel Blob
    const fotoUrls: string[] = [];
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const fotoFiles = formData.getAll('fotos') as File[];
      if (fotoFiles.length > 0) {
        const timestamp = Date.now();
        for (let i = 0; i < fotoFiles.length; i++) {
          const file = fotoFiles[i];
          if (!file || file.size === 0) continue;
          const ext = file.name.split('.').pop() || 'jpg';
          const { url } = await put(`tasaciones/${timestamp}/${i + 1}.${ext}`, file, {
            access: 'public',
            contentType: file.type,
          });
          fotoUrls.push(url);
        }
      }
    }

    const basePriceRange = getPriceRange(zona, tipo, m2Cubiertos, m2Total, antiguedad, estado, garage);
    const priceRange = {
      min: Math.round(basePriceRange.min * barrioInfo.factor),
      avg: Math.round(basePriceRange.avg * barrioInfo.factor),
      max: Math.round(basePriceRange.max * barrioInfo.factor),
      precioPorM2: Math.round(basePriceRange.precioPorM2 * barrioInfo.factor),
    };

    const projection = getProjection(priceRange.avg, zona);

    const comparables = modicaProperties
      .filter(p =>
        p.zone === zona &&
        p.operation === 'Venta' &&
        p.currency === 'USD' &&
        (tipo === 'Lote' ? p.type === 'Lote' : p.type !== 'Lote')
      )
      .sort((a, b) => Math.abs(a.price - priceRange.avg) - Math.abs(b.price - priceRange.avg))
      .slice(0, 6)
      .map(p => ({
        titulo: p.title,
        direccion: p.address,
        precio: p.price,
        m2: (p as any).m2Cubiertos || (p as any).m2Total || 0,
        precioPorM2: (p as any).m2Cubiertos ? Math.round(p.price / (p as any).m2Cubiertos) : 0,
        tipo: p.type,
      }));

    // Save to Neon if DATABASE_URL is set
    if (process.env.DATABASE_URL) {
      try {
        const sql = getDb();
        await sql`
          INSERT INTO tasaciones (
            nombre, email, telefono, tipo, zona,
            m2_total, m2_cubiertos, habitaciones, banos, garage,
            antiguedad, estado, fotos,
            valor_estimado_min, valor_estimado, valor_estimado_max
          ) VALUES (
            ${nombre}, ${email}, ${telefono}, ${tipo}, ${zona},
            ${m2Total}, ${m2Cubiertos}, ${habitaciones}, ${banos}, ${garage},
            ${antiguedad}, ${estado}, ${fotoUrls},
            ${priceRange.min}, ${priceRange.avg}, ${priceRange.max}
          )
        `;
      } catch (dbErr) {
        console.error('DB insert error (non-fatal):', dbErr);
      }
    }

    const zoneInfo = marketData[zona];
    const mapsLink = lat && lon
      ? `https://www.google.com/maps?q=${lat},${lon}`
      : `https://www.google.com/maps/search/${encodeURIComponent(direccion + ', Mendoza, Argentina')}`;

    return NextResponse.json({
      ok: true,
      resultado: {
        priceRange,
        projection,
        comparables,
        barrioInfo,
        direccion,
        mapsLink,
        lat,
        lon,
        zoneInfo: {
          demanda: zoneInfo.demanda,
          descripcion: zoneInfo.descripcion,
          crecimientoAnual: zoneInfo.crecimientoAnual,
        },
        fotos: fotoUrls,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Error en tasación:', msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
