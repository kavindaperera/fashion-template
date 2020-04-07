import { createReducer } from "../../app/common/util/reducerUtil";
import { FETCH_PRODUCTS, FETCH_SUBITEMS  } from "./collectionConstants";

/*const initialState = firestoreReducer.ordered.products;*/
const initialState = [];

export const fetchProducts = (state, payload) => {
  return payload.products
}
export const fetchSubItems = (state, payload) => {
  return payload.subItems
}

export default createReducer(initialState, {
    [FETCH_PRODUCTS]: fetchProducts,
    [FETCH_SUBITEMS ]: fetchSubItems
})
