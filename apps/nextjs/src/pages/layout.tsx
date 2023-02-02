import { Rubik } from "@next/font/google";
import { FC, PropsWithChildren } from "react";

const rubik = Rubik({
  variable: "--rubik-font",
  subsets: ["latin"],
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html className={`${rubik.variable}`}>
    <body>{children}</body>
  </html>
);

export default RootLayout;
