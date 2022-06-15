import React, { ChangeEvent } from 'react';
import { Progress } from 'antd';
import xhr from '@/adapters/xhr';

export default function FileProgress() {
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log('files: ', files);
    for (const file of files || []) {
      upload(file);
    }
  };

  const upload = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    xhr({
      method: 'post',
      url: 'http://localhost:7070/api/file',
      data: formData,
      onUploadProgress: (e: ProgressEvent) => {
        console.log('e: ', e);
      },
    });
  };

  return (
    <div>
      <input type="file" name="file" onChange={onFileChange} />
      <Progress
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
        percent={99.9}
      />
    </div>
  );
}
