import { toastr } from 'react-redux-toastr';
import { createNewCartItem } from '../../app/common/util/helpers';

export const addToCart = (quantity, product) =>{
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let newCartItem = createNewCartItem (quantity, product);
    try {
      let newOrder = await firestore.add(`cart`, newCartItem);
      toastr.success('It\'s in the bag ', 'We\'ll hold it for an hour');
    } catch (error) {
      console.log(error)
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

