import moment from "moment";
import { Category } from "emoji-mart";

export const getCartTotal = (cartItems,items) => {
    let total = 0;
        for (var i=0; i<cartItems.length; i++){
          let cartItem = cartItems[i]
          let discountActive = false;
          let discount = 0;
          // eslint-disable-next-line no-loop-func
          items && items.forEach(item => {
            if(item.id==cartItem.item){
              if (item.discount != null) {
              const dateNow = moment().format("X");
              const startDate = item.discount.startDate.seconds;
              const endDate = item.discount.endDate.seconds;
              discountActive = startDate < dateNow && dateNow < endDate;
              discount = item.discount.percentage;}
              let subItems=item.subItems;
              subItems.forEach((subItem,i) => {
                  if(i==cartItem.subItem){
                    if(discountActive && discount > 0){
                      total += ((subItem.price * cartItem.quantity)*((100-discount)/100))
                    }else{
                      total += ((subItem.price * cartItem.quantity))
                    }
                  }
              })
            }}
            )
        } return(total.toFixed(2));
  }


export const getStockAvailability = (cartItems, items) => {
  let availability = true
  //console.log(cartItems, items)
  items && cartItems && cartItems.forEach((cartItem) => {
    let subItemId = cartItem.subItem;
    let cartQty = cartItem.quantity;
    let selectedItem = items.filter((product) => product.id == cartItem.item)[0];
    let selectedSubItem = selectedItem.subItems[subItemId];
    let stock = selectedSubItem.stock;
    if (stock == 0){
      availability = false
    }
    else if (cartQty>stock){
      availability = false
    }
  })
  return (availability)
}


export const getItemCount = (items, sortCategory, categories) => {

}


