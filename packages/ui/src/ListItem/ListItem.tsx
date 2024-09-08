import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from "@shopify/restyle";
import Pressable from "Pressable/Pressable";

import { Theme } from "../Theme/config";

const ListItem = createRestyleComponent<
  VariantProps<Theme, "listItemVariants"> &
    React.ComponentProps<typeof Pressable>,
  Theme
>([createVariant({ themeKey: "listItemVariants" })], Pressable);

export default ListItem;
