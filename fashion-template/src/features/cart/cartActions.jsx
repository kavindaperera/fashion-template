import { toastr } from 'react-redux-toastr';
import React from 'react';
import { createNewCartItem } from '../../app/common/util/helpers';
import {Icon,} from 'semantic-ui-react';
import firebase from '../../app/config/firebase'

/*export const addToCart = (item,subItem,price,currentStore) =>{
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const toastrOptions = {
      timeOut: 3000,
      icon: (<Icon  circular name='shopping bag' size='big' />),
      progressBar: true,
    }
    //console.log(firebase.auth().currentUser)
    if(user!==null){
      let newCartItem = createNewCartItem (item,subItem,price,);
      console.log(newCartItem);
      try {
        await firestore.update({
          collection:'Stores',
          doc:currentStore,
          subcollections:[{collection:'Buyers', doc: user.uid }]
        },
        {
          cart:firebase.firestore.FieldValue.arrayUnion(newCartItem),
        });
        toastr.success('Added To Bag', 'Don’t miss out: Items in your bag are not reserved until payment is complete', toastrOptions)
     } catch (error) {
       console.log(error)
       toastr.error('Oops', 'Something went wrong');
     }
    } else {
      toastr.error('You\'re Not Logged in', 'Please Login!');
    }
  };
};*/


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


export const editItemQuantity = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
  console.log("changing quantity")
  }

}
