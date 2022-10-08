import { useMemo } from "react";

const useDebounce = <T>(func: T, delay = 1000) => {
  return useMemo(
    () => debounce(func, delay),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};

export default useDebounce;

export const debounce = <T>(cb: T, wait = 20) => {
  let h: NodeJS.Timeout;
  const callable = (...args: unknown[]) => {
    clearTimeout(h);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    h = setTimeout(() => cb(...args), wait);
  };
  return <T>(<unknown>callable);
};
