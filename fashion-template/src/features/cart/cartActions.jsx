import { toastr } from 'react-redux-toastr';
import React from 'react';
import { createNewCartItem, createNewOrderItem } from '../../app/common/util/helpers';
import {Icon,} from 'semantic-ui-react';
import firebase from '../../app/config/firebase';
import {asyncActionStart,asyncActionFinish,asyncActionError} from "../async/asyncActions";
import { GET_CART } from './cartConstants'

export const addToCart = (item,subItem,price,currentStore) =>{
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = firebase.firestore();
    const fb = getFirebase();
    const user = fb.auth().currentUser;
    const toastrOptions = {
      timeOut: 6000,
      icon: (<Icon  circular name='shopping bag' size='big' />),
      progressBar: true,
    }
    if(user!==null){
      let newCartItem = createNewCartItem (item,subItem,price);
      //console.log(newCartItem);
        return firestore 
          .collection('Stores')
          .doc(currentStore)
          .collection('Buyers')
          .doc(user.uid)
          .get()
        .then(dataSnapshot => {
          let cart = dataSnapshot.get('cart')
          return cart ? cart : []
        })
        .then(cart => {
          cart.forEach(i => {
            if (newCartItem.item == i.item && newCartItem.subItem == i.subItem){
              throw new Error ("Item already in the cart")
            }
          })
          cart.push(newCartItem)
          console.log(cart)
          return firestore
            .collection('Stores')
            .doc(currentStore)
            .collection('Buyers')
            .doc(user.uid)
            .update({ 'cart' : cart})
            .then(
              toastr.success('Added To Bag', 'Don’t miss out: Items in your bag are not reserved until payment is complete', toastrOptions))
        }
        ).catch((error) => {
       console.log(error)
       toastr.light("Item already in the cart", "Increase the quantity instead",toastrOptions);
     })
  }else{
    toastr.error('You\'re Not Logged in', 'Please Login!');
  }
}}

export const placeOrder = (cart, currentStore, items, details) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const fb = getFirebase();
    const user = fb.auth().currentUser;
    let orderItems= []
    //let NewOrderItem = createNewCartItem (cartItem, item, subItem);
    if (user!==null && items && details){
      dispatch(asyncActionStart());
      const orderId = details.id
      const address = details.purchase_units[0].shipping
      const amount = details.purchase_units[0].amount.value
      cart.forEach((cartItem) => {
        let subItemId = cartItem.subItem;
        let selectedItem = items.filter((product) => product.id === cartItem.item)[0];
        let selectedSubItem = selectedItem.subItems[subItemId];
        let NewOrderItem = createNewOrderItem (cartItem, selectedItem, selectedSubItem);
        orderItems.push(NewOrderItem)
        //dispatch(addToPurchases(user.uid, cartItem, selectedSubItem ,currentStore))
        //dispatch(removeFromCart(cartItem, currentStore))
      })
      return firestore.set({
        collection:'Stores',
        doc:currentStore,
        subcollections:[{collection:'Orders', doc:orderId}]
      },
      { id: orderId,
        buyer: user.uid,
        orderItems: orderItems,
        date: firestore.Timestamp.fromDate(new Date()),
        orderState: [{date: firestore.Timestamp.fromDate(new Date()) , stateId: 0}],
        shippingAddress: address,
        totalPrice: amount
      })
      .then( () =>
      cart.forEach((cartItem) => {
        let subItemId = cartItem.subItem;
        let selectedItem = items.filter((product) => product.id === cartItem.item)[0];
        let selectedSubItem = selectedItem.subItems[subItemId];
        dispatch(addToPurchases(user.uid, cartItem, selectedSubItem ,currentStore))
        dispatch(removeFromCart(cartItem, currentStore))
      })
      ).then(
        dispatch(asyncActionFinish())
      ).catch((error) => {
        console.log(error)
        toastr.light("Error");
      })
    }
  }
}

//TODO
export const decrementStock = (cart, currentStore, items, ) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    console.log('reserving running')
    const firestore = firebase.firestore();
    const batch = firestore.batch();
    const fb = getFirebase();
    const user = fb.auth().currentUser;
    if (user!==null && items ){
      dispatch(asyncActionStart());
      cart.map((cartItem) => {
        let selectedItem = items.filter((product) => product.id === cartItem.item)[0];
        let subItems = selectedItem.subItems;
        console.log(subItems)
        const newStock = subItems[cartItem.subItem].stock - cartItem.quantity;
        subItems[cartItem.subItem].stock = newStock;
        console.log(subItems)

        const itemDocRef = firestore
          .collection('Stores')
          .doc(currentStore)
          .collection('Items')
          .doc(cartItem.item);
        batch.update(itemDocRef, {subItems})
      });
      batch.commit()
      .then(() => {
        dispatch(asyncActionFinish())
      })
      .catch((error => {
        dispatch(asyncActionError())
      }))
    }
  }
}

