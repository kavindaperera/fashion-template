import { GET_ORDER_HISTORY } from './ordersConstants';
import { createReducer } from "../../app/common/util/reducerUtil";

const initialState = {
    orderHistory: []
  }

export const getOrderHistory = (state, payload) => {
    return {...state, orderHistory:payload.orderHistory}
}

export default createReducer(initialState, {
    [GET_ORDER_HISTORY]: getOrderHistory
})
