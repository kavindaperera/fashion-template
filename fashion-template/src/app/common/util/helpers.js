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