import { forEach } from '../utils';

const normalizeHeaderName = (headers, normalizedName) => {
  forEach(headers, (value, name) => {
    if (name !== normalizeHeaderName && name.toUpperCase() === normalizedName) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

export default normalizeHeaderName;
