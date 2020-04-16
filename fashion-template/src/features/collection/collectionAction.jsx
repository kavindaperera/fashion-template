import { toastr } from 'react-redux-toastr'
import { FETCH_PRODUCTS, FETCH_SUBITEMS , GET_CURRENCY }  from "./collectionConstants";
import {asyncActionStart,asyncActionFinish,asyncActionError
} from "../async/asyncActions";
import firebase from '../../app/config/firebase'


/*export const getProducts = (storeId) => 
  async (dispatch, getState) => {
    let store = storeId;
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
      console.log("action",products)
      dispatch({type: FETCH_PRODUCTS, payload: {products}})
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log("ERROR_ERROR_ERROR_ERROR",error)
      dispatch(asyncActionError())
    }
  }*/

  /*export const getSubItems = (itemId,storeId) =>
    async (dispatch, getState) => {
      dispatch(asyncActionStart());
      const firestore = firebase.firestore();
      console.log('ids',itemId,storeId)
      const subItems = [];
      const itemQuery = firestore.collection('Stores').doc(storeId).collection('Items').doc(itemId);

      try{
        dispatch(asyncActionStart());
        let itemQuerySnap = await itemQuery.get()
        const subItemQuery = firestore.collection('Stores').doc(storeId).collection('SubItems').where('item','==',itemQuery);
        let subItemQuerySnap = await subItemQuery.get()
        subItemQuerySnap.forEach(doc => {
          let subItem = doc.data();
          if (subItem.item){subItem.item.get().then(res => {
            subItem.item = res.data();
            subItems.push(subItem);
          })}
        })
        dispatch({type: FETCH_SUBITEMS, payload: {subItems}})
        dispatch(asyncActionFinish());

      } catch (error){
        console.log("ERROR_ERROR_ERROR_ERROR",error)
        dispatch(asyncActionError())
      }
  }*/


/*export const getSubItems = (item,store) =>
  async (dispatch, getState) => {
    try{
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    const subItemRefs = item.subItems;
    const subItems = [];
    const subItemIds = [];
    subItemRefs.map(subItem => {
      subItemIds.push(subItem.id)
  })
    subItemIds.map(id => {
      const subItemQuery = firestore.collection('Stores').doc(store).collection('SubItems').doc(id);
      let getDoc = subItemQuery.get()
      .then(doc => {
        subItems.push(doc.data());
    })
  })
  console.log(subItems)
  dispatch({type: FETCH_SUBITEMS, payload: {subItems}})
  dispatch(asyncActionFinish());

}catch(error){
  console.log("ERROR_ERROR_ERROR_ERROR",error)
        dispatch(asyncActionError())
}
}*/


export const getCurrency = (config,store) =>
  async (dispatch, getState) => {
  try{
    dispatch(asyncActionStart());
    let symbol = 'X';
    const currencies = config.currencies;
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

