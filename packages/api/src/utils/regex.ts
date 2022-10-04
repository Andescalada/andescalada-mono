const lowercaseOnly = /^[a-z]+$/g;
const noSpaces = /^\S*$/g;
const numbersLettersAndSpecialOnly = /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9_&.\s]*$/;
const numbersAndLettersOnly = /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9\s]*$/;

export const r = {
  lowercaseOnly,
  noSpaces,
  numbersAndLettersOnly,
  numbersLettersAndSpecialOnly,
};
