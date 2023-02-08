import Bosque from "assets/svg/bosque.svg";
import Ecologia from "assets/svg/ecologia.svg";
import Pensando from "assets/svg/pensando.svg";
import Planta from "assets/svg/planta.svg";

const Why = () => {
  return (
    <section className="bg-black p-4 py-16">
      <div className="flex justify-center items-center">
        <div className="flex-1">
          <h1 className="font-semibold text-transparent text-center bg-clip-text bg-gradient-to-r from-brand-primaryA to-brand-primaryB">
            ¿Por qué Andescalada?
          </h1>
          <p className="leading-10 text-2xl text-center mt-10 md:mb-10">
            Apostamos por comunidades que velen por el <br />
            cuidado, acceso, desarrollo y documentación <br />
            de los sectores de escalada
          </p>
          <div className="hidden md:flex p-10">
            <div className="px-4">
              <Planta
                alt="Cuidado"
                fill="white"
                height={52}
                width={52}
                className="my-4"
              />
              <h3 className="font-bold">Cuidado</h3>
              <p className="leading-10">
                La protección del medio ambiente es clave para preservar los
                espacios de escalada y potenciar nuevo lugares.
              </p>
            </div>
            <div className="px-4">
              <Ecologia
                alt="Acceso"
                fill="white"
                height={52}
                width={52}
                className="my-4"
              />
              <h3 className="font-bold">Acceso</h3>
              <p className="leading-10">
                Aspiramos que todos puedan aprovechar de forma respetuosa la
                naturaleza, en particular los sectores de escalada.
              </p>
            </div>
            <div className="px-4">
              <Pensando
                alt="Desarrollo"
                fill="white"
                height={52}
                width={52}
                className="my-4"
              />
              <h3 className="font-bold">Desarrollo</h3>
              <p className="leading-10">
                Al potenciar los sectores de escalada, se potencia todo un
                ecosistema en torno a ellos que permite desarrollar comunidades
                locales.
              </p>
            </div>
            <div className="px-4">
              <Bosque fill="white" height={52} width={52} className="my-4" />
              <h3 className="font-bold">Documentación</h3>
              <p className="leading-10">
                Con información actualizada y centralizada existirán menos
                problemas en los acuerdos y mayor seguridad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;
