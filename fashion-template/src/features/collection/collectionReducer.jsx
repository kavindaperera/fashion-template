import { createReducer } from "../../app/common/util/reducerUtil";
import { FETCH_PRODUCTS } from "./collectionConstants";


const initialState = [];

export const fetchProducts = (state, payload) => {
  return payload.products
}

export default createReducer(initialState, {
    [FETCH_PRODUCTS]: fetchProducts
})
