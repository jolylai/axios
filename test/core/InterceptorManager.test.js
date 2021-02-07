import InterceptorManager from '../../src/core/InterceptorManager';

describe('core InterceptorManager', () => {
  test('should ', () => {
    const chain = [];
    const responseInterceptor = new InterceptorManager();

    responseInterceptor.use(1, 2);

    responseInterceptor.use(3, 4);

    responseInterceptor.forEach(interceptor => {
      console.log('interceptor: ', interceptor);
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    expect(chain).toEqual([1, 2, 3, 4]);
  });
});
