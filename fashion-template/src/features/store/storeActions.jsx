
import {FETCH_STORE,} from "./storeConstants";
import {asyncActionStart,asyncActionFinish,asyncActionError
} from "../async/asyncActions";
import firebase from '../../app/config/firebase'




export const getStore = (storeId) => 
  async (dispatch, getState) => {
    const store = storeId;
    const firestore = firebase.firestore();
    const storeQuery = firestore.collection('store').where('storeId','==',store);
    try{
      dispatch(asyncActionStart());
      let querySnap = await storeQuery.get()
      let currentStore = [];
      for (let i=0; i < querySnap.docs.length; i++) {
        let store = {...querySnap.docs[i].data(), id: querySnap.docs[i].id};
        currentStore.push(store);
      }
      dispatch({type: FETCH_STORE, payload: {currentStore}})
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log("ERROR_ERROR",error);
      dispatch(asyncActionError())
    }
}