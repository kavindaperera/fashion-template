import { createReducer } from "../../app/common/util/reducerUtil";
import { GET_CURRENCY } from "./collectionConstants";


const initialState = {
  symbol: '$',
}



export const getCurrency = (state, payload) => {
  return {...state, symbol:payload.symbol}
}



export default createReducer(initialState, {
    [GET_CURRENCY]: getCurrency,
})
