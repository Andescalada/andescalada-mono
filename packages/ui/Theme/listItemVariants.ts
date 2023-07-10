import { createBoxVariant } from "./createVariants";
import { pallete } from "./pallete";

export const lisItemVariantsColors = {
  listItemBackground: pallete.grayscale.transparent[50][600],
};

export const SQUARED_LIST_ITEM_SIZE = 100;

const listItemVariants = createBoxVariant({
  defaults: {
    borderColor: "listItemBackground",
    borderWidth: 3,
    alignItems: "stretch",
    padding: "m",
    borderRadius: 5,
  },
  noPadding: {
    borderColor: "listItemBackground",
    borderWidth: 3,
    alignItems: "stretch",
    padding: "none",
    borderRadius: 5,
  },
  fill: {
    backgroundColor: "listItemBackground",
  },
  accent: {
    borderColor: "brand.primaryA",
  },
  danger: {
    borderColor: "semantic.transparent.50.error",
  },
  warning: {
    borderColor: "semantic.transparent.50.warning",
  },
  plain: {
    borderWidth: 0,
    borderColor: undefined,
  },
  squared: {
    height: SQUARED_LIST_ITEM_SIZE,
    width: SQUARED_LIST_ITEM_SIZE,
    borderRadius: 16,
  },
  squaredPrimaryA: {
    height: SQUARED_LIST_ITEM_SIZE,
    width: SQUARED_LIST_ITEM_SIZE,
    borderRadius: 16,
    borderColor: "brand.primaryA",
    backgroundColor: "brand.primaryA",
  },
  squaredPrimaryB: {
    height: SQUARED_LIST_ITEM_SIZE,
    width: SQUARED_LIST_ITEM_SIZE,
    borderRadius: 16,
    borderColor: "brand.primaryB",
    backgroundColor: "brand.primaryB",
  },
  squaredFilled: {
    height: SQUARED_LIST_ITEM_SIZE,
    width: SQUARED_LIST_ITEM_SIZE,
    borderRadius: 16,
    borderColor: "transparent",
    backgroundColor: "listItemBackground",
  },
});

export default listItemVariants;
