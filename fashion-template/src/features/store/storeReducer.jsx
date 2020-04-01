import { createReducer } from "../../app/common/util/reducerUtil";
import { FETCH_STORE } from "./storeConstants";


const initialState = {
  currentStore: "7dbDylC8CZTNBPcVPJyn"
}

export const fetchStore = (state, payload) => {
  return payload.store
}

export default createReducer(initialState, {
    [FETCH_STORE]: fetchStore 
})
