export const roleMapping: Record<string, string> = {
  ceo: 'CEO',
  coo: 'COO',
  cto: 'CTO',
  cmo: 'CMO',
  cio: 'CIO',
  cfo: 'CFO',
  head_data: 'Jefe de Datos',
  head_ops: 'Jefe de Operaciones',
  head_sales: 'Jefe de Ventas',
  product_owner: 'Propietario de Producto',
  it_manager: 'Gerente de TI',
  analyst: 'Analista',
  founder: 'Fundador'
};

export const getSpanishRole = (role: string): string => {
  return roleMapping[role.toLowerCase()] || role;
};
