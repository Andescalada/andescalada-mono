const lowercaseOnly = /^[a-z]+$/g;
const noSpaces = /^\S*$/g;
const numbersLettersAndSpecialOnly = /^[A-Za-z0-9_&.\s]*$/;
const numbersAndLettersOnly = /^[A-Za-z0-9\s]*$/;

export const r = {
  lowercaseOnly,
  noSpaces,
  numbersAndLettersOnly,
  numbersLettersAndSpecialOnly,
};
