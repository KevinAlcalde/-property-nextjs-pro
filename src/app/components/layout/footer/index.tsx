"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from 'react';
import { PropertyContext } from '@/context-api/PropertyContext';

const Footer = () => {
  const { updateFilter } = useContext(PropertyContext)!;
  return (
    <footer className="relative z-10 bg-midnight_text dark:bg-semidark">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md pt-10 pb-5 px-0 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-4 col-span-12 flex flex-col px-4 sm:px-0 gap-4">
            <Link href="/">
              <Image
                src="/images/logo/logo-rect.jpg"
                alt="Módica Inmobiliaria"
                width={180}
                height={56}
                style={{ width: 'auto', height: '44px', borderRadius: '6px' }}
                quality={95}
              />
            </Link>
            <p className="text-gray text-sm leading-relaxed max-w-xs">
              Tu inmobiliaria de confianza en Mendoza. Más de 10 años acompañando a familias y empresas en sus decisiones inmobiliarias.
            </p>
            <div className="flex items-center gap-2">
              <a
                aria-label="WhatsApp"
                href="https://wa.me/5492616974513"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-midnight_text bg-white bg-opacity-50 hover:bg-primary hover:text-white transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                aria-label="Instagram"
                href="https://instagram.com/modica.inmobiliaria"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-midnight_text bg-white bg-opacity-50 hover:bg-primary hover:text-white transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                </svg>
              </a>
            </div>
          </div>
          <div className="md:col-span-8 col-span-12 grid grid-cols-12 gap-4 px-4 sm:px-0">
            <div className="w-full lg:col-span-4 col-span-12">
              <h4 className="mb-4 text-lg text-white dark:text-white">
                Contacto
              </h4>
              <p className="mb-3 text-gray text-sm">
                Kevin Alcalde<br />Asesor Inmobiliario
              </p>
              <p className="mb-2 text-gray text-sm">
                📞 <a href="tel:+5492616974513" className="hover:text-white transition-colors">261 697-4513</a>
              </p>
              <p className="mb-2 text-gray text-sm">
                ✉️ <a href="mailto:kevinalejandroalcalde@gmail.com" className="hover:text-white transition-colors">kevinalejandroalcalde@gmail.com</a>
              </p>
              <p className="mb-2 text-gray text-sm">
                📍 Mendoza, Argentina
              </p>
            </div>
            <div className="w-full lg:col-span-4 col-span-12">
              <h4 className="mb-4 text-lg text-white dark:text-white">
                Accesos rápidos
              </h4>
              <ul>
                <li>
                  <Link href="/" className="mb-3 inline-block text-sm text-gray hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/properties/properties-list" className="mb-3 inline-block text-sm text-gray hover:text-white">
                    Propiedades
                  </Link>
                </li>
                <li>
                  <Link href="/tasacion" className="mb-3 inline-block text-sm text-gray hover:text-white">
                    Tasación gratuita
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="mb-3 inline-block text-sm text-gray hover:text-white">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full lg:col-span-4 col-span-12">
              <h4 className="mb-4 text-lg text-white dark:text-white">
                Búsquedas populares
              </h4>
              <ul>
                <li onClick={() => updateFilter('category', 'house')}>
                  <Link href="/properties/properties-list?category=house" className="mb-3 inline-block text-sm text-gray hover:text-white">
                    Casas en venta
                  </Link>
                </li>
                <li onClick={() => updateFilter('category', 'apartment')}>
                  <Link href="/properties/properties-list?category=apartment" className="mb-3 inline-block text-sm text-gray hover:text-white">
                    Departamentos
                  </Link>
                </li>
                <li onClick={() => updateFilter('category', 'shop')}>
                  <Link href="/properties/properties-list?category=shop" className="mb-3 inline-block text-sm text-gray hover:text-white">
                    Lotes en venta
                  </Link>
                </li>
                <li onClick={() => updateFilter('category', 'warehouse')}>
                  <Link href="/properties/properties-list?category=warehouse" className="mb-3 inline-block text-sm text-gray hover:text-white">
                    Fincas y campos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border dark:border-dark_border py-6">
        <div className="container flex flex-col lg:flex-row justify-between items-center mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <p className="text-gray text-sm text-center lg:text-left mb-2 lg:mb-0">
            © {new Date().getFullYear()} Módica Inmobiliaria · Mendoza, Argentina
          </p>
          <a
            href="https://wa.me/5492616974513?text=Hola%20Kevin%2C%20me%20interesa%20una%20propiedad"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-6 bg-primary text-sm text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
