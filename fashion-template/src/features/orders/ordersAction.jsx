import React from 'react';
import firebase from '../../app/config/firebase';
import {asyncActionStart,asyncActionFinish,asyncActionError} from "../async/asyncActions";
import { GET_ORDER_HISTORY  } from './ordersConstants'



export const getOrderHistory = (auth, currentStore) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch(asyncActionStart());
        const firestore = firebase.firestore();
        let orderHistory = []
        console.log(auth.uid, currentStore)
        if(auth && currentStore){
            return firestore
                .collection('Stores')
                .doc(currentStore)
                .collection('Orders')
                .get()
                .then(dataSnapshot => {
                    let orders = dataSnapshot
                    return orders ? orders :[]
                })
                .then(orders => {
                    orders.forEach(order => {
                        if(order.get('buyer') == auth.uid){
                            orderHistory.push(order.data())
                        }
                    })
                }).then( () => {
                    dispatch({type: GET_ORDER_HISTORY , payload: {orderHistory} })
                    dispatch(asyncActionFinish());
                })
                .catch((error) => {
                    console.log(error)
                    dispatch(asyncActionError())
                  })
        }
    }
}