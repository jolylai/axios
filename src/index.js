import Axios from './core/Axios';
import bind from './helpers/bind';

const createInstance = config => {
  const context = new Axios(config);
  const instance = bind(Axios.prototype.request, context);
};

export default Axios;
