import appIcon from "assets/svg/icono_app.svg?url";
import bathIcon from "assets/svg/icono_baño.svg?url";
import coalicionesIcon from "assets/svg/icono_coaliciones.svg?url";
import impactoAmbientalIcon from "assets/svg/icono_impacto_ambiental.svg?url";
import hikingIcon from "assets/svg/icono_trekking.svg?url";

const Challenges = () => {
  return (
    <section className="flex items-center flex-col px-10 my-20 md:py-40">
      <div>
        <h1 className="font-semibold text-transparent text-center bg-clip-text bg-gradient-to-r from-brand-primaryA to-brand-primaryB">
          Líneas de acción
        </h1>
        <p className="text-black text-2xl text-center my-10">
          Nuestro trabajo se divide en tres áreas que, en conjunto, buscan
          proporcionar un espacio de comunicación y entregar herramientas de
          gestión a la comunidad escaladora
        </p>
      </div>

      <div className="flex flex-col lg:flex-row ">
        <Challenge title="Unir" />
        <Challenge title="Cuidar" />
        <Challenge title="Documentar" />
      </div>
    </section>
  );
};

export default Challenges;

const challengeData = {
  Unir: {
    backgroundImage: "bg-[url('assets/jpeg/unir_desktop.jpg')]",
    backgroundColor: "bg-brand-secondaryA",
    textColor: "text-black",
    subtitle:
      "Generar vínculos duraderos entre la comunidad local y la comunidad escaladora",
    challengeText:
      "Entablar relaciones entre quienes escalan, quienes viven cerca de los sectores y quienes poseen los terrenos.",
    task1:
      "Coaliciones preocupadas de manera integral del cuidado y desarrollo del sector, trabajando en conjunto con comundiades locales.",
    iconTask1: coalicionesIcon,
    task2:
      "Aplicación móvil que permita conocer los acuerdos y coaliciones de cada sector.",
    iconTask2: appIcon,
  },
  Cuidar: {
    backgroundImage: "bg-[url('assets/jpeg/cuidar_desktop.jpg')]",
    backgroundColor: "bg-brand-primaryA",
    textColor: "text-white",
    subtitle:
      "Proteger los ecosistemas y mitigar el impacto creado por la escalada",
    challengeText:
      "Debemos desarrollar planes de manejo ambiental para los sectores de escalada, para cuidar los ecosistemas y especies endémicas.",
    task1:
      "Estudios de impacto ambiental de zonas de escalada para saber realmente cómo se está afectando cierta zona",
    iconTask1: impactoAmbientalIcon,
    task2:
      "Apoyo en creación y habilitación de infraestructura que permita mitigar el impacto ambiental",
    iconTask2: bathIcon,
  },
  Documentar: {
    backgroundImage: "bg-[url('assets/jpeg/documentar_desktop.jpg')]",
    backgroundColor: "bg-brand-secondaryB",
    textColor: "text-black",
    subtitle:
      "Crear un canal para la gestión responsable de sectores de escalada",
    challengeText:
      "Generar un espacio para obtener información actualizada de rutas, accesos, acuerdos y grupos trabajando en cada sector.",
    task1:
      "Aplicación móvil que permita revisar información actualizada: topos de escalada, acuerdos, cómo llegar a cierto sector, entre otras.",
    iconTask1: appIcon,
    task2:
      "Documentación de sectores para subir información actualizada a la aplicación",
    iconTask2: hikingIcon,
  },
};

interface ChallengeProps {
  title: keyof typeof challengeData;
}

const Challenge = ({ title }: ChallengeProps) => {
  return (
    <div className="mx-5 rounded-md overflow-hidden flex-1 h-full my-4 lg:my-0 text-white">
      <div
        className={`flex flex-1 p-5 ${challengeData[title].backgroundImage} bg-cover bg-no-repeat bg-center`}
      >
        <div>
          <h3 className="text-4xl">{title}</h3>
          <p className="">{challengeData[title].subtitle}</p>
        </div>
      </div>

      <div className={challengeData[title].backgroundColor}>
        <div className="flex flex-col p-10 items-center">
          <h4
            className={
              "text-3xl font-light my-5 " + challengeData[title].textColor
            }
          >
            El desafío
          </h4>
          <p
            className={
              "subtitle is-6 is-spaced  text-center " +
              challengeData[title].textColor
            }
          >
            {challengeData[title].task1}
          </p>
          <h4
            className={
              "text-3xl font-light my-5 text-center " +
              challengeData[title].textColor
            }
          >
            ¿En qué trabajamos?
          </h4>
          <div className="flex my-5 items-center">
            <img
              src={challengeData[title].iconTask1}
              alt="Coaliciones"
              className="flex-2"
            />

            <p className={"flex-1 pl-5 " + challengeData[title].textColor}>
              {challengeData[title].task1}
            </p>
          </div>

          <div className="flex my-5 items-center">
            <img
              src={challengeData[title].iconTask2}
              alt="Aplicación móvil"
              className="flex-2 fill-white"
              color="white"
            />

            <p
              className={
                "text-center flex-1 pl-5 " + challengeData[title].textColor
              }
            >
              {challengeData[title].task2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
