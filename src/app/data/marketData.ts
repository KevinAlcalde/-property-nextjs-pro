// Datos de mercado inmobiliario Mendoza 2025
// Precio en USD/m2 cubierto para venta
// Fuente: Zonaprop, Argenprop, MercadoLibre Inmuebles (curado manualmente)

export type ZoneName =
  | 'Capital'
  | 'Godoy Cruz'
  | 'Guaymallén'
  | 'Las Heras'
  | 'Luján de Cuyo'
  | 'Maipú'
  | 'El Challao'
  | 'San Carlos'
  | 'San Martín'
  | 'Santa Rosa'
  | 'Junín'
  | 'San Rafael'
  | 'Tunuyán';

export type PropertyKind = 'Casa' | 'Departamento' | 'Dúplex' | 'PH' | 'Lote' | 'Finca' | 'Cochera' | 'Hotel';

interface ZoneMarket {
  // USD/m2 cubierto para casas/dúplex/PH
  casa: { min: number; avg: number; max: number };
  // USD/m2 cubierto para departamentos
  dpto: { min: number; avg: number; max: number };
  // USD/m2 para lotes (terreno total)
  lote: { min: number; avg: number; max: number };
  // Demanda: 'alta' | 'media' | 'baja'
  demanda: 'alta' | 'media' | 'baja';
  // Descripción de la zona
  descripcion: string;
  // % crecimiento anual proyectado
  crecimientoAnual: number;
}

export const marketData: Record<ZoneName, ZoneMarket> = {
  'Capital': {
    casa:  { min: 1200, avg: 1400, max: 1650 },
    dpto:  { min: 1300, avg: 1500, max: 1750 },
    lote:  { min: 200,  avg: 310,  max: 420  },
    demanda: 'alta',
    descripcion: 'Centro de Mendoza. Máxima demanda, acceso a todos los servicios, conectividad total.',
    crecimientoAnual: 7,
  },
  'Godoy Cruz': {
    casa:  { min: 1100, avg: 1300, max: 1550 },
    dpto:  { min: 1150, avg: 1380, max: 1650 },
    lote:  { min: 170,  avg: 270,  max: 380  },
    demanda: 'alta',
    descripcion: 'Zona residencial premium. Muy buscada por familias. Alto nivel de infraestructura.',
    crecimientoAnual: 7,
  },
  'Luján de Cuyo': {
    casa:  { min: 1200, avg: 1520, max: 1850 },
    dpto:  { min: 1250, avg: 1580, max: 1900 },
    lote:  { min: 150,  avg: 290,  max: 420  },
    demanda: 'alta',
    descripcion: 'Zona de vinos y barrios privados. Crecimiento acelerado por barrios cerrados y fincas.',
    crecimientoAnual: 9,
  },
  'Maipú': {
    casa:  { min: 900,  avg: 1060, max: 1250 },
    dpto:  { min: 950,  avg: 1120, max: 1320 },
    lote:  { min: 110,  avg: 185,  max: 270  },
    demanda: 'media',
    descripcion: 'Zona vitivinícola en crecimiento. Buena relación precio-calidad. Ideal para inversión.',
    crecimientoAnual: 6,
  },
  'Guaymallén': {
    casa:  { min: 800,  avg: 960,  max: 1150 },
    dpto:  { min: 850,  avg: 1020, max: 1230 },
    lote:  { min: 95,   avg: 165,  max: 240  },
    demanda: 'media',
    descripcion: 'Zona con alta densidad y servicios completos. Fuerte crecimiento urbano.',
    crecimientoAnual: 5,
  },
  'Las Heras': {
    casa:  { min: 700,  avg: 860,  max: 1050 },
    dpto:  { min: 730,  avg: 900,  max: 1080 },
    lote:  { min: 90,   avg: 145,  max: 220  },
    demanda: 'media',
    descripcion: 'Zona norte del Gran Mendoza. Buena conectividad y servicios en expansión.',
    crecimientoAnual: 5,
  },
  'El Challao': {
    casa:  { min: 600,  avg: 720,  max: 870  },
    dpto:  { min: 620,  avg: 750,  max: 900  },
    lote:  { min: 70,   avg: 120,  max: 175  },
    demanda: 'media',
    descripcion: 'Zona serrana con crecimiento. Ideal para vivienda propia a precios accesibles.',
    crecimientoAnual: 4,
  },
  'San Carlos': {
    casa:  { min: 600,  avg: 760,  max: 920  },
    dpto:  { min: 620,  avg: 780,  max: 950  },
    lote:  { min: 85,   avg: 148,  max: 225  },
    demanda: 'baja',
    descripcion: 'Valle de Uco. Zona turística y vitivinícola con proyección de crecimiento.',
    crecimientoAnual: 6,
  },
  'San Martín': {
    casa:  { min: 580,  avg: 740,  max: 920  },
    dpto:  { min: 600,  avg: 780,  max: 960  },
    lote:  { min: 75,   avg: 130,  max: 205  },
    demanda: 'baja',
    descripcion: 'Zona agrícola del este mendocino. Precios accesibles con buena infraestructura.',
    crecimientoAnual: 4,
  },
  'Santa Rosa': {
    casa:  { min: 480,  avg: 640,  max: 800  },
    dpto:  { min: 500,  avg: 670,  max: 840  },
    lote:  { min: 60,   avg: 108,  max: 165  },
    demanda: 'baja',
    descripcion: 'Zona rural del este. Propiedades a valores muy accesibles.',
    crecimientoAnual: 3,
  },
  'Junín': {
    casa:  { min: 540,  avg: 700,  max: 870  },
    dpto:  { min: 560,  avg: 730,  max: 900  },
    lote:  { min: 70,   avg: 125,  max: 195  },
    demanda: 'baja',
    descripcion: 'Zona este con producción agrícola. Valores moderados con potencial.',
    crecimientoAnual: 4,
  },
  'San Rafael': {
    casa:  { min: 700,  avg: 870,  max: 1050 },
    dpto:  { min: 750,  avg: 920,  max: 1100 },
    lote:  { min: 90,   avg: 150,  max: 230  },
    demanda: 'media',
    descripcion: 'Segunda ciudad de Mendoza. Mercado independiente, turismo y servicios completos.',
    crecimientoAnual: 5,
  },
  'Tunuyán': {
    casa:  { min: 580,  avg: 710,  max: 860  },
    dpto:  { min: 600,  avg: 740,  max: 890  },
    lote:  { min: 70,   avg: 128,  max: 190  },
    demanda: 'baja',
    descripcion: 'Valle de Uco sur. Zona en desarrollo con fuertes inversiones vitivinícolas.',
    crecimientoAnual: 5,
  },
};

