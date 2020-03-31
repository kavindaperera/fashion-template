import { toastr } from 'react-redux-toastr';
import { createNewCartItem } from '../../app/common/util/helpers';

export const addToCart = (quantity, product) =>{
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let newCartItem = createNewCartItem (quantity, product);
    try {
      let newOrder = await firestore.add(`cart`, newCartItem);
      toastr.success('Success', 'Event has been created');
    } catch (error) {
      console.log(error)
      toastr.error('Oops', 'Something went wrong');
    }
  };
};