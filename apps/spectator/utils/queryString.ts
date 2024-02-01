const toSnakeCase = (text: string) => {
  return text
    .replace(/_/g, '_')
    .replace(/([A-Z])/g, '_$1')
    .replace(/^-/, '')
    .toLowerCase();
};

export const convertObjectToQueryString = (params: {
  [key: string]: string | string[];
}) => {
  const queryString = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach(valueItem => {
        queryString.append(toSnakeCase(key), valueItem || '');
      });
    } else {
      queryString.append(toSnakeCase(key), value ?? '');
    }
  });

  return queryString.toString();
};
