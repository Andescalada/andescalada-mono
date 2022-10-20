const createExpiration = (time: number) => {
  const d = new Date();
  return d.setTime(d.getTime() + time);
};

export default createExpiration;
