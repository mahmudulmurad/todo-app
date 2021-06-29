import {
    Loading_Tasks,
    Fetch_Tasks,
    Fail_Calling_Tasks,
    Remove_Item,
    Get_Single_Item
} from './actionType';

let initialTaskState ={
    loading:false,
    tasks:[],
    error:'',
    task:{}
}
export const taskReducer = (state=initialTaskState,action) =>{
    switch (action.type) {
        case Loading_Tasks:
            return{
                loading:true,
                tasks:[],
                error:'',
                task:{}
            }
        case Fetch_Tasks:
            return{
                loading:false,
                tasks:action.payload,
                error:'',
                task:{}
            }
        case Remove_Item:
            return{
                ...state,
                tasks:state.tasks.filter(
                task => task._id !==action.payload
                ),
                error:'',
                loading:false,
                task:{}
            }
            case Get_Single_Item:
                return{
                    ...state,
                    tasks:state.tasks,
                    task:state.tasks[action.payload],
                    error:'',
                    loading:false
                }
        case Fail_Calling_Tasks:
            return{
                loading:false,
                tasks:[],
                error:action.payload,
                task:{}
            }

        default:return state;
    }
}

// case Filter_Tasks_From_Search:
//                 return{
//                     ...state,
//                     tasks:state.tasks.filter(
//                     task => task.name.includes(action.payload)
//                     ),
//                     error:'',
//                     loading:false,
//                     task:{}
//                 }