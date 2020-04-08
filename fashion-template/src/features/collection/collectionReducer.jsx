import { createReducer } from "../../app/common/util/reducerUtil";
import { FETCH_PRODUCTS, FETCH_SUBITEMS , GET_CURRENCY } from "./collectionConstants";

/*const initialState = firestoreReducer.ordered.products;*/
const initialState = {
  subItems:[],
  symbol: '$'
}

export const fetchProducts = (state, payload) => {
  return payload.products
}
export const fetchSubItems = (state, payload) => {
  return {...state, subItems: payload.subItems}
}

export const getCurrency = (state, payload) => {
  return {...state, symbol:payload.symbol}
}

export default createReducer(initialState, {
    [FETCH_PRODUCTS]: fetchProducts,
    [FETCH_SUBITEMS ]: fetchSubItems,
    [GET_CURRENCY]: getCurrency
})
