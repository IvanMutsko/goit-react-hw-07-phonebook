export const sortArrOfObj = array => {
  return array.slice().sort((a, b) => {
    const fa = a.name.toLowerCase();
    const fb = b.name.toLowerCase();
    return fa.localeCompare(fb);
  });
};
