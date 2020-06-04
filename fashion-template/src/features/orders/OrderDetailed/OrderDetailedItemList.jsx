import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Image, Button } from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";
import { openModal } from '../../modals/modalActions';

const mapState = (state, ownProps) => ({
  items: state.firestore.ordered.items,
  loading: state.async.loading,
  symbol: state.collection.symbol,
});

const query = ({ currentStore }) => {
  return [
    {
      collection: "Stores",
      doc: currentStore,
      subcollections: [{ collection: "Items" }],
      storeAs: "items",
    },
  ];
};

const actions = {
  openModal,
};

class OrderDetailedItemList extends Component {
  render() {
    const { items, openModal, currentStore, order, loading , symbol, currentOrderState} = this.props;


    return (
      <Card.Group className='group-orderdetail' itemsPerRow={4}>
        {order &&
          items &&
          order.orderItems.map((item) => {
            let subItemId = item.subItemId;
            let price = item.unitPrice;
            let mainItem = items.filter((product) => product.id === item.item);
            let url = null;
            if(mainItem[0].photos[0]){
               url = mainItem[0].photos[0].thumbnail;
            }
            let name = mainItem[0].name;

            return (
              <Card  className='orderdetail'>
                <Image className='order-detailed-img' src={url || "/assets/product_list_image.png"} wrapped ui={false} />
                <Card.Content textAlign="center">
                  <Card.Meta>
                    {name}
                  </Card.Meta>
                  <Card.Meta style={{fontFamily:'Lato'}}>
                    {symbol}{price.toFixed(2)}
                  </Card.Meta>
                </Card.Content>


                <Card.Content textAlign="center">
                {currentOrderState && currentOrderState.stateId == 2 && <Button onClick={() => openModal('ReviewModal', {currentStore: currentStore, item: item.item, loading: loading})} color="teal">Leave Review</Button> }
                {/*currentOrderState && currentOrderState.stateId == 1 && <Button onClick={() => openModal('OrderRecievedModal', {currentStore: currentStore, orderId: order.id, loading: loading})} color="teal">Recieved</Button> */}
                {currentOrderState && currentOrderState.stateId < 2 && <Button disabled color="teal">Leave Review</Button> }
                </Card.Content>
              </Card>
            );
          })}
      </Card.Group>
    );
  }
}

export default connect(
  mapState,
  actions
)(
  firestoreConnect((currentStore) => query(currentStore))(OrderDetailedItemList)
);
