import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Image, Button } from "semantic-ui-react";
import { firestoreConnect } from "react-redux-firebase";
import { openModal } from '../../modals/modalActions';

const mapState = (state, ownProps) => ({
  items: state.firestore.ordered.items,
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
    const { items, openModal,  currentStore, order } = this.props;

    return (
      <Card.Group className='group-orderdetail' itemsPerRow={2}>
        {order &&
          items &&
          order.orderItems.map((item) => {
            let subItemId = item.subItemId;
            let mainItem = items.filter((product) => product.id === item.item);
            let url = null;
            if(mainItem[0].photos[0]){
               url = mainItem[0].photos[0].thumbnail;
            }
            let name = mainItem[0].name;

            return (
              <Card className='orderdetail'>
                <Image className='order-detailed-img' src={url || "/assets/product_list_image.png"} wrapped ui={false} />
                <Card.Content textAlign="center">
                  <Card.Meta>
                    {name}
                  </Card.Meta>
                </Card.Content>

                <Card.Content textAlign="center">
                  <Button onClick={() => openModal('ReviewModal', {currentStore: currentStore, item: item.item})} color="teal">Leave Review</Button>
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
