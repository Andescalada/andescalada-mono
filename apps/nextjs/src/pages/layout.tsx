import { Rubik } from "@next/font/google";
import Footer from "pages/footer";
import Navbar from "pages/navbar";
import { FC, ReactNode } from "react";

const rubik = Rubik({
  variable: "--rubik-font",
  subsets: ["latin"],
});

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <main className={`${rubik.variable}`}>{children}</main>
    <Footer />
  </>
);

export default RootLayout;
