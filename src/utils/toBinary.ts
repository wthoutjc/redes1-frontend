const toBinary = (num: number): number => {
  if (num === 0) {
    return 0;
  }

  let binario = 0;
  let factor = 1;

  while (num > 0) {
    binario += (num % 2) * factor;
    num = Math.floor(num / 2);
    factor *= 10;
  }

  return binario;
};

export { toBinary };
