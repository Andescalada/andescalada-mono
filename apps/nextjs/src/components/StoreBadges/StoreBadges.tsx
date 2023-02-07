import React from "react";

const StoreBadges = () => {
  return (
    <div className="flex justify-center items-center scale-[0.6]">
      <a
        href="https://apps.apple.com/us/app/andescalada/id6443438367?itsct=apps_box_badge&amp;itscg=30200"
        className="mr-10"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/es-mx?size=250x83&amp;releaseDate=1674518400"
          alt="Download on the App Store"
          className="h-[47px] md:h-[83px]"
        />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.andescalada.app&hl=es&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
        target="_blank"
        className="ml-10"
        rel="noreferrer"
      >
        <img
          alt="Disponible en Google Play"
          src="https://play.google.com/intl/en_us/badges/static/images/badges/es-419_badge_web_generic.png"
          className="h-[60px] md:h-[105px]"
        />
      </a>
    </div>
  );
};

export default StoreBadges;
