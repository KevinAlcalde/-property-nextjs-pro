'use client';

import { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';

const MapPicker = dynamic(() => import('@/app/components/map-picker'), { ssr: false });

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  nombre: string; email: string; telefono: string;
  tipo: string; zona: string;
  direccion: string; barrio: string; lat: string; lon: string;
  m2Total: string; m2Cubiertos: string;
  habitaciones: string; banos: string;
  garage: boolean; antiguedad: string; estado: string;
}

interface Comparable {
  titulo: string; direccion: string; precio: number;
  m2: number; precioPorM2: number; tipo: string;
}

interface Resultado {
  priceRange: { min: number; avg: number; max: number; precioPorM2: number };
  projection: { year: string; precio: number }[];
  comparables: Comparable[];
  barrioInfo: { nombre: string; factor: number };
  direccion: string;
  mapsLink: string;
  lat: number; lon: number;
  zoneInfo: { demanda: string; descripcion: string; crecimientoAnual: number };
  fotos: string[];
}

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string; lon: string;
  address: {
    neighbourhood?: string; suburb?: string; quarter?: string;
    road?: string; city_district?: string; state_district?: string;
  };
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ZONAS = [
  'Capital', 'Godoy Cruz', 'Guaymallén', 'Las Heras',
  'Luján de Cuyo', 'Maipú', 'El Challao', 'San Carlos',
  'San Martín', 'Santa Rosa', 'Junín', 'San Rafael', 'Tunuyán',
];
const TIPOS = ['Casa', 'Departamento', 'Dúplex', 'PH', 'Lote', 'Finca', 'Cochera', 'Hotel'];
const ESTADOS = ['Excelente', 'Muy bueno', 'Bueno', 'Regular', 'A refaccionar'];

const DEFAULT_LAT = -32.8908;
const DEFAULT_LON = -68.8272;

const AZUL = '#1B2C6E';
const NARANJA = '#E55C1B';

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

// ─── Small components ─────────────────────────────────────────────────────────

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`h-2 rounded-full transition-all duration-300 ${
          i < step ? 'w-8 bg-secondary' : i === step ? 'w-8 bg-primary' : 'w-4 bg-gray-200'
        }`} />
      ))}
    </div>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      {children}
    </div>
  );
}

