
import React from "react";
import { Metadata } from "next";
import HeroSub from "@/app/components/shared/hero-sub";
import ContactInfo from "@/app/components/contact/contact-info";
import ContactForm from "@/app/components/contact/form";
import Location from "@/app/components/contact/office-location";
export const metadata: Metadata = {
  title: "Contacto | Módica Inmobiliaria",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Inicio" },
    { href: "/contact", text: "Contacto" },
  ];
  return (
    <>
      <HeroSub
        title="Contactanos"
        description="Estamos para ayudarte. Escribinos o llamanos y te respondemos a la brevedad."
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactInfo />
      <ContactForm />
      <Location />
    </>
  );
};

export default page;
