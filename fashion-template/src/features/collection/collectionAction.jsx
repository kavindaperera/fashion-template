import { toastr } from 'react-redux-toastr'
import {FETCH_PRODUCTS} from "./collectionConstants";
import {asyncActionStart,asyncActionFinish,asyncActionError
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";

export const fetchProducts = products => {
  return {
    type: FETCH_PRODUCTS,
    payload: products
  };
};


export const loadProducts = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let products = await fetchSampleData();
      dispatch(fetchProducts(products));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
