import React from "react";
import Link from "next/link";

const ContactInfo = () => {
  return (
    <>
      <section className="dark:bg-darkmode pt-8 pb-0 px-4">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
          <div className="flex md:flex-row flex-col lg:items-center items-start justify-center md:gap-28 gap-8">
            <div className="flex sm:flex-row flex-col items-start sm:gap-8 gap-4">
              <div className="bg-primary/20 w-3.75 h-3.75 flex items-center justify-center rounded-full">
                <i className="bg-[url('/images/contact-page/email.svg')] bg-no-repeat bg-contain w-8 h-8 inline-block"></i>
              </div>
              <div className="flex md:flex-col sm:flex-row flex-col md:items-start sm:items-center items-start h-full justify-between">
                <div>
                  <span className="text-midnight_text dark:text-white text-xl font-bold">
                    Email
                  </span>
                  <p className="text-midnight_text/70 font-normal text-xl max-w-80 pt-3 pb-7 dark:text-gray">
                    kevinalejandroalcalde@gmail.com
                  </p>
                </div>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col items-start sm:gap-8 gap-4">
              <div className="bg-primary/20 w-3.75 h-3.75 flex items-center justify-center rounded-full">
                <i className="bg-[url('/images/contact-page/Career.svg')] bg-no-repeat bg-contain w-9 h-9 inline-block"></i>
              </div>
              <div className="flex md:flex-col sm:flex-row flex-col md:items-start sm:items-center items-start h-full justify-between">
                <div>
                  <span className="text-midnight_text dark:text-white text-xl font-bold">
                    Ubicación
                  </span>
                  <p className="text-midnight_text/70 font-normal text-xl max-w-80 pt-3 pb-7 dark:text-gray">
                    Mendoza, Argentina
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:pt-32 pt-11 md:pb-28 pb-8">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109419.19223041258!2d-68.9227808!3d-32.8908440!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e09dde40a8bbd%3A0x5eecfe8bbd6e7a89!2sMendoza%2C%20Argentina!5e0!3m2!1ses!2sar!4v1715676641521!5m2!1ses!2sar" width="1114" height="477" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg w-full"></iframe>
          </div>
        </div>
        <div className="border-b border-solid border-border dark:border-dark_border"></div>
      </section>
    </>
  );
};

export default ContactInfo;
