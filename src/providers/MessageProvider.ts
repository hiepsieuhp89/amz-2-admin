import { createContext } from 'react';

interface IMessageContext {
  handleErrorMessage: (message?: string) => void;
  handleSuccessMessage: (message?: string) => void;
}

const MessageClientContext = createContext<IMessageContext>(
  {} as IMessageContext
);

export default MessageClientContext;
