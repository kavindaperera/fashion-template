import { toastr } from 'react-redux-toastr';

export const addToCart = (user) =>
  async () => {
    try {
      toastr.success('It\'s in the bag', ' We\'ll hold it for you')
    } catch (error) {
      console.log(error)
    }
  }