// ─── Ajustes por barrio dentro de cada zona ──────────────────────────────────
// factor > 1 = barrio premium, factor < 1 = barrio más accesible
// Claves en minúsculas para matching sin case-sensitivity

export const barrioAjustes: Record<ZoneName, { nombre: string; aliases: string[]; factor: number }[]> = {
  'Capital': [
    { nombre: 'Centro / Microcentro', aliases: ['centro', 'microcentro', '1ra', '2da', '3ra sección'], factor: 1.18 },
    { nombre: '4ta Sección', aliases: ['4ta', 'cuarta sección', '4ta sección'], factor: 1.12 },
    { nombre: '5ta Sección', aliases: ['5ta', 'quinta sección', '5ta sección'], factor: 1.08 },
    { nombre: 'Bombal', aliases: ['bombal'], factor: 1.07 },
    { nombre: 'Residencial Norte', aliases: ['residencial norte', 'villa nueva'], factor: 1.06 },
    { nombre: 'La Perla', aliases: ['la perla'], factor: 1.04 },
    { nombre: 'General San Martín', aliases: ['general san martín', 'san martín capital'], factor: 1.0 },
    { nombre: 'Pedro Molina', aliases: ['pedro molina'], factor: 0.95 },
  ],
  'Godoy Cruz': [
    { nombre: 'San Martín / Residencial', aliases: ['residencial', 'ponce', 'belgrano'], factor: 1.12 },
    { nombre: 'Panquehua', aliases: ['panquehua'], factor: 1.10 },
    { nombre: 'San José', aliases: ['san josé', 'san jose'], factor: 1.06 },
    { nombre: 'Centro Godoy Cruz', aliases: ['centro', 'godoy cruz centro'], factor: 1.03 },
    { nombre: 'Bancario', aliases: ['bancario'], factor: 1.02 },
    { nombre: 'Los Olivos', aliases: ['los olivos', 'luzuriaga'], factor: 0.97 },
  ],
  'Luján de Cuyo': [
    { nombre: 'Chacras de Coria', aliases: ['chacras', 'chacras de coria'], factor: 1.32 },
    { nombre: 'Vistalba', aliases: ['vistalba'], factor: 1.26 },
    { nombre: 'Carrodilla', aliases: ['carrodilla'], factor: 1.18 },
    { nombre: 'Mayor Drummond', aliases: ['drummond', 'mayor drummond'], factor: 1.10 },
    { nombre: 'Agrelo', aliases: ['agrelo'], factor: 1.05 },
    { nombre: 'Luján Centro', aliases: ['luján centro', 'lujan centro', 'lujan'], factor: 1.0 },
    { nombre: 'El Carrizal', aliases: ['carrizal', 'el carrizal'], factor: 0.95 },
  ],
  'Maipú': [
    { nombre: 'Coquimbito', aliases: ['coquimbito'], factor: 1.10 },
    { nombre: 'Russell', aliases: ['russell'], factor: 1.07 },
    { nombre: 'Lunlunta', aliases: ['lunlunta'], factor: 1.05 },
    { nombre: 'Cruz de Piedra', aliases: ['cruz de piedra'], factor: 1.04 },
    { nombre: 'Centro Maipú', aliases: ['centro', 'maipú centro', 'maipu centro'], factor: 1.0 },
    { nombre: 'Rodeo del Medio', aliases: ['rodeo del medio'], factor: 0.92 },
  ],
  'Guaymallén': [
    { nombre: 'Dorrego', aliases: ['dorrego'], factor: 1.08 },
    { nombre: 'El Sauce', aliases: ['el sauce'], factor: 1.05 },
    { nombre: 'Buena Nueva', aliases: ['buena nueva'], factor: 1.03 },
    { nombre: 'Villa Nueva', aliases: ['villa nueva'], factor: 1.02 },
    { nombre: 'Centro Guaymallén', aliases: ['centro', 'guaymallén centro'], factor: 1.0 },
    { nombre: 'San José GGM', aliases: ['san josé', 'las cañas'], factor: 0.95 },
  ],
  'Las Heras': [
    { nombre: 'Villa Hipódromo', aliases: ['hipódromo', 'villa hipódromo'], factor: 1.10 },
    { nombre: 'Centro Las Heras', aliases: ['centro', 'las heras centro'], factor: 1.05 },
    { nombre: 'Panquehua (LH)', aliases: ['panquehua'], factor: 1.03 },
    { nombre: 'Otras zonas', aliases: ['general'], factor: 1.0 },
  ],
  'El Challao': [
    { nombre: 'El Challao centro', aliases: ['challao', 'centro'], factor: 1.0 },
    { nombre: 'El Borbollón', aliases: ['borbollón', 'borbollon'], factor: 0.95 },
  ],
  'San Carlos': [
    { nombre: 'Eugenio Bustos', aliases: ['bustos', 'eugenio bustos'], factor: 1.08 },
    { nombre: 'Pareditas', aliases: ['pareditas'], factor: 1.04 },
    { nombre: 'San Carlos centro', aliases: ['centro', 'san carlos centro'], factor: 1.0 },
    { nombre: 'La Consulta', aliases: ['la consulta'], factor: 0.97 },
  ],
  'San Martín': [
    { nombre: 'Palmira', aliases: ['palmira'], factor: 1.06 },
    { nombre: 'San Martín centro', aliases: ['centro', 'san martín centro'], factor: 1.0 },
    { nombre: 'Chapanay', aliases: ['chapanay'], factor: 0.92 },
  ],
  'Santa Rosa': [
    { nombre: 'Santa Rosa centro', aliases: ['centro'], factor: 1.0 },
    { nombre: 'La Dormida', aliases: ['la dormida'], factor: 0.92 },
  ],
  'Junín': [
    { nombre: 'Junín centro', aliases: ['centro', 'junín centro'], factor: 1.0 },
    { nombre: 'Médrano', aliases: ['médrano'], factor: 0.95 },
  ],
  'San Rafael': [
    { nombre: 'Centro San Rafael', aliases: ['centro', 'san rafael centro'], factor: 1.10 },
    { nombre: 'Cuadro Benegas', aliases: ['benegas'], factor: 1.05 },
    { nombre: 'Ciudad San Rafael', aliases: ['ciudad'], factor: 1.02 },
    { nombre: 'El Nihuil', aliases: ['nihuil', 'el nihuil'], factor: 0.95 },
    { nombre: 'General Alvear', aliases: ['alvear', 'general alvear'], factor: 0.90 },
  ],
  'Tunuyán': [
    { nombre: 'Tunuyán centro', aliases: ['centro', 'tunuyán centro'], factor: 1.0 },
    { nombre: 'Los Árboles', aliases: ['los árboles'], factor: 1.05 },
    { nombre: 'Vista Flores', aliases: ['vista flores'], factor: 1.03 },
  ],
};

