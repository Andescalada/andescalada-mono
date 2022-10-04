export const slug = (string: string) =>
  string
    .toLowerCase()
    .trimEnd()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "-");
