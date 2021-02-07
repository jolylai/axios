const toString = Object.prototype.toString;

export const isArray = val => {
  return toString.call(val) === '[object Array]';
};

export const isDate = val => {
  return toString.call(val) === '[object Date]';
};

export const isObject = val => {
  return val !== null && typeof val === 'object';
};

export const isPlainObject = val => {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
};

export const isURLSearchParams = val => {
  return (
    typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
  );
};

export const isUndefined = val => {
  return typeof val === 'undefined';
};

export const forEach = (obj, fn) => {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      console.log('key: ', key);
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
};

export const merge = () => {
  const result = {};

  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
};

console.log('merge({}, {a : 1}): ', merge({}, { a: 1 }));