// Busca el ajuste de barrio dado un texto libre (de Nominatim)
export const getBarrioFactor = (zona: ZoneName, nominatimText: string): { nombre: string; factor: number } => {
  const text = nominatimText.toLowerCase();
  const barrios = barrioAjustes[zona] || [];
  for (const b of barrios) {
    if (b.aliases.some(a => text.includes(a.toLowerCase()))) {
      return { nombre: b.nombre, factor: b.factor };
    }
  }
  return { nombre: 'Zona general', factor: 1.0 };
};

// Evolución histórica precio/m2 promedio Gran Mendoza (casas, USD)
export const historicalPrices = [
  { year: '2020', precio: 780 },
  { year: '2021', precio: 850 },
  { year: '2022', precio: 940 },
  { year: '2023', precio: 1020 },
  { year: '2024', precio: 1130 },
  { year: '2025', precio: 1250 },
];

// Ajustes por estado de la propiedad
export const estadoAjuste: Record<string, number> = {
  'Excelente': 0.12,
  'Muy bueno': 0.06,
  'Bueno': 0,
  'Regular': -0.15,
  'A refaccionar': -0.28,
};

// Ajuste por antigüedad (% por año, máximo -35%)
export const calcAntiguedadAjuste = (years: number): number => {
  if (years <= 0) return 0.05; // estrenar = +5%
  if (years <= 5) return 0;
  const ajuste = -(years - 5) * 0.008;
  return Math.max(ajuste, -0.35);
};

