import { createReducer } from "../../app/common/util/reducerUtil";
import { SORT_BY,  FILTER_PRODUCT_BY_SIZE } from './FilterConstants';


const initialState = { items:[], filteredItems:[], size: ''};

export const sortBy = (state, payload) => {
  return {
    ...state,
    sortBy: payload.sort_by
};
}

export const filterBySize = (state, payload) => {
  return {
    ...state,
    filteredItems: payload.items,
    size: payload.size
  }
}

export default createReducer(initialState, {
    [SORT_BY]: sortBy,
    [FILTER_PRODUCT_BY_SIZE]: filterBySize
})