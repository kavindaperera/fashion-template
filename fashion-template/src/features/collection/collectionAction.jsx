import { toastr } from 'react-redux-toastr'
import { FETCH_PRODUCTS, FETCH_SUBITEMS , GET_CURRENCY }  from "./collectionConstants";
import {asyncActionStart,asyncActionFinish,asyncActionError
} from "../async/asyncActions";
import firebase from '../../app/config/firebase'
import moment from "moment";


export const getCurrency = (config,store) =>
  async (dispatch, getState) => {
  try{
    dispatch(asyncActionStart());
    let symbol = 'X';
    let currencies = config.currencies;
    const storeCurrency = store.currency;
    var value;
    Object.keys(currencies).forEach(function(key) {
      value = currencies[key];
      if (key==storeCurrency){ symbol=value}
    });
    dispatch({type: GET_CURRENCY, payload: {symbol}})
    dispatch(asyncActionFinish());
  } catch(error){
        console.log("ERROR_Currency",error)
        dispatch(asyncActionError())
  }
}


export const getDiscount = (discount) =>
  async (dispatch, getState) => {
    let discountActive = false;
    let discount = 0;
  try{
    dispatch(asyncActionStart());
    if (discount != null) {
      const dateNow = moment().format("X");
      const startDate = discount.startDate.seconds;
      const endDate = discount.endDate.seconds;
      discountActive = startDate < dateNow && dateNow < endDate;
      if (discountActive) {
        discount = discount.percentage;
      }
    }
    return { discount };
    dispatch(asyncActionFinish());
  } catch(error){
        console.log("ERROR_Discount",error)
        dispatch(asyncActionError())
  }
}




