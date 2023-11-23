import React, { createContext, useCallback, useEffect, useReducer, useState } from "react"
import { signalApi } from "../../api/singnalApi"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthInteface, LoginData, RegisterData, User } from "../../interface/authIterface"
import { AuthState, authReducer } from "./authReducer"


type AuthContextType = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    status: 'checkin' | 'authenticated' | 'no-authenticated';
    signIn: (loginData: LoginData) => void;
    singUp: (RegisterData: RegisterData) => void;
    logOut: () => void;
    removeError: () => void;
   
}


  
const authInicialState: AuthState = {
    status: 'checkin',
    token: null,
    user: null,
    errorMessage:''
}


export const AuthContext = createContext({} as AuthContextType) 




export const AuthProvider = ({children}:any) => {

    const [state, dispatch] = useReducer(authReducer, authInicialState)

    useEffect(() => {
    checkToken() 
    },[])

    const checkToken =async () =>{
        const token = await AsyncStorage.getItem('token')

        //no autenticado
        if(!token) return dispatch({type:'notAuthenticaded'})
        //si esta autenticado
        const resp = await signalApi.get('/renew')
        console.log(resp)
        if (resp.status !== 200) {
            return dispatch({type:'notAuthenticaded'})
        }
        await AsyncStorage.setItem('token', resp.data.token)
        dispatch({
            type: 'sinUp',
            payload:{
                token:resp.data.token,
                user: resp.data.usuario
            }
        })
    }


    const signIn = async({email, password}:LoginData) => {

        try {
            console.log(email, password)
            const {data} = await signalApi.post('/login', {email, password})
            console.log(data)
            dispatch({
                type:'sinUp',
                payload:{
                    token: data.token,
                    user: data.user,
                }
            })

            await AsyncStorage.setItem('token', data.token)

        } catch (error:any) {
            console.log(error)
            
            dispatch({
                type:'addError',
                payload: error.response.data.msg || 'Informacion incorrecta'
            })
        }
    }



    const singUp = async({nombre, email, password, imageUrl}:RegisterData) => {

        try {
            const {data} = await signalApi.post('/new', {nombre, email, password, imageUrl})
            console.log(data)
            dispatch({
                type:'sinUp',
                payload:{
                    token: data.token,
                    user: data.user,
                }
            })

            await AsyncStorage.setItem('token', data.token)

        } catch (error:any) {
            dispatch({
                type:'addError',
                payload: error.response.data.msg || 'Todos los campos son obligatirios'
            })
         
            
        }
    
    }
    
     
    const removeError = () => {
        dispatch({type:'removeError'})
    
    }

    const logOut = () => {
        dispatch({
            type:'logout'
        })
    }

    return (
        <AuthContext.Provider value={{
           ...state,
           signIn,
           singUp,
           logOut,
           removeError
           
           
        }}>
            {children}
        </AuthContext.Provider>
    )

}