//TODO
export const incrementStock = (cart, currentStore, items, ) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    console.log('replacing running')
    const firestore = firebase.firestore();
    const batch = firestore.batch();
    const fb = getFirebase();
    const user = fb.auth().currentUser;
    if (user!==null && items ){
      dispatch(asyncActionStart());
      cart.map((cartItem) => {
        let selectedItem = items.filter((product) => product.id === cartItem.item)[0];
        let subItems = selectedItem.subItems;
        console.log(subItems)
        const newStock = subItems[cartItem.subItem].stock + cartItem.quantity;
        subItems[cartItem.subItem].stock = newStock;
        console.log(subItems)

        const itemDocRef = firestore
          .collection('Stores')
          .doc(currentStore)
          .collection('Items')
          .doc(cartItem.item);
        batch.update(itemDocRef, {subItems})
      });
      batch.commit()
      .then(() => {
        dispatch(asyncActionFinish())
      })
      .catch((error => {
        dispatch(asyncActionError())
      }))
    }
  }
}




export const addToPurchases = (userId, cartItem, subItem, currentStore) => {
  return async (gistpacth, getState, { getFirebase, getFirestore}) => {
    const firestore = firebase.firestore();
    const fs = getFirestore();
    return firestore 
      .collection('Stores')
      .doc(currentStore)
      .collection('Items')
      .doc(cartItem.item)
      .collection('Purchases')
      .doc()
      .set({
        buyer: userId,
        date: fs.Timestamp.fromDate(new Date()),
        noOfItems: cartItem.quantity,
        subItem: cartItem.subItem,
        unitPrice: subItem.price
      })
  }
}

export const removeFromCart = (item,currentStore) =>{
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const toastrOptions = {
      timeOut: 3000,
      icon: (<Icon  circular name='shopping bag' size='big' />),
      progressBar: true,
    }
    if(user!==null){
      try {
        await firestore.update({
          collection:'Stores',
          doc:currentStore,
          subcollections:[{collection:'Buyers', doc: user.uid }]
        },
        {
          cart:firebase.firestore.FieldValue.arrayRemove(item),
        });
        toastr.light('Item Removed', toastrOptions)
     } catch (error) {
       console.log(error)
       toastr.error('Oops', 'Something went wrong');
     }
    } else {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};


export const incrementQty = (index, currentStore) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = firebase.firestore();
    const fb = getFirebase();
    const user = fb.auth().currentUser;
    const toastrOptions = {
      timeOut: 1000,
      icon: (<Icon  circular name='shopping bag' size='big' />),
      progressBar: true,
    }
    console.log(user.uid,index, currentStore)

    if(user!==null){
      dispatch(asyncActionStart());
        return firestore
          .collection('Stores')
          .doc(currentStore)
          .collection('Buyers')
          .doc(user.uid)
          .get()
          .then(dataSnapshot => {
            let cart = dataSnapshot.get('cart')
            return cart ? cart :[]
          })
          .then( cart => {
            cart[index].quantity += 1;
            console.log(cart)
            return firestore
              .collection('Stores')
              .doc(currentStore)
              .collection('Buyers')
              .doc(user.uid)
              .update({'cart' : cart})
          })
          .then( () => {
            toastr.light('Item Quantity Changed',toastrOptions)
            //window.location.reload(false);
            dispatch(asyncActionFinish());
          })
          .catch((error) => {
            dispatch(asyncActionError())
            toastr.error("error", error.message)
          })
    }
  }
}


export const decrementQty = (index, currentStore) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = firebase.firestore();
    const fb = getFirebase();
    const user = fb.auth().currentUser;
    const toastrOptions = {
      timeOut: 4000,
      icon: (<Icon  circular name='shopping bag' size='big' />),
      progressBar: true,
    }
    console.log(user.uid,index, currentStore)

    if(user!==null){
      dispatch(asyncActionStart());
        return firestore
          .collection('Stores')
          .doc(currentStore)
          .collection('Buyers')
          .doc(user.uid)
          .get()
          .then(dataSnapshot => {
            let cart = dataSnapshot.get('cart')
            return cart ? cart :[]
          })
          .then( cart => {
            if(cart[index].quantity>1){
            cart[index].quantity -= 1;
          }
            console.log(cart)
            return firestore
              .collection('Stores')
              .doc(currentStore)
              .collection('Buyers')
              .doc(user.uid)
              .update({'cart' : cart})
          })
          .then( () => {
            toastr.light('Item Quantity Changed',toastrOptions)
            dispatch(asyncActionFinish());
          })
          .catch((error) => {
            toastr.error("error", error.message)
            dispatch(asyncActionError())
          })
    }
  }
}

export const getCart = (user) =>
  async (dispatch, getState) => {
    const cart = user.cart;
    dispatch({type: GET_CART, payload: {cart}})
    //console.log(cart)
}