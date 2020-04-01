import { createReducer } from "../../app/common/util/reducerUtil";
import { FETCH_PRODUCTS } from "./collectionConstants";
import { firestoreReducer } from 'redux-firestore'

/*const initialState = firestoreReducer.ordered.products;*/
const initialState = [];

export const fetchProducts = (state, payload) => {
  return payload.products
}

export default createReducer(initialState, {
    [FETCH_PRODUCTS]: fetchProducts
})
