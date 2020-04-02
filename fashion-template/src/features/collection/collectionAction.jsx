import { toastr } from 'react-redux-toastr'
import {FETCH_PRODUCTS} from "./collectionConstants";
import {asyncActionStart,asyncActionFinish,asyncActionError
} from "../async/asyncActions";
import firebase from '../../app/config/firebase'


export const getProducts = () => 
  async (dispatch, getState) => {
    let store = "7dbDylC8CZTNBPcVPJyn";
    const firestore = firebase.firestore();
    const productsQuery = firestore.collection('products').where('store','==',store);
    try {
      dispatch(asyncActionStart());
      let querySnap = await productsQuery.get()
      let products = [];
      for (let i=0; i < querySnap.docs.length; i++) {
        let product = {...querySnap.docs[i].data(), id: querySnap.docs[i].id};
        products.push(product);
      }
      console.log("XXXX",products)
      dispatch({type: FETCH_PRODUCTS, payload: {products}})
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }