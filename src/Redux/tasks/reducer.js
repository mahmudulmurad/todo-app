import {
    Loading_Tasks,
    Fetch_Tasks,
    Fail_Calling_Tasks,
    Remove_Item,
    Get_Single_Item,
    Filter_Tasks_From_Search
} from './actionType';

let initialTaskState ={
    loading:false,
    tasks:[],
    tasks2:[],
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
                task:{},
                tasks2:[]
            }
        case Fetch_Tasks:
            return{
                loading:false,
                tasks:action.payload,
                error:'',
                task:{},
                tasks2:action.payload
            }
        case Filter_Tasks_From_Search:
            return{
                ...state,
                tasks:state.tasks,
                tasks2:state.tasks.filter(
                task => task.name.includes(action.payload)
                ),
                error:'',
                loading:false,
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
                task:{},
                tasks2:state.tasks2.filter(
                    task => task._id !==action.payload
                    ),
            }
            case Get_Single_Item:
                return{
                    ...state,
                    tasks:state.tasks,
                    task:state.tasks[action.payload],
                    error:'',
                    loading:false,
                    tasks2:state.tasks2
                }
        case Fail_Calling_Tasks:
            return{
                ...state,
                loading:false,
                tasks:[],
                error:action.payload,
                task:{},
                tasks2:[]
            }

        default:return state;
    }
}

