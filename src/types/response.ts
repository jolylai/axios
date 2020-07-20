import { RequestConfig } from './request';

export interface Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: RequestConfig;
  request: XMLHttpRequest;
}

// export interface PromiseResponse extends Promise {}
