export const slug = (string: string) =>
  string
    .toLowerCase()
    .trimEnd()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "-");

export const unSlug = (string: string) =>
  string
    .replace(/-/g, " ")
    .replace(
      /\w\S*/,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
    );
