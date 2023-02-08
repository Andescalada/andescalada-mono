import problema1 from "assets/jpeg/problema1.jpg";
import problema2 from "assets/jpeg/problema2.jpg";
import problema3 from "assets/jpeg/problema3.jpg";
import problema4 from "assets/jpeg/problema4.jpg";
import problema5 from "assets/jpeg/problema5.jpg";
import problema6 from "assets/jpeg/problema6.jpg";
import problema7 from "assets/jpeg/problema7.jpg";
import problema8 from "assets/jpeg/problema8.jpg";
import GradientTitle from "components/GradientTitle";
import Image from "next/image";
import React from "react";

const problems = [
  { title: "Problemas de acceso", image: problema1 },
  {
    title: "Falta de involucramiento de las comunidades locales ",
    image: problema2,
  },
  { title: "Basura en los sectores", image: problema3 },
  { title: "Información inexistente o desactualizada", image: problema4 },
  { title: "Falta de infraestructura como baños o senderos", image: problema5 },
  { title: "Concentración de escaladores en pocos sectores", image: problema6 },
  {
    title: "Falta de información de fauna y flora de los sectores",
    image: problema7,
  },
  { title: "Poca relación entre escaladores", image: problema8 },
];

const About = () => {
  return (
    <div className="">
      <section className="flex flex-col justify-center items-center m-10 md:m-20">
        <GradientTitle className="text-4xl mb-10 md:mb-20">
          Fundación Andescalada
        </GradientTitle>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 mx-5">
            <h3 className="text-brand-primaryA font-bold">Nuestra visión</h3>
            <h2 className="mb-10">¿Por qué lo hacemos?</h2>
            <p className="leading-8">
              Soñamos con comunidades organizadas en torno a la escalada en toda
              América Latina, que velen por el cuidado, acceso, desarrollo y
              documentación de cada uno de sus sectores, cuyos principios se
              basen en la protección del ecosistema y la memoria colectiva,
              generando el máximo valor para la comunidad.
            </p>
          </div>
          <div className="flex-1 mx-5 mt-10 md:mt-0">
            <h3 className="text-brand-primaryB font-bold">Nuestra misión</h3>
            <h2 className="mb-10">¿Qué hacemos?</h2>
            <p className="leading-8">
              Proporcionar un espacio de comunicación y entregar herramientas de
              gestión a la comunidad escaladora, para promover el desarrollo
              sustentable y organizado de la escalada, cuidar el medio ambiente,
              potenciar el desarrollo local y ayudar a resolver problemáticas de
              acceso.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-grayscale-black  text-white p-10 md:p-20">
        <div className="flex flex-col justify-center items-center pb-20 h-full">
          <GradientTitle className="text-4xl mb-10">
            El diagnóstico
          </GradientTitle>
          <p className="text-center w-1/2">
            Motivados por el amor a la escalada y al potencial que tiene Chile
            de desarrollar sectores para la práctica de este deporte, nos
            reunimos para aportar en la gestión responsable de estos
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {problems.slice(0, 8).map((problem) => (
            <div key={problem.title} className="flex-1 flex flex-col px-4">
              <Image
                src={problem.image}
                alt={problem.title}
                className="mb-5"
                height={150}
                width={150}
              />
              <h3 className="uppercase text-sm md:text-lg">{problem.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
