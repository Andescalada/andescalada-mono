import { pallete } from "./pallete";

export const darkTheme = {
  dark: true,
  colors: {
    primary: pallete.brand.secondaryB,
    background: pallete.grayscale.black,
    card: pallete.grayscale[200],
    text: pallete.grayscale[100],
    border: pallete.grayscale[200],
    notification: pallete.brand.secondaryB,
  },
};

export const lightTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};
