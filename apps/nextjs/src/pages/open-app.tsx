import MobileVideoFrame from "components/MobileVideoFrame";
import StoreBadges from "components/StoreBadges";
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
    <section className="p-5 pt-10 md:p-20 flex flex-col items-center text-center gap-5 space-y-4 bg-black text-white">
      <h1>Descarga la aplicación de Andescalada</h1>
      <StoreBadges />
      <MobileVideoFrame publicId="andescalada.org/draw-simple-route" />
      <MobileVideoFrame publicId="andescalada.org/zone-privacy-options_msgaua" />
    </section>
  );
};

export default OpenApp;
