import { createReducer } from "../../app/common/util/reducerUtil";
import { FETCH_STORE } from "./storeConstants";



const initialState = {
}

/*stores:  "7dbDylC8CZTNBPcVPJyn" , "Yf2zTsC4IGCpufdop111" */

export const fetchStore = (state, payload) => {
  return payload.store
}



export default createReducer(initialState, {
    [FETCH_STORE]: fetchStore,

})
