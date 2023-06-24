/* eslint-disable react/no-unknown-property */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const rubikBold = fetch(
  new URL("../../../../../public/fonts/Rubik-Bold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const rubikRegular = fetch(
  new URL("../../../../../public/fonts/Rubik-Regular.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

const OgImageHandler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  const descriptionText = description ? description : "Zona de escalada";

  const rubikBoldFontData = await rubikBold;
  const rubikRegularFontData = await rubikRegular;

  return new ImageResponse(
    (
      <div
        tw="flex flex-1 flex-col w-full h-full items-center"
        style={{
          backgroundImage: "linear-gradient(to right,#413d76,#c75f3d)",
        }}
      >
        <div tw="flex pt-10">
          <img
            src="https://www.andescalada.org/_next/static/media/logo_blanco.d7910180.svg"
            alt="logo"
            height={65}
            width={120}
            tw=""
          />
        </div>
        <div tw="flex flex-1 flex-col items-center justify-center">
          <h1 tw="text-[70px] text-white font-bold text-center">{title}</h1>
          <h2 tw="text-gray-400 text-[30px]">{descriptionText}</h2>
        </div>
      </div>
    ),
    {
      width: 400,
      height: 400,
      fonts: [
        {
          name: "Rubik",
          data: rubikRegularFontData,
          weight: 400,
        },
        {
          name: "Rubik",
          data: rubikBoldFontData,
          weight: 700,
        },
      ],
    },
  );
};

export default OgImageHandler;
