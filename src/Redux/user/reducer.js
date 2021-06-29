import {Set_Current_User,Fail_Current_User,Logout_Current_User} from './actionType';

const initial_userState={
    current_user:{},
    error:'',
    isUser:false
}

export const userReducer=(state=initial_userState,action)=>{
    switch (action.type) {
        case Set_Current_User:
            return{
                current_user:action.payload,
                error:'',
                isUser:true
            }
        case Fail_Current_User:
            return{
                current_user:{},
                error:action.payload,
                isUser:false
            }
        case Logout_Current_User:
            return{
                current_user:{},
                error:'',
                isUser:false
            }
        default:return state;
    }
}