import { types } from "../../types/types";
import { AppState } from "./ChatContext";



export const chatReducer = ( state:AppState , action:any ) => {
    switch (action.type) {
        
        case types.usuariosCargados:
            return {
                ...state,
                usuarios: action.payload
            }
        case types.activarChat:
            if(state.chatActivo === action.payload) return state
            
            return{
                ...state,
                chatActivo: action.payload
            }

        case types.nuevoMensaje:
            if(state.chatActivo === action.payload.de || state.chatActivo === action.payload.para){
                console.log(action.payload)
                return {
                    ...state,
                    mensajes: [...state.mensajes, action.payload]
                }
            }else {
                return state
            }
                
        case types.cargarMensajes:
            return{
                ...state,
                mensajes: action.payload
            }    
    
        default:
            return state
           
    
        }
}