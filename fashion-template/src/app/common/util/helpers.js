

export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object).map(e => Object.assign(e[1], {id: e[0]}))
  }
}

export const createNewCartItem = (quantity, product) => {
  return {
    productName: product.productName,
    photoURL:product.photoURL[0],
    price: product.price,
    discount: product.discount,
    quantity: quantity,
    created: Date.now()

    }
  }