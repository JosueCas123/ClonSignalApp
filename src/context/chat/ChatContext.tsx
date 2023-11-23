import React, { createContext, useReducer, ReactNode } from 'react';
import { chatReducer } from './chatReducer';


export interface AppState {
  uid: string;
  chatActivo: null | string;
  usuarios: string[];
  mensajes:string [];
}

interface ChatContextType {
  chatState: AppState;
  dispatch: React.Dispatch<any>;
}

export const ChatContext = createContext({} as ChatContextType);

const initialState: AppState = {
  uid: '',
  chatActivo: null,
  usuarios: [],
  mensajes: [],
};

type ChatProviderProps = {
  children: ReactNode;
};

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};