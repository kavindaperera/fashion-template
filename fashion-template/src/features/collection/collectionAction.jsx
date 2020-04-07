import { toastr } from 'react-redux-toastr'
import {FETCH_PRODUCTS} from "./collectionConstants";
import {asyncActionStart,asyncActionFinish,asyncActionError
} from "../async/asyncActions";
import firebase from '../../app/config/firebase'


export const getProducts = (storeId) => 
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
  }

  export const getSubItems = (itemId,storeId) =>
    async (dispatch, getState) => {
      dispatch(asyncActionStart());
      const firestore = firebase.firestore();
      console.log('ids',itemId,storeId)
      const subItems = [];
      const itemQuery = firestore.collection('Stores').doc(storeId).collection('Items').doc(itemId);
      console.log('1',itemQuery);
      try{ 
        dispatch(asyncActionStart());
        let itemQuerySnap = await itemQuery.get()
        console.log('2',itemQuerySnap)
        const subItemQuery = firebase.collection('Stores').doc(storeId).collection('SubItems').where('item','==',itemQuery);
        let subItemQuerySnap = await subItemQuery.get()
        console.log('3',subItemQuerySnap)

      } catch (error){
        console.log("ERROR_ERROR_ERROR_ERROR",error)
        dispatch(asyncActionError())
      }

      /*docRef.get().then(doc => {
        if (doc.exists){
          firebase.collection('Stores').doc(storeId).collection('SubItems').where('item','==',docRef).get().then(querySnapshot => {
            querySnapshot.forEach(docu => {
              let subItem = docu.data(); //data of subitem
              if (subItem.item){subItem.item.get().then(res => {
                subItem.item = res.data();
                subItems.push(subItem);
                console.log('subItems',subItems)
              })}
            })
          })
        }
      }) */

    }