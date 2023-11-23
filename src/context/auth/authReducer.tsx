import { User } from "../../interface/authIterface";


export interface AuthState {
    status: 'checkin' | 'authenticated' | 'no-authenticated';
    token: string | null;
    errorMessage: string;
    user:User | null
}

type AuthAction = 
    | {type: 'sinUp', payload:{token:string , user:User} }
    | {type: 'addError', payload:string} 
    | {type: 'removeError' }
    | {type:'notAuthenticaded'}
    | {type:'logout'}

export const authReducer = (state:AuthState, action:AuthAction):AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'no-authenticated',
                token: null,
                errorMessage:action.payload
            }
        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }
        case 'sinUp':
            return {
                ...state,
                status: 'authenticated',
                errorMessage: '',
                token: action.payload.token,
                user: action.payload.user,
            }

        case 'notAuthenticaded':
        case 'logout':
            return {
                ...state,
                token: null,
                user: null,
                status: 'no-authenticated',
            }
        default:
            return state;
    }

}