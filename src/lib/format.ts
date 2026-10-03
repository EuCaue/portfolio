export const fill = (text: string, vars: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
