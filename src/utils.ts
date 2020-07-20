const toString = Object.prototype.toString;

export const isDate = (val: any) => {
  return toString.call(val) === '[object Date]';
};

export const isObject = (val: any) => {
  return val !== null && typeof val === 'object';
};

export const isPlainObject = (val: any) => {
  return toString.call(val) === '[object Object]';
};

export const isURLSearchParams = (val: any) => {
  return (
    typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
  );
};
