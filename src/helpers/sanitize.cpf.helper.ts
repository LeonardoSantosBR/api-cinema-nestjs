export const sanitizeCpf = (cpf: string) => {
  return cpf.replace(/[.-]/g, '');
};
