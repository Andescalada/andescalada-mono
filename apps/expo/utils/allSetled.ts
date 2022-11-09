const allSettled = <T extends Promise<any>>(promises: T[]) => {
  return Promise.all(
    promises.map((promise) =>
      promise
        .then((value) => ({ status: "fulfilled", value }))
        .catch((reason) => {
          console.log(reason);
          return { status: "rejected", reason };
        }),
    ),
  );
};

export default allSettled;