function DemandaBadge({ demanda }: { demanda: string }) {
  const map: Record<string, string> = {
    alta: 'bg-green-100 text-green-700',
    media: 'bg-yellow-100 text-yellow-700',
    baja: 'bg-orange-100 text-orange-700',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${map[demanda] ?? 'bg-gray-100 text-gray-600'}`}>
      Demanda {demanda}
    </span>
  );
}

const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white';
const selectClass = inputClass;

// ─── Hook: Nominatim address search ──────────────────────────────────────────

function useNominatim() {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [loadingGeo, setLoadingGeo] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback((query: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (query.length < 4) { setSuggestions([]); return; }
    timerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ', Mendoza, Argentina')}&format=json&addressdetails=1&limit=6&countrycodes=ar`,
          { headers: { 'Accept-Language': 'es' } }
        );
        const data: NominatimResult[] = await res.json();
        setSuggestions(data);
      } catch { setSuggestions([]); }
    }, 500);
  }, []);

  const reverseGeocode = useCallback(async (lat: number, lon: number): Promise<NominatimResult | null> => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`,
        { headers: { 'Accept-Language': 'es' } }
      );
      return await res.json();
    } catch { return null; }
  }, []);

  const geolocate = useCallback(async (
    onSuccess: (lat: number, lon: number, result: NominatimResult | null) => void
  ) => {
    if (!navigator.geolocation) return;
    setLoadingGeo(true);
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords;
      const result = await reverseGeocode(latitude, longitude);
      setLoadingGeo(false);
      onSuccess(latitude, longitude, result);
    }, () => setLoadingGeo(false));
  }, [reverseGeocode]);

  return { suggestions, setSuggestions, loadingGeo, search, reverseGeocode, geolocate };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function TasacionPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    nombre: '', email: '', telefono: '',
    tipo: '', zona: '',
    direccion: '', barrio: '', lat: String(DEFAULT_LAT), lon: String(DEFAULT_LON),
    m2Total: '', m2Cubiertos: '',
    habitaciones: '', banos: '',
    garage: false, antiguedad: '', estado: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const [addressInput, setAddressInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { suggestions, setSuggestions, loadingGeo, search, reverseGeocode, geolocate } = useNominatim();

  const set = (field: keyof FormData, value: string | boolean) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const applyNominatimResult = useCallback((result: NominatimResult) => {
    const addr = result.address;
    const barrio = addr.neighbourhood || addr.suburb || addr.quarter || addr.city_district || '';
    const shortAddress = [addr.road, barrio].filter(Boolean).join(', ');
    setAddressInput(result.display_name.split(',').slice(0, 3).join(', '));
    setFormData(prev => ({
      ...prev,
      direccion: shortAddress || result.display_name,
      barrio,
      lat: result.lat,
      lon: result.lon,
    }));
    setSuggestions([]);
    setShowSuggestions(false);
  }, [setSuggestions]);

  const handleMapLocation = useCallback(async (lat: number, lon: number) => {
    set('lat', String(lat));
    set('lon', String(lon));
    const result = await reverseGeocode(lat, lon);
    if (result) applyNominatimResult(result);
  }, [reverseGeocode, applyNominatimResult]); // eslint-disable-line

  const handleFiles = (selected: FileList | null) => {
    if (!selected) return;
    const arr = Array.from(selected).slice(0, 8);
    setFiles(arr);
    setPreviews(arr.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, String(v)));
      files.forEach(f => fd.append('fotos', f));

      const res = await fetch('/api/tasacion', { method: 'POST', body: fd });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Error desconocido');
      setResultado(data.resultado);
      setStep(6);
      setTimeout(() => reportRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al procesar');
    } finally {
      setLoading(false);
    }
  };

  const isLote = formData.tipo === 'Lote';
  const mapLat = parseFloat(formData.lat) || DEFAULT_LAT;
  const mapLon = parseFloat(formData.lon) || DEFAULT_LON;

  // ── Location step ─────────────────────────────────────────────────────────
  const locationStep = (
    <div className="space-y-4">
      <h2 className="text-xl font-black text-primary">Ubicación exacta</h2>
      <p className="text-sm text-gray-500">
        Buscá la dirección, mové el pin en el mapa o usá tu ubicación actual.
      </p>
      <Field label="Buscar dirección, calle o barrio">
        <div className="relative">
          <input
            className={inputClass + ' pr-10'}
            value={addressInput}
            placeholder="Ej: Aristides Villanueva 300, Godoy Cruz"
            onChange={e => {
              setAddressInput(e.target.value);
              setShowSuggestions(true);
              search(e.target.value);
            }}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          />
          <span className="absolute right-3 top-3 text-gray-400 text-base">🔍</span>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
              {suggestions.map(s => (
                <li
                  key={s.place_id}
                  onClick={() => applyNominatimResult(s)}
                  className="px-4 py-3 text-sm cursor-pointer hover:bg-primary/5 border-b border-gray-100 last:border-0"
                >
                  <span className="font-semibold text-primary">
                    {s.display_name.split(',').slice(0, 2).join(',')}
                  </span>
                  <br />
                  <span className="text-xs text-gray-400">
                    {s.display_name.split(',').slice(2, 4).join(',')}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Field>

      <button
        onClick={() => geolocate((lat, lon, result) => {
          set('lat', String(lat));
          set('lon', String(lon));
          if (result) applyNominatimResult(result);
        })}
        disabled={loadingGeo}
        className="flex items-center gap-2 text-sm font-semibold text-primary border-2 border-primary/30 rounded-xl px-4 py-2.5 hover:bg-primary/5 transition-colors disabled:opacity-50"
      >
        <span>{loadingGeo ? '⏳' : '📍'}</span>
        {loadingGeo ? 'Obteniendo ubicación…' : 'Usar mi ubicación actual'}
      </button>

      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <MapPicker lat={mapLat} lon={mapLon} onLocation={handleMapLocation} />
      </div>
      <p className="text-xs text-gray-400 text-center">Hacé clic en el mapa o arrastrá el pin para ajustar la ubicación exacta</p>

      {formData.barrio && (
        <div className="flex items-center gap-2 bg-primary/5 rounded-xl px-4 py-3">
          <span className="text-base">🏘️</span>
          <div>
            <p className="text-xs text-gray-500">Barrio detectado</p>
            <p className="text-sm font-bold text-primary">{formData.barrio}</p>
          </div>
        </div>
      )}
      {formData.direccion && (
        <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3">
          <span className="text-base">📌</span>
          <p className="text-sm text-gray-600">{formData.direccion}</p>
        </div>
      )}
    </div>
  );

  const steps = [
    // 0 — Contacto
    <div key={0} className="space-y-4">
      <h2 className="text-xl font-black text-primary">Tus datos de contacto</h2>
      <p className="text-sm text-gray-500">Para enviarte el informe y hacer el seguimiento personalizado</p>
      <Field label="Nombre y apellido">
        <input className={inputClass} value={formData.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Juan García" />
      </Field>
      <Field label="Email">
        <input className={inputClass} type="email" value={formData.email} onChange={e => set('email', e.target.value)} placeholder="tu@email.com" />
      </Field>
      <Field label="WhatsApp / Teléfono">
        <input className={inputClass} value={formData.telefono} onChange={e => set('telefono', e.target.value)} placeholder="261 XXX-XXXX" />
      </Field>
    </div>,

    // 1 — Tipo y zona
    <div key={1} className="space-y-4">
      <h2 className="text-xl font-black text-primary">¿Qué propiedad querés tasar?</h2>
      <Field label="Tipo de propiedad">
        <select className={selectClass} value={formData.tipo} onChange={e => set('tipo', e.target.value)}>
          <option value="">Seleccioná un tipo</option>
          {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Zona / Departamento">
        <select className={selectClass} value={formData.zona} onChange={e => set('zona', e.target.value)}>
          <option value="">Seleccioná una zona</option>
          {ZONAS.map(z => <option key={z} value={z}>{z}</option>)}
        </select>
      </Field>
    </div>,

    // 2 — Ubicación
    locationStep,

    // 3 — Superficies
    <div key={3} className="space-y-4">
      <h2 className="text-xl font-black text-primary">Superficies y ambientes</h2>
      <div className="grid grid-cols-2 gap-3">
        <Field label="M² totales (terreno)">
          <input className={inputClass} type="number" value={formData.m2Total} onChange={e => set('m2Total', e.target.value)} placeholder="300" />
        </Field>
        {!isLote && (
          <Field label="M² cubiertos">
            <input className={inputClass} type="number" value={formData.m2Cubiertos} onChange={e => set('m2Cubiertos', e.target.value)} placeholder="180" />
          </Field>
        )}
      </div>
      {!isLote && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Habitaciones">
              <select className={selectClass} value={formData.habitaciones} onChange={e => set('habitaciones', e.target.value)}>
                <option value="">—</option>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </Field>
            <Field label="Baños">
              <select className={selectClass} value={formData.banos} onChange={e => set('banos', e.target.value)}>
                <option value="">—</option>
                {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </Field>
          </div>
          <button
            onClick={() => set('garage', !formData.garage)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-sm font-semibold w-full ${
              formData.garage ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-500'
            }`}
          >
            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${formData.garage ? 'border-primary bg-primary' : 'border-gray-300'}`}>
              {formData.garage && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>
            Tiene cochera / garage
          </button>
        </>
      )}
    </div>,

    // 4 — Antigüedad y estado
    <div key={4} className="space-y-4">
      <h2 className="text-xl font-black text-primary">Antigüedad y estado</h2>
      <Field label="Antigüedad estimada (años)" hint="0 si es a estrenar">
        <input className={inputClass} type="number" value={formData.antiguedad} onChange={e => set('antiguedad', e.target.value)} placeholder="Ej: 15" min="0" max="100" />
      </Field>
      <Field label="Estado de conservación">
        <div className="grid grid-cols-1 gap-2">
          {ESTADOS.map(est => (
            <button
              key={est}
              onClick={() => set('estado', est)}
              className={`px-4 py-2.5 rounded-xl border-2 text-sm font-semibold text-left transition-all ${
                formData.estado === est
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {est}
            </button>
          ))}
        </div>
      </Field>
    </div>,

    // 5 — Fotos
    <div key={5} className="space-y-4">
      <h2 className="text-xl font-black text-primary">Fotos de la propiedad</h2>
      <p className="text-sm text-gray-500">Opcionales. Hasta 8 imágenes.</p>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary transition-colors group"
      >
        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📷</div>
        <p className="text-sm font-semibold text-gray-600 group-hover:text-primary">Subir fotos</p>
        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP · Máx. 8 fotos</p>
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {previews.map((src, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => {
                  setFiles(files.filter((_, j) => j !== i));
                  setPreviews(previews.filter((_, j) => j !== i));
                }}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white text-xs flex items-center justify-center"
              >×</button>
            </div>
          ))}
        </div>
      )}
    </div>,
  ];

  const canAdvance = [
    !!(formData.nombre && formData.email && formData.telefono),
    !!(formData.tipo && formData.zona),
    true,
    !!(formData.m2Total || formData.m2Cubiertos),
    !!formData.estado,
    true,
  ];

  // ── Report ────────────────────────────────────────────────────────────────
  if (step === 6 && resultado) {
    const { priceRange, projection, comparables, barrioInfo, direccion, mapsLink, lat, lon, zoneInfo } = resultado;

    const comparablesChart = comparables.map(c => ({
      name: c.titulo.length > 20 ? c.titulo.slice(0, 20) + '…' : c.titulo,
      precio: c.precio,
    }));

    const barrioLabel = barrioInfo.factor !== 1
      ? `${barrioInfo.nombre} · ${barrioInfo.factor > 1 ? '+' : ''}${((barrioInfo.factor - 1) * 100).toFixed(0)}% vs. zona`
      : barrioInfo.nombre;

    return (
      <div ref={reportRef} className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50/20 py-10 px-4 pt-28">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Header */}
          <div className="bg-primary rounded-3xl p-8 text-white">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl flex-shrink-0">🏠</div>
                <div>
                  <p className="text-xs text-blue-200 font-semibold uppercase tracking-wider">Informe de Tasación · Módica Inmobiliaria</p>
                  <p className="font-black text-lg">{formData.tipo} · {formData.zona}</p>
                </div>
              </div>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-1 bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-xl text-xs font-semibold"
              >
                📍 Ver en Maps
              </a>
            </div>
            {direccion && (
              <div className="bg-white/10 rounded-xl px-4 py-2.5 mb-4">
                <p className="text-xs text-blue-200 mb-0.5">Dirección</p>
                <p className="text-sm font-semibold">{direccion}</p>
              </div>
            )}
            {barrioInfo.nombre !== 'Zona general' && (
              <div className="bg-white/10 rounded-xl px-4 py-2.5 mb-4">
                <p className="text-xs text-blue-200 mb-0.5">Barrio</p>
                <p className="text-sm font-semibold">{barrioLabel}</p>
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mt-2">
              {!isLote && formData.m2Cubiertos && <div><p className="text-blue-200 text-xs">M² cubiertos</p><p className="font-bold">{formData.m2Cubiertos} m²</p></div>}
              {formData.m2Total && <div><p className="text-blue-200 text-xs">M² totales</p><p className="font-bold">{formData.m2Total} m²</p></div>}
              {formData.habitaciones && <div><p className="text-blue-200 text-xs">Habitaciones</p><p className="font-bold">{formData.habitaciones}</p></div>}
              {formData.antiguedad && <div><p className="text-blue-200 text-xs">Antigüedad</p><p className="font-bold">{formData.antiguedad} años</p></div>}
              {formData.estado && <div><p className="text-blue-200 text-xs">Estado</p><p className="font-bold">{formData.estado}</p></div>}
              {formData.garage && <div><p className="text-blue-200 text-xs">Cochera</p><p className="font-bold">Sí</p></div>}
            </div>
          </div>

          {/* Valor estimado */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Valor de mercado estimado</h3>
            <div className="text-center mb-6">
              <p className="text-5xl font-black text-primary">{fmt(priceRange.avg)}</p>
              <p className="text-sm text-gray-400 mt-1">
                Valor justo · <strong>{priceRange.precioPorM2.toLocaleString('es-AR')} USD/m²</strong>
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center mb-6">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400 font-semibold mb-1">Mínimo</p>
                <p className="font-black text-gray-700 text-lg">{fmt(priceRange.min)}</p>
                <p className="text-xs text-gray-400 mt-1">Venta rápida</p>
              </div>
              <div className="bg-primary rounded-2xl p-4">
                <p className="text-xs text-blue-200 font-semibold mb-1">Recomendado</p>
                <p className="font-black text-white text-lg">{fmt(priceRange.avg)}</p>
                <p className="text-xs text-blue-200 mt-1">Precio justo</p>
              </div>
              <div className="bg-secondary/10 rounded-2xl p-4">
                <p className="text-xs text-secondary font-semibold mb-1">Máximo</p>
                <p className="font-black text-secondary text-lg">{fmt(priceRange.max)}</p>
                <p className="text-xs text-secondary/70 mt-1">Mercado activo</p>
              </div>
            </div>
            <div className="relative">
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-slate-400 via-primary to-secondary rounded-full" />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Mínimo</span><span>Valor justo</span><span>Máximo</span>
              </div>
            </div>
          </div>

          {/* Mapa en reporte */}
          {lat !== 0 && lon !== 0 && (
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Ubicación</h3>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary hover:underline">
                  Abrir en Google Maps →
                </a>
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-100">
                <MapPicker lat={lat} lon={lon} onLocation={() => {}} />
              </div>
            </div>
          )}

          {/* Comparables */}
          {comparables.length > 0 && (
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                Comparables en {formData.zona}
              </h3>
              <p className="text-xs text-gray-400 mb-4">Propiedades similares del catálogo Módica ordenadas por cercanía de precio</p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-2 text-xs font-bold text-gray-400 uppercase">Propiedad</th>
                      <th className="text-right py-2 px-2 text-xs font-bold text-gray-400 uppercase">Precio</th>
                      <th className="text-right py-2 px-2 text-xs font-bold text-gray-400 uppercase">M²</th>
                      <th className="text-right py-2 px-2 text-xs font-bold text-gray-400 uppercase">USD/m²</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparables.map((c, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-2">
                          <p className="font-semibold text-gray-800">{c.titulo}</p>
                          <p className="text-xs text-gray-400">{c.tipo}</p>
                        </td>
                        <td className="py-2.5 px-2 text-right font-bold text-primary">{fmt(c.precio)}</td>
                        <td className="py-2.5 px-2 text-right text-gray-600">{c.m2 > 0 ? `${c.m2} m²` : '—'}</td>
                        <td className="py-2.5 px-2 text-right text-gray-500">{c.precioPorM2 > 0 ? `${c.precioPorM2.toLocaleString()}` : '—'}</td>
                      </tr>
                    ))}
                    <tr className="bg-primary/5 border border-primary/20">
                      <td className="py-2.5 px-2">
                        <p className="font-bold text-primary">Tu propiedad</p>
                        <p className="text-xs text-gray-500">{formData.tipo} · {formData.zona}</p>
                      </td>
                      <td className="py-2.5 px-2 text-right font-black text-secondary">{fmt(priceRange.avg)}</td>
                      <td className="py-2.5 px-2 text-right text-gray-600">{formData.m2Cubiertos || formData.m2Total} m²</td>
                      <td className="py-2.5 px-2 text-right text-gray-500">{priceRange.precioPorM2.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {comparablesChart.length > 0 && (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={comparablesChart} layout="vertical" margin={{ left: 0, right: 40, top: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                    <XAxis type="number" tickFormatter={v => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} />
                    <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      formatter={(v: unknown) => [typeof v === 'number' ? fmt(v) : String(v), 'Precio']}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 13 }}
                    />
                    <ReferenceLine x={priceRange.avg} stroke={NARANJA} strokeDasharray="4 4" label={{ value: 'Tuya', fill: NARANJA, fontSize: 11 }} />
                    <Bar dataKey="precio" fill={AZUL} radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          )}

          {/* Proyección */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Proyección 2025–2030</h3>
            <p className="text-xs text-gray-400 mb-4">
              Crecimiento anual estimado zona {formData.zona}:{' '}
              <strong className="text-green-600">+{zoneInfo.crecimientoAnual}% anual</strong>
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={projection} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradProy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={AZUL} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={AZUL} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} />
                <YAxis tickFormatter={v => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v: unknown) => [typeof v === 'number' ? fmt(v) : String(v), 'Valor estimado']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 13 }}
                />
                <Area type="monotone" dataKey="precio" stroke={AZUL} strokeWidth={3} fill="url(#gradProy)" dot={{ fill: AZUL, r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {projection.slice(1).map(p => (
                <div key={p.year} className="bg-slate-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 font-semibold">{p.year}</p>
                  <p className="font-black text-primary text-base">{fmt(p.precio)}</p>
                  <p className="text-xs text-green-600 font-semibold">
                    +{(((p.precio - projection[0].precio) / projection[0].precio) * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Análisis de zona */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Análisis de zona</h3>
            <DemandaBadge demanda={zoneInfo.demanda} />
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">{zoneInfo.descripcion}</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-2xl p-4">
                <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">💰 Para el vendedor</p>
                <ul className="text-xs text-green-800 space-y-1.5 leading-relaxed">
                  <li>• Publicá entre {fmt(priceRange.min)} y {fmt(priceRange.avg)} para mayor rotación</li>
                  <li>• Demanda {zoneInfo.demanda} en {formData.zona} — buen momento para vender</li>
                  <li>• Fotos profesionales pueden aumentar hasta 8% el precio percibido</li>
                  {barrioInfo.factor > 1.05 && <li>• Barrio premium: podés ir al valor máximo ({fmt(priceRange.max)})</li>}
                </ul>
              </div>
              <div className="bg-primary/5 rounded-2xl p-4">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">🔍 Para el comprador</p>
                <ul className="text-xs text-primary space-y-1.5 leading-relaxed">
                  <li>• El precio está dentro del rango justo de mercado</li>
                  <li>• Proyección +{zoneInfo.crecimientoAnual}%/año — buena inversión</li>
                  <li>• En 5 años el valor estimado sería {fmt(projection[5]?.precio ?? 0)}</li>
                  <li>• Podés negociar hasta {fmt(priceRange.min)} en mercado lento</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-secondary rounded-3xl p-8 text-white text-center">
            <p className="text-lg font-black mb-1">¿Querés avanzar?</p>
            <p className="text-sm text-orange-100 mb-6">Kevin Alcalde · Asesor Inmobiliario Módica · Mendoza</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/5492616974513?text=Hola%20Kevin%2C%20hice%20la%20tasaci%C3%B3n%20de%20mi%20propiedad%20en%20${encodeURIComponent(formData.zona)}%20y%20quiero%20consultar`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-secondary font-bold py-3 px-6 rounded-xl text-sm hover:bg-orange-50 transition-colors"
              >
                💬 Hablar con Kevin por WhatsApp
              </a>
              <button
                onClick={() => { setStep(0); setResultado(null); setFiles([]); setPreviews([]); setAddressInput(''); }}
                className="inline-flex items-center justify-center border-2 border-white/40 text-white font-semibold py-3 px-6 rounded-xl text-sm hover:bg-white/10 transition-colors"
              >
                Hacer otra tasación
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  const stepTitles = ['Contacto', 'Propiedad', 'Ubicación', 'Superficies', 'Estado', 'Fotos'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50/20 pt-28 pb-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-white text-2xl mb-4">🏡</div>
          <h1 className="text-2xl font-black text-primary">Tasación gratuita</h1>
          <p className="text-sm text-gray-500 mt-1">
            Paso {step + 1}/6 — <span className="font-semibold">{stepTitles[step]}</span>
          </p>
        </div>

        <StepIndicator step={step} total={6} />

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          {steps[step]}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 transition-colors"
              >
                ← Atrás
              </button>
            )}
            {step < 5 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canAdvance[step]}
                className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              >
                Continuar →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-secondary text-white font-bold text-sm disabled:opacity-60 hover:bg-secondary/90 transition-colors"
              >
                {loading ? 'Calculando…' : '✓ Ver tasación'}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Sin compromiso · Resultado inmediato · 100% gratuito
        </p>
      </div>
    </div>
  );
}
