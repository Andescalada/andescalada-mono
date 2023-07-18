import { NextApiRequest, NextApiResponse } from "next";

const OpenApp = (req: NextApiRequest, res: NextApiResponse) => {
  const userAgent = req.headers["user-agent"];

  if (userAgent?.search("Android") !== -1) {
    res.status(200).json({
      url: "https://play.google.com/store/apps/details?id=com.andescalada.app",
    });
  } else if (
    userAgent?.search("iPhone") !== -1 ||
    userAgent?.search("iPad") !== -1
  ) {
    res.status(200).json({
      url: "https://apps.apple.com/us/app/andescalada/id6443438367",
    });
  } else {
    res.status(204);
  }
};

export default OpenApp;
