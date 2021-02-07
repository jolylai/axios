export default function bind(fn, thisArg) {
  return function bindWrap() {
    return fn.bind(thisArg, arguments);
  };
}
