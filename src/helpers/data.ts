import { isPlainObject } from '@/utils';

export const processData = (data: any) => {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
};
