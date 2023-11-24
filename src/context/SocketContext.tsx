import React, { ReactNode, useContext, useEffect, createContext } from 'react';
import {Socket} from 'socket.io-client';
import { ChatContext } from './chat/ChatContext';
import { AuthContext } from './auth/AuthContext';
import { useSocket } from '../hooks/useSocket';
import { types } from '../types/types';


type SocketType = {
    socket: Socket | null; // Utiliza el tipo Socket para el objeto de socket
    online: boolean;
};

type SocketProviderProps = {
    children: ReactNode;
};

export const SocketContext = createContext<SocketType>({} as SocketType);



export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => { 
    
    const { socket, online, conectarSocket, desconectarSocker } = useSocket('http://192.168.1.9:4000');

    const {status} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext)
    console.log(status)
    
    useEffect(() => {
        if(status === 'authenticated'){
            conectarSocket();
        }
    },[status,conectarSocket])
    
    
    useEffect(() => {
        if(status === 'no-authenticated'){
            desconectarSocker();
        }
    },[status,desconectarSocker])

    //escuchar los cambios en los usuarios conectados
    useEffect(() => {
        socket?.on('lista-usuarios', (usuarios:any) => {
           
           if (dispatch) {
            dispatch({
              type: types.usuariosCargados,
              payload: usuarios
            });
          }
        
        })
 
    }, [socket,dispatch])
    
    useEffect(() => {
        socket?.on('message-personal', (mensaje:any) => {
            dispatch({
                type: types.nuevoMensaje,
                payload:mensaje
            })
        })
    },[socket, dispatch])
    
    return (
        <SocketContext.Provider value={{
            socket,
            online
        }}>
            {children}
        </SocketContext.Provider>
    );
};