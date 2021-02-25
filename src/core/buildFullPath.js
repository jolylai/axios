import isAbsoluteURL from '../helpers/isAbsoluteURL';
import combineURLs from '../helpers/combineURLs';

export default function buildFullPath(baseURL, requestURL) {
  if (baseURL && !isAbsoluteURL(requestURL)) {
    return combineURLs(baseURL, requestURL);
  }

  return requestURL;
}
