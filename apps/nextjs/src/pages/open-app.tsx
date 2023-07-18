import MobileVideoFrame from "components/MobileVideoFrame";
import StoreBadges from "components/StoreBadges";
import Head from "next/head";
import { useEffect } from "react";

const handleRedirect = async () => {
  const response = await fetch("/api/open-app");

  if (response.ok) {
    const { url } = await response.json();
    window.location.href = url;
  }
};

const OpenApp = () => {
  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <>
      <Head>
        <title>Andescalada App</title>
        <meta
          name="description"
          content="Andescalada, la app de la Fundación Andescalada para gestionar la información y a la comunidad escaladora. Descarga la app!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.andescalada.org/" />
        <meta property="og:title" content="Andescalada" />
        <meta property="og:site_name" content="Andescalada" />
        <meta
          property="og:description"
          content="App de la Fundación Andescalada para gestionar la información y a la comunidad escaladora. Descarga la app!"
        />
        <meta
          property="og:image"
          itemProp="image"
          content={`https://www.andescalada.org/api/og`}
        />
        <meta property="og:image:width" content="400"></meta>
        <meta property="og:image:height" content="400"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="p-5 pt-10 md:p-20 flex flex-col items-center text-center gap-5 space-y-4 bg-black text-white">
        <h1>Descarga la aplicación de Andescalada</h1>
        <StoreBadges />
        <MobileVideoFrame publicId="andescalada.org/draw-simple-route" />
        <MobileVideoFrame publicId="andescalada.org/zone-privacy-options_msgaua" />
      </section>
    </>
  );
};

export default OpenApp;
