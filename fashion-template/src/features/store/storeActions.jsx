import { toastr } from 'react-redux-toastr'
import {FETCH_STORE} from "./storeConstants";
import {asyncActionStart,asyncActionFinish,asyncActionError
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";

export const fetchStore = store => {
  return {
    type: FETCH_STORE,
    payload: store
  };
};


export const loadStore = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let store = await fetchSampleData();
      dispatch(fetchStore(store));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