export const getPriceRange = (
  zona: ZoneName,
  tipo: PropertyKind,
  m2Cubiertos: number,
  m2Total: number,
  antiguedad: number,
  estado: string,
  garage: boolean,
) => {
  const zoneInfo = marketData[zona];
  let baseRange = zoneInfo.casa;

  if (tipo === 'Departamento') baseRange = zoneInfo.dpto;
  else if (tipo === 'PH') baseRange = zoneInfo.dpto;
  else if (tipo === 'Dúplex') baseRange = { min: zoneInfo.casa.min * 1.05, avg: zoneInfo.casa.avg * 1.05, max: zoneInfo.casa.max * 1.05 };
  else if (tipo === 'Lote') {
    const surface = m2Total || m2Cubiertos;
    return {
      min: Math.round(zoneInfo.lote.min * surface),
      avg: Math.round(zoneInfo.lote.avg * surface),
      max: Math.round(zoneInfo.lote.max * surface),
      precioPorM2: zoneInfo.lote.avg,
    };
  }

  const m2 = m2Cubiertos || m2Total;
  const estadoFactor = 1 + (estadoAjuste[estado] ?? 0);
  const antiguedadFactor = 1 + calcAntiguedadAjuste(antiguedad);
  const garageFactor = garage ? 1.05 : 1;

  // Lote extra: si m2 total es >50% más que cubiertos, suma valor
  const m2Extra = (m2Total || 0) - m2;
  const loteExtraValor = m2Extra > 30 ? m2Extra * zoneInfo.lote.avg * 0.4 : 0;

  const calcPrice = (base: number) =>
    Math.round(base * m2 * estadoFactor * antiguedadFactor * garageFactor + loteExtraValor);

  return {
    min: calcPrice(baseRange.min),
    avg: calcPrice(baseRange.avg),
    max: calcPrice(baseRange.max),
    precioPorM2: Math.round(baseRange.avg * estadoFactor * antiguedadFactor),
  };
};

// Proyección de precios a futuro
export const getProjection = (basePrice: number, zona: ZoneName) => {
  const growth = marketData[zona].crecimientoAnual / 100;
  return [
    { year: '2025', precio: Math.round(basePrice) },
    { year: '2026', precio: Math.round(basePrice * (1 + growth)) },
    { year: '2027', precio: Math.round(basePrice * Math.pow(1 + growth, 2)) },
    { year: '2028', precio: Math.round(basePrice * Math.pow(1 + growth, 3)) },
    { year: '2029', precio: Math.round(basePrice * Math.pow(1 + growth, 4)) },
    { year: '2030', precio: Math.round(basePrice * Math.pow(1 + growth, 5)) },
  ];
};
