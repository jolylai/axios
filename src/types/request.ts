export type Method = 'get' | 'post' | 'put' | 'pathch' | 'delete' | 'options';

export interface RequestConfig {
  url: string;
  method: Method;
  data?: any;
  params?: any;
  headers?: any;
}
