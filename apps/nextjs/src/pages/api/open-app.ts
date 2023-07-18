import { NextApiRequest, NextApiResponse } from "next";

const OpenApp = (req: NextApiRequest, res: NextApiResponse) => {
  const userAgent = req.headers["user-agent"];

  // Check if the user agent contains "Android" or "iOS" to determine the device type
  if (userAgent?.search("Android") !== -1) {
    // Redirect Android users to a specific URL
    res.redirect(
      302,
      "https://play.google.com/store/apps/details?id=com.andescalada.app&hl=es&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
    );
  } else if (
    userAgent?.search("iPhone") !== -1 ||
    userAgent?.search("iPad") !== -1
  ) {
    // Redirect iOS users to a different URL
    res.redirect(
      302,
      "https://apps.apple.com/us/app/andescalada/id6443438367?itsct=apps_box_badge&amp;itscg=30200",
    );
  } else {
    // Handle other cases or provide a default redirect URL
    // res.redirect(301, "https://www.andescalada.org");
  }
};

export default OpenApp;
