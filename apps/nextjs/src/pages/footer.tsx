import WhiteLogo from "assets/svg/logo_blanco.svg";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoMedium,
} from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-brand-primaryA flex p-4 md:p-10 flex-col">
      <div className="flex items-center justify-between">
        <WhiteLogo className="h-20 md:h-32 flex-3 mr-5" />
        <div className="">
          <div className="flex flex-col w-full">
            <p className="mb-2">Siguenos en nuestras redes sociales</p>
            <div className="flex justify-around">
              <a
                title="facebook"
                href="https://facebook.com/andescalada"
                target="_blank"
                rel="noreferrer"
              >
                <IoLogoFacebook size={30} fill="white" />
              </a>
              <a
                title="instagram"
                href="https://instagram.com/andescalada"
                target="_blank"
                rel="noreferrer"
              >
                <IoLogoInstagram size={30} fill="white" />
              </a>
              <a
                title="linkedin"
                href="https://www.linkedin.com/company/andescalada/"
                target="_blank"
                rel="noreferrer"
              >
                <IoLogoLinkedin size={30} fill="white" />
              </a>
              <a
                title="medium"
                href="https://medium.com/andescalada"
                target="_blank"
                rel="noreferrer"
              >
                <IoLogoMedium size={30} fill="white" />
              </a>
            </div>
          </div>
          <div className="mt-4">
            <p>
              Escríbenos a <br></br>
              <a
                href="mailto:contacto@andescalada.org?Subject=Andescalada"
                className="text-brand-secondaryA"
              >
                contacto@andescalada.org
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white h-[2px] w-full rounded-sm mt-10" />
    </footer>
  );
};

export default Footer;
