import { Rubik } from "@next/font/google";
import Footer from "pages/footer";
import Navbar from "pages/navbar";
import { FC, ReactNode } from "react";

const rubik = Rubik({
  variable: "--rubik-font",
  subsets: ["latin"],
});

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className={`${rubik.variable} flex flex-col flex-1`}>{children}</main>
    <Footer />
  </div>
);

export default RootLayout;
