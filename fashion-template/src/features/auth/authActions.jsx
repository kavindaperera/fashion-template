import { SubmissionError, reset } from 'redux-form'
import { closeModal } from '../modals/modalActions'
import { toastr } from 'react-redux-toastr'
import {Icon,} from 'semantic-ui-react';
import React from 'react';

export const login = (creds) => {
  return async (dispatch, getState, {getFirebase})=> {
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal())
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: 'Login failed'
      })
    }
  }
} 

export const registerUser = (user) => 
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      // create the user in firebase auth
      let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
      console.log(createdUser);
      // update the auth profile
      await createdUser.updateProfile({
        displayName: user.displayName
      })
      // create a new profile in firestore
      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      }
      await firestore.set(`users/${createdUser.uid}`, {...newUser})
      dispatch(closeModal());
    } catch (error) {
      console.log(error)
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

export const socialLogin = (selectedProvider, currentStore) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const toastrOptions = {
      icon: (<Icon  circular name='user outline' size='big' />),
    }
    try {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      dispatch(closeModal());
      let user = await firebase.login({
        provider: selectedProvider,
        type: 'popup'
      })
      let buyerAccount = await firestore.get({
        collection:'Stores',
        doc:currentStore,
        subcollections:[{collection:'Buyers', doc: user.user.uid }]
      });

      if (!buyerAccount.data()){  //Checking whether new user
        await firestore.set({
          collection:'Stores',
          doc:currentStore,
          subcollections:[{collection:'Buyers', doc: user.user.uid }]
        },
        { avatarUrl: user.profile.avatarUrl,
          displayName: user.profile.displayName,
          cart:[],
          email: user.profile.email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        toastr.light('New User', `Welcome to our store, ${user.user.displayName} !`,toastrOptions)
      }else{
        await firestore.update({
          collection:'Stores',
          doc:currentStore,
          subcollections:[{collection:'Buyers', doc: user.user.uid }]
        },
        { displayName: user.profile.displayName,
          email: user.profile.email,
        });
        toastr.light('Hello', `Welcome to our the Store`,toastrOptions)
      }
    } catch (error) {
      console.log(error)
      toastr.error('Error', 'Error Occured While Login, Try Again!')
    }
  }

export const updatePassword = (creds) => 
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    try{
      await user.updatePassword(creds.newPassword1);
      await dispatch(reset('account'));
      toastr.success('Success', 'Your password has been successfully changed')
    } catch (error) {
      throw new SubmissionError ({
        _error: error.message
      })
    }
  }