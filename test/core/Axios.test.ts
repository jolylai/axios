import Axios from '../../src/core/Axios';

describe('core Axios', () => {
  test('should response interceptor', () => {
    const axios = new Axios();
    axios.interceptors.response.use(
      function(response) {
        console.log('response: 1', response);
        return response;
      },
      function(error) {
        return Promise.reject(error);
      },
    );
    axios.interceptors.response.use(
      function(response) {
        console.log('response: 2', response);
        return response;
      },
      function(error) {
        return Promise.reject(error);
      },
    );
  });
});
