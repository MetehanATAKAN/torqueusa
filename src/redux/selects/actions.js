
import { selectsTypes } from "./constant";

export const getTotalSelects=(data)=>{
    return{
        type:selectsTypes.TOTAL_SELECTS,
        payload:data
    }
}