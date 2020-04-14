import { createReducer } from "../../app/common/util/reducerUtil";
import { FETCH_PRODUCTS, FETCH_SUBITEMS , GET_CURRENCY, GET_VARAINTS } from "./collectionConstants";


const initialState = {
  subItems:[],
  symbol: '$',
  variants:[]
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

export const getVariants = (state, payload) => {
  return {...state, symbol:payload.variants}
}

export default createReducer(initialState, {
    [FETCH_PRODUCTS]: fetchProducts,
    [FETCH_SUBITEMS ]: fetchSubItems,
    [GET_CURRENCY]: getCurrency,
    [GET_VARAINTS]: getVariants
})
