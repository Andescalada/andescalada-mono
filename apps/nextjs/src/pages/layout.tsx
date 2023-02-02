import { Rubik } from "@next/font/google";
import { FC, PropsWithChildren } from "react";

const rubik = Rubik({
  variable: "--rubik-font",
  subsets: ["latin"],
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <main className={`${rubik.variable}`}>{children}</main>
  </>
);

export default RootLayout;
