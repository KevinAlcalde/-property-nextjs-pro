import { NextResponse } from "next/server";

const headerData = [
  { label: "Inicio", href: "/" },
  { label: "Propiedades", href: "/properties/properties-list" },
  { label: "Tasación", href: "/tasacion" },
  { label: "Contacto", href: "/contact" },
];

export const GET = async () => {
  return NextResponse.json({ headerData });
};
