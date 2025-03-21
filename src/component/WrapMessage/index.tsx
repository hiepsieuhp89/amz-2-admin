'use client';
import MessageClientContext from '@/providers/MessageProvider';
import { message } from 'antd';
import React from 'react';

function WrapMessage({ children }: { children: React.ReactNode }) {
  const [messageApi, contextHolder] = message.useMessage();
  const handleErrorMessage = (messageText?: string) => {
    message.config({
      top: 80,
    });
    messageApi.error(messageText);
  };

  const handleSuccessMessage = (messageText?: string) => {
    message.config({
      top: 80,
    });
    messageApi.success(messageText);
  };

  return (
    <MessageClientContext.Provider
      value={{
        handleErrorMessage,
        handleSuccessMessage,
      }}
    >
      {contextHolder}
      {children}
    </MessageClientContext.Provider>
  );
}

export default WrapMessage;
