import { toastr } from 'react-redux-toastr'
import {FETCH_STORE,} from "./storeConstants";
import {asyncActionStart,asyncActionFinish,asyncActionError
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";
import firebase from '../../app/config/firebase'

export const fetchStore = store => {
  return {
    type: FETCH_STORE,
    payload: store
  };
};

