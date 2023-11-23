import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useEffect, useMemo, useState } from "react"
import io, { Socket } from "socket.io-client"


export const useSocket = (serverPath:string) => {
  //const socket = useMemo(() => io(serverPath,{transports:['websocket']}),[serverPath]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [online, setOnline] = useState(false);
 
        const conectarSocket = useCallback(async() => {
            const token = await AsyncStorage.getItem('token')
            const socketTemp = io(serverPath,{
                transports: ['websocket'],
                autoConnect:true,
                forceNew:true,
                query:{
                    'x-token':token
                }
            })

            setSocket(socketTemp)
        },[serverPath])

        const desconectarSocker = useCallback(() => {
            socket?.disconnect()
        
        }, [socket]);
          

        useEffect(() => {
            // console.log(socket)
             setOnline(socket?.connected ?? false)
         }, [socket])
         
         useEffect(() => {
           socket?.on('connect', () => {
             setOnline(true)
           })
         }, [socket])
       
         useEffect(() => {
           socket?.on('disconnect', () => {
             setOnline(false)
           })
         }, [socket])
         
          
         return {socket, online,conectarSocket, desconectarSocker  }
}
