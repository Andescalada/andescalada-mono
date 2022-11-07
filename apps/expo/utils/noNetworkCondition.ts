export const noNetwork = (err?: { message: string }) =>
  err?.message === "Network request failed";
