const emptyArray = (arr: any[] | undefined) => {
  if (!arr) return true;
  return arr.length === 0;
};

export default emptyArray;
