import Pressable from "@andescalada/ui/Pressable/Pressable";
import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from "@shopify/restyle";

import { Theme } from "../Theme/theme";

const ListItem = createRestyleComponent<
  VariantProps<Theme, "listItemVariants"> &
    React.ComponentProps<typeof Pressable>,
  Theme
>([createVariant({ themeKey: "listItemVariants" })], Pressable);

export default ListItem;
