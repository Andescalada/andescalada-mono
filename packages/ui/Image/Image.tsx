import { createBox } from "@shopify/restyle";
import { Image as ExpoImage } from "expo-image";
import { ComponentProps } from "react";

import { Theme } from "../Theme/theme";

const Image = createBox<Theme, ComponentProps<typeof ExpoImage>>(ExpoImage);

export default Image;
