export const getSelectedNames = (ids: string[], source: {id: string, name: string}[]) => {
  const names = ids.map(id => source.find(s => s.id === id)?.name).filter(Boolean);
  if (names.length === 0) return 'None Selected';
  if (names.length > 2) return `${names.slice(0, 2).join(', ')} & ${names.length - 2} more`;
  return names.join(', ');
};

export const getAllSelectedNames = (ids: string[], source: {id: string, name: string}[]) => {
  return ids.map(id => source.find(s => s.id === id)?.name).filter(Boolean).join(', ') || 'None';
};

export const formatCurrency = (value: string | number) => {
  if (!value) return 'Not set';
  const numValue = typeof value === 'string' ? Number(value) : value;
  return numValue ? `$${numValue.toLocaleString()}` : 'Not set';
};

export const getStepTitle = (step: number) => {
  const titles = ['Setup', 'Column Selection', 'Summary', 'Execution', 'Results'];
  return titles[step - 1] || 'Unknown';
};
