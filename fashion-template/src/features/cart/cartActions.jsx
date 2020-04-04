import { toastr } from 'react-redux-toastr';
import { createNewCartItem } from '../../app/common/util/helpers';

export const addToCart = (quantity, product) =>{
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    console.log(firebase.auth().currentUser)
    if(user!==null){
      let newCartItem = createNewCartItem (user, quantity, product);
      try {
        let newOrder = await firestore.add({
          collection: 'users',
          doc: user.uid,
          subcollections: [{collection: 'storeCarts'}]
        }, {
          state: "inCart",
          order: newCartItem
        })
        toastr.success('It\'s in the bag ', 'We\'ll hold it for an hour');
      } catch (error) {
        console.log(error)
        toastr.error('Oops', 'Something went wrong');
      }
    } else {
      toastr.error('You\'re Not Logged in', 'Please Login!');
    }
    
  };
};

