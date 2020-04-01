import { createReducer } from "../../app/common/util/reducerUtil";
import {   FILTER_PRODUCT_BY_SIZE } from './FilterConstants';


const initialState = { items:[], filteredItems:[], size: ''};


export const filterBySize = (state, payload) => {
  return {
    ...state,
    filteredItems: payload.items,
    size: payload.size
  }
}

export default createReducer(initialState, {
    [FILTER_PRODUCT_BY_SIZE]: filterBySize
})