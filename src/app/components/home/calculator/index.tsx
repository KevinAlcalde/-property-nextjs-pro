"use client";
import React, { useState, useEffect } from "react";
import "../../../../app/style/index.css";
import Link from "next/link";

export default function Calculator() {
  const [activeTab, setActiveTab] = useState("sell");
  const [price, setPrice] = useState(10000);

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const handlePriceChange = (event: any) => {
    setPrice(event.target.value);
  };

  return (
    <section className="dark:bg-darkmode">
      <div
        className="container px-4 lg:max-w-screen-xl md:max-w-screen-md mx-auto flex flex-col lg:flex-row gap-16 justify-between items-center"
        data-aos="fade-left"
      >
        <div className="max-w-37.5 px-0 mb-8 md:mb-0" data-aos="fade-right">
          <h2
            className="text-4xl mb-4 font-bold text-midnight_text dark:text-white"
            data-aos="fade-left"
          >
            Ahorrá con Módica
          </h2>
          <p className="text-xl text-gray mb-12" data-aos="fade-left">
            Asesoramiento personalizado para que tomes la mejor decisión en tu
            inversión inmobiliaria en Mendoza.
          </p>
          <div className="relative-container">
            <div className="main-div mb-16 pt-8">
              <div className="child-container flex w-full justify-between">
                <div
                  className="money-dot relative"
                  data-aos="fade-left"
                  data-aos-delay="100"
                >
                  <p className="text-3xl text-midnight_text dark:text-white">
                    3% Ahorro
                  </p>
                  <p className="text-gray text-base">En propiedades &gt; $50K</p>
                </div>
                <div
                  className="money-dot relative"
                  data-aos="fade-left"
                  data-aos-delay="200"
                >
                  <p className="text-3xl text-midnight_text dark:text-white">
                    5% Ahorro
                  </p>
                  <p className="text-gray text-base">En propiedades &gt; $75K</p>
                </div>
                <div
                  className="money-dot relative"
                  data-aos="fade-left"
                  data-aos-delay="300"
                >
                  <p className="text-3xl text-midnight_text dark:text-white">
                    8% Ahorro
                  </p>
                  <p className="text-gray text-base">En propiedades &gt; $90K</p>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-up">
            <Link
              href="/properties/properties-list"
              className="text-xl bg-primary py-3 px-8 text-white rounded-lg me-3 mb-2 border border-primary hover:bg-blue-700"
            >
              Comprar
            </Link>
            <Link
              href="/properties/properties-list"
              className="text-xl hover:bg-primary hover:text-white py-3 px-8 text-primary border border-primary rounded-lg me-3 mb-2"
            >
              Vender
            </Link>
          </div>
        </div>
        <div className="lg:w-auto w-full" data-aos="fade-right">
          <div className="bg-primary rounded-t-lg p-16 w-full">
            <p className="text-4xl text-white mb-6 font-bold flex items-center justify-center">
              Calculadora de Ahorro
            </p>
            <div className="flex justify-center">
              <div className="flex p-3 border-4 rounded-full bg-transparent border-cyan items-center justify-center">
                <button
                  className={`px-6 py-2 text-base focus:outline-none ${
                    activeTab === "buy"
                      ? "text-white bg-cyan rounded-full"
                      : "text-white transition duration-300 rounded-full"
                  }`}
                  onClick={() => handleTabChange("buy")}
                >
                  Comprar
                </button>
                <button
                  className={`px-6 py-2 text-base focus:outline-none ${
                    activeTab === "sell"
                      ? "text-white bg-cyan rounded-full"
                      : "text-white transition duration-300 rounded-full"
                  }`}
                  onClick={() => handleTabChange("sell")}
                >
                  Vender
                </button>
              </div>
            </div>
            <div className="items-center justify-center mt-12">
              <p className="text-white flex items-center justify-center font-bold">
                AHORRO ESTIMADO
              </p>
              <p className="mb-6 text-white flex items-center justify-center font-bold text-[50px] leading-[1.2]">
                ${price}
              </p>
              <input
                type="range"
                min="10000"
                max="4000000"
                step=""
                value={price}
                onChange={handlePriceChange}
                className="w-full h-2 bg-blue-800 rounded-lg appearance-none cursor-pointer "
              />
            </div>
            <div className="flex justify-between text-sm text-white mt-2 font-bold">
              <p>$10K</p>
              <p>$400K</p>
            </div>
          </div>
          <div className="p-4 bg-blue-700 text-white text-xl rounded-b-lg">
            <p className="text-center mb-1 opacity-70">¿Tenés dudas?</p>
            <Link
              href={"tel:+5492616974513"}
              className="text-center font-bold inline-block w-full"
            >
              <span className="opacity-70 !font-normal">Llamanos: </span>261 697-4513
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
