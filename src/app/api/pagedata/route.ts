import { NextResponse } from "next/server";

const features = [
  {
    id: 1,
    imgSrc: "/images/features/rating.svg",
    title: "Experiencia comprobada",
    description: "Más de 10 años en el mercado inmobiliario mendocino. Conocemos cada barrio y cada oportunidad."
  },
  {
    id: 2,
    imgSrc: "/images/features/Give-Women's-Rights.svg",
    title: "Asesoramiento personalizado",
    description: "Te acompañamos en cada etapa: búsqueda, negociación y escritura. Tu tranquilidad es nuestra prioridad."
  },
  {
    id: 3,
    imgSrc: "/images/features/live-chat.svg",
    title: "Atención inmediata",
    description: "Respondemos por WhatsApp, email o teléfono. Siempre disponibles para resolver tus consultas."
  }
];

const searchOptions = {
  keywords: [
    { value: '', label: 'Buscar...', placeholder: 'Buscar por nombre...' },
  ],
  locations: [
    { value: '', label: 'Zona' },
    { value: 'Capital', label: 'Capital' },
    { value: 'Godoy Cruz', label: 'Godoy Cruz' },
    { value: 'Guaymallén', label: 'Guaymallén' },
    { value: 'Las Heras', label: 'Las Heras' },
    { value: 'Luján de Cuyo', label: 'Luján de Cuyo' },
    { value: 'Maipú', label: 'Maipú' },
    { value: 'El Challao', label: 'El Challao' },
    { value: 'San Carlos', label: 'San Carlos' },
    { value: 'San Martín', label: 'San Martín' },
    { value: 'Santa Rosa', label: 'Santa Rosa' },
  ],
  category: [
    { value: '', label: 'Tipo' },
    { value: 'house', label: 'Casa' },
    { value: 'apartment', label: 'Departamento' },
    { value: 'villa', label: 'Dúplex' },
    { value: 'shop', label: 'Lote / Cochera' },
    { value: 'office', label: 'PH / Hotel' },
    { value: 'warehouse', label: 'Finca' },
  ],
  beds: [
    { value: '', label: 'Dormitorios' },
    { value: '1', label: '1 Dorm.' },
    { value: '2', label: '2 Dorm.' },
    { value: '3', label: '3 Dorm.' },
    { value: '4', label: '4 Dorm.' },
  ],
  garages: [
    { value: '', label: 'Cochera' },
    { value: '1', label: 'Con cochera' },
  ],
};

const data = [
  {
    src: "https://svgshare.com/i/187L.svg",
    src1: "https://svgshare.com/i/183P.svg",
    alt: "Casa",
    name: "Casas",
    count: 20,
  },
  {
    src: "https://svgshare.com/i/188i.svg",
    src1: "https://svgshare.com/i/185B.svg",
    alt: "Departamento",
    name: "Departamentos",
    count: 9,
  },
  {
    src: "https://svgshare.com/i/186r.svg",
    src1: "https://svgshare.com/i/185n.svg",
    alt: "Dúplex",
    name: "Dúplex / PH",
    count: 6,
  },
  {
    src: "https://svgshare.com/i/187Z.svg",
    src1: "https://svgshare.com/i/184b.svg",
    alt: "Lote",
    name: "Lotes",
    count: 12,
  },
  {
    src: "https://svgshare.com/i/1881.svg",
    src1: "https://svgshare.com/i/183k.svg",
    alt: "Finca",
    name: "Fincas",
    count: 4,
  },
];

export const GET = async () => {
  return NextResponse.json({ features, searchOptions, data });
};
