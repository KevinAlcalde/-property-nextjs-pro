"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from 'react';
import { PropertyContext } from "@/context-api/PropertyContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SLIDES = [
  "/images/hero/slide-1.webp",
  "/images/hero/slide-2.webp",
  "/images/hero/slide-3.webp",
];

const Hero = () => {
  const router = useRouter();
  const [propertiesData, setPropertiesData] = useState<any[]>([]);
  const { updateFilter } = useContext(PropertyContext)!;
  const [activeTab, setActiveTab] = useState("venta");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [location, setLocation] = useState("");
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/propertydata');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPropertiesData(data || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (tag: string) => {
    if (location.trim() === '') {
      setError('Por favor ingresá una zona para buscar.');
      return;
    }
    setError('');
    updateFilter('location', location);
    updateFilter('tag', tag);
    router.push(`/properties/properties-list`);
  };

  const suggestions = Array.from(new Set(propertiesData.map((item) => item.location)));

  const handleSelect = (value: any) => {
    setLocation(value);
    setShowSuggestions(false);
  };

  const currentTag = activeTab === "venta" ? "Sell" : "Rent";

  return (
    <section className="relative h-[620px] lg:h-[700px] overflow-hidden">

      {/* Slider de fondo — ocupa toda la sección */}
      <div
        className="absolute inset-0 z-0
          [&_.slick-slider]:h-full
          [&_.slick-list]:h-full
          [&_.slick-track]:h-full
          [&_.slick-slide]:h-full
          [&_.slick-slide>div]:h-full"
      >
        <Slider
          autoplay
          autoplaySpeed={4500}
          infinite
          speed={900}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={false}
          dots={false}
        >
          {SLIDES.map((src, i) => (
            <div key={i} className="relative h-full">
              <Image
                src={src}
                alt={`Módica Inmobiliaria ${i + 1}`}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority={i === 0}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Contenido centrado sobre el slider */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">

        <h1
          className="text-white text-center text-3xl md:text-5xl font-bold mb-8 drop-shadow-lg"
          data-aos="fade-down"
        >
          Encontrá tu propiedad ideal en Mendoza
        </h1>

        <div className="w-full max-w-2xl" data-aos="fade-up">
          {/* Tabs */}
          <div className="flex gap-1">
            <button
              className={`px-9 py-3 text-xl rounded-t-md focus:outline-none transition-colors ${
                activeTab === "venta"
                  ? "bg-white text-midnight_text border-b-2 border-primary"
                  : "text-white bg-white/20 hover:bg-white/30"
              }`}
              onClick={() => setActiveTab("venta")}
            >
              Venta
            </button>
            <button
              className={`px-9 py-3 text-xl rounded-t-md focus:outline-none transition-colors ${
                activeTab === "alquiler"
                  ? "bg-white text-midnight_text border-b-2 border-primary"
                  : "text-white bg-white/20 hover:bg-white/30"
              }`}
              onClick={() => setActiveTab("alquiler")}
            >
              Alquiler
            </button>
          </div>

          {/* Formulario de búsqueda */}
          <div className="bg-white rounded-b-lg rounded-tr-lg shadow-2xl p-6">
            <div className="relative rounded-lg border-0 mb-4">
              <div className="relative flex items-center">
                <div className="absolute left-0 p-4">
                  <Image
                    src="/images/svgs/icon-location.svg"
                    alt="Ubicación"
                    height={24}
                    width={24}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Zona: Capital, Godoy Cruz, Luján de Cuyo..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  className="py-4 pr-3 pl-14 w-full rounded-lg text-black border border-border focus:border-primary focus-visible:outline-none"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-border rounded-md z-10 max-h-[130px] overflow-y-auto shadow-lg">
                    <ul className="flex flex-col gap-2 py-4 px-8">
                      {suggestions.map((item, index) => (
                        <li key={index} onClick={() => handleSelect(item)}>
                          <p className="cursor-pointer text-midnight_text text-lg hover:text-primary">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={() => handleSearch(currentTag)}
                className="flex-1 py-3 text-lg px-8 bg-primary text-white rounded-lg hover:bg-primary/90 transition duration-300 font-semibold"
              >
                Buscar
              </button>
              <button
                onClick={() => router.push('/properties/properties-list')}
                className="flex-1 py-3 text-lg px-8 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition duration-300 font-semibold"
              >
                Ver todas
              </button>
            </div>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>
        </div>

        {/* Estrellas */}
        <div className="flex flex-col items-center mt-6 gap-2" data-aos="fade-up">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.431L24 9.763l-6 5.847L19.336 24 12 20.019 4.664 24 6 15.61 0 9.763l8.332-1.745z" />
              </svg>
            ))}
          </div>
          <p className="text-white text-sm drop-shadow">
            +50 propiedades en Mendoza <span className="text-white/70">· Atención personalizada</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;
