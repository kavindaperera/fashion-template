import { toastr } from 'react-redux-toastr';
import React from 'react';
import { createNewCartItem, createNewOrderItem } from '../../app/common/util/helpers';
import {Icon,} from 'semantic-ui-react';
import firebase from '../../app/config/firebase';
import moment from "moment";
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
      console.log(newCartItem);
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

export const placeOrder = (cart, currentStore) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    //const firestore = firestore.firestore();
    const fb = getFirebase();
    const user = fb.auth().currentUser;
    console.log(cart);
    console.log(currentStore)
    if (user!==null){
      console.log(user)
      console.log(cart);
      console.log(currentStore)
    }
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
        toastr.warning('Item Removed', toastrOptions)
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
}