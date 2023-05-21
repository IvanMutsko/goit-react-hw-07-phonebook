export const formatterNumber = number => {
  const part1 = number.slice(0, 3);
  const part2 = number.slice(3, 6);
  const part3 = number.slice(6, 10);
  return `${part1}-${part2}-${part3}`;
};
