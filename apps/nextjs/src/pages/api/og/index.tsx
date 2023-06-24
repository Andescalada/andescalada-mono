/* eslint-disable react/no-unknown-property */
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

const rubikBold = fetch(
  new URL("../../../../public/fonts/Rubik-Bold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const rubikRegular = fetch(
  new URL("../../../../public/fonts/Rubik-Regular.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

const OgImageHandler = async () => {
  const rubikBoldFontData = await rubikBold;
  const rubikRegularFontData = await rubikRegular;

  return new ImageResponse(
    (
      <div
        tw="flex flex-1 flex-col w-full h-full items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(to right,#413d76,#c75f3d)",
        }}
      >
        <div tw="flex flex-col items-center">
          <img
            src="https://www.andescalada.org/_next/static/media/logo_blanco.d7910180.svg"
            alt="logo"
            height={65 * 3}
            width={120 * 3}
            tw=""
          />
          <h2 tw="text-white text-[30px]">Unir · Cuidar · Documentar</h2>
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
