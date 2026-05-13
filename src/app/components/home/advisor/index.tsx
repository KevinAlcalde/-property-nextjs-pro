import React from "react";
import Link from "next/link";

export default function AdvisorSection() {
  return (
    <section className="dark:bg-darkmode py-20 px-4">
      <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 items-center">
          <div data-aos="fade-right" className="flex items-center justify-center">
            <div className="bg-primary/10 rounded-2xl w-full max-w-md aspect-[4/5] flex flex-col items-center justify-center shadow-lg border-2 border-primary/20">
              <div className="bg-primary/20 rounded-full w-32 h-32 flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </div>
              <p className="text-primary font-bold text-2xl">Kevin Alcalde</p>
              <p className="text-gray text-base mt-2">Asesor Inmobiliario</p>
              <p className="text-gray text-sm mt-1">Módica Inmobiliaria · Mendoza</p>
            </div>
          </div>
          <div data-aos="fade-left">
            <p className="text-primary font-semibold text-lg mb-3 uppercase tracking-wide">
              Tu asesor de confianza
            </p>
            <h2 className="text-4xl font-bold text-midnight_text dark:text-white mb-6 leading-[1.2]">
              Kevin Alcalde
            </h2>
            <p className="text-gray text-xl mb-4">
              Asesor Inmobiliario · Módica Inmobiliaria · Mendoza
            </p>
            <p className="text-gray text-lg mb-6">
              Con foco en el mercado mendocino, acompaño a compradores, vendedores e inversores en cada etapa del proceso inmobiliario. Mi compromiso es brindarte atención personalizada, transparencia y resultados reales.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray">
                <span className="w-2 h-2 rounded-full bg-primary inline-block flex-shrink-0"></span>
                Tasación gratuita y sin compromiso
              </li>
              <li className="flex items-center gap-3 text-gray">
                <span className="w-2 h-2 rounded-full bg-primary inline-block flex-shrink-0"></span>
                Más de 50 propiedades en 13 zonas de Mendoza
              </li>
              <li className="flex items-center gap-3 text-gray">
                <span className="w-2 h-2 rounded-full bg-primary inline-block flex-shrink-0"></span>
                Asesoramiento en compra, venta e inversión
              </li>
              <li className="flex items-center gap-3 text-gray">
                <span className="w-2 h-2 rounded-full bg-primary inline-block flex-shrink-0"></span>
                Gestión integral y acompañamiento en todo el proceso
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://wa.me/542616974513"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300 flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.115 1.524 5.845L.054 23.02a.75.75 0 0 0 .926.926l5.175-1.47A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.919 0-3.727-.51-5.285-1.4l-.378-.213-3.073.873.873-3.073-.213-.378A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                WhatsApp directo
              </Link>
              <Link
                href="/tasacion"
                className="border border-primary text-primary py-3 px-8 rounded-lg text-lg font-medium hover:bg-primary hover:text-white transition duration-300"
              >
                Tasar mi propiedad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
