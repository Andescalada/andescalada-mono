import { Rubik } from "@next/font/google";
import Head from "next/head";
import Footer from "pages/footer";
import Navbar from "pages/navbar";
import { FC, PropsWithChildren } from "react";

const rubik = Rubik({
  variable: "--rubik-font",
  subsets: ["latin"],
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Head>
      <title>Andescalada App</title>
      <meta
        name="description"
        content="Andescalada, la app de la Fundación Andescalada para gestionar la información y a la comunidad escaladora."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar />
    <main className={`${rubik.variable}`}>{children}</main>
    <Footer />
  </>
);

export default RootLayout;
