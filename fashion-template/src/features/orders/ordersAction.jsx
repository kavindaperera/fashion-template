import React from "react";
import firebase from "../../app/config/firebase";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../async/asyncActions";
import { GET_ORDER_HISTORY } from "./ordersConstants";
import { Icon } from "semantic-ui-react";
import { closeModal } from '../modals/modalActions'
import { toastr } from "react-redux-toastr";

export const getOrderHistory = (auth, currentStore) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    let orderHistory = [];
    if (auth && currentStore) {
      return firestore
        .collection("Stores")
        .doc(currentStore)
        .collection("Orders")
        .where("buyer", "==", auth.uid)
        .get()
        .then((dataSnapshot) => {
          let orders = dataSnapshot;
          return orders ? orders : [];
        })
        .then((orders) => {
          orders.forEach((order) => {
            orderHistory.push(order.data());
          });
        })
        .then(() => {
          dispatch({ type: GET_ORDER_HISTORY, payload: { orderHistory } });
          dispatch(asyncActionFinish());
        })
        .catch((error) => {
          console.log(error);
          dispatch(asyncActionError());
        });
    }
  };
};

export const confirmOrderRecieved = (orderId, currentStore) => {
    console.log(orderId, currentStore)
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = firebase.firestore();
    const fb = getFirebase();
    const fs = getFirestore();
    const user = fb.auth().currentUser;
    const toastrOptions = {
      timeOut: 6000,
      icon: <Icon circular name="shipping fast" size="big" />,
      progressBar: true,
    };
    if (user !== null) {
      dispatch(asyncActionStart());
      return firestore
        .collection("Stores")
        .doc(currentStore)
        .collection("Orders")
        .doc(orderId)
        .get()
        .then((dataSnapshot) => {
          let orderState = dataSnapshot.get("orderState");
          return orderState;
        })
        .then((orderState) => {
          let newState = {
            date: fs.Timestamp.fromDate(new Date()),
            stateId: 2,
          };
          orderState.push(newState);
          return firestore
            .collection("Stores")
            .doc(currentStore)
            .collection("Orders")
            .doc(orderId)
            .update({ 'orderState': orderState });

        }).then(toastr.light("Marked As Received","Please Leave A Review",toastrOptions)).then(dispatch(asyncActionFinish())).then(dispatch(closeModal()))
        .catch((error) => {
            dispatch(asyncActionError())
            toastr.error('Something went wrong', 'Please Try Again');
        });
    }else{
        toastr.error('Something went wrong', 'Please Try Again');
      }
  };
};
