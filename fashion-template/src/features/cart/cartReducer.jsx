import { GET_CART } from './cartConstants';
import { createReducer } from "../../app/common/util/reducerUtil";

const initialState = {
    cart: []
  }

export const getCart = (state, payload) => {
    return {...state, cart:payload.cart}
}

export default createReducer(initialState, {
    [GET_CART]: getCart
})
