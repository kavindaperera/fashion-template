import * as moment from 'moment';


export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object).map(e => Object.assign(e[1], {id: e[0]}))
  }
}

export const createNewCartItem = (item,subItem,price) => {
  return {
    item: item.id,
    subItem: subItem,
    price: price,
    quantity: 1,
    added: moment().format('YYYY-MM-DD')

    }
  }

export const createNewOrderItem = (cartItem, item, subItem)  => {
  let price = 0;
  let discountActive = false;
  let discount = 0;
  if (item.discount!=null){
    const dateNow = moment().format("X");
    const startDate = item.discount.startDate.seconds;
    const endDate = item.discount.endDate.seconds;
    discountActive = startDate < dateNow && dateNow < endDate;
    discount = item.discount.percentage;
  }
  if(discountActive && discount > 0){
    price += ((subItem.price)*((100-discount)/100))
  }else{
    price += ((subItem.price))
  }

  return {
    item: cartItem.item,
    noOfItems: cartItem.quantity,
    subItemId: cartItem.subItem,
    unitPrice: price
  }
}


export const createNewReviewObj = (buyer, review) =>{
  return {
    buyer: buyer.uid,
    rating: review.rating,
    comment: review.comment
  }
}