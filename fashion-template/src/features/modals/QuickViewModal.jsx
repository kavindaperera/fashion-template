import React from "react";
import { Modal, Grid, Dropdown, Button } from "semantic-ui-react";
import { closeModal } from "./modalActions";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";

const actions = {
  closeModal,
};

const mapState = (state, ownProps) => ({
  data: state.modals.modalProps,
});

const QuickViewModal = ({ closeModal, data }) => {
  return (
    <Modal size="large" closeIcon="close" open={true} onClose={closeModal}>
      {data && (
        <Modal.Content>
          <Grid>
            <Grid.Column width={8}>
              <Carousel
                className="carousel-home"
                swipeable={true}
                showThumbs={false}
                showStatus={true}
                infiniteLoop={true}
              >
                {data.product.photos &&
                  data.product.photos.map((photo, i) => (
                    <img
                      class="carousel-quick-view"
                      alt="a"
                      key={photo}
                      src={
                        photo.url ||
                        photo.thumbnail ||
                        "/assets/product_list_image.png"
                      }
                    />
                  ))}
              </Carousel>
            </Grid.Column>
            <Grid.Column verticalAlign='middle' width={8}>
              <Grid centered>
                <Grid.Row textAlign="center">
                  <p style={{ color: "grey", fontSize: "2rem" }}>
                    {_.upperCase(data.product.name)}
                  </p>
                </Grid.Row>
                <Grid.Row>
                  {data.product.variants &&
                    data.product.variants.map((variant, i) => {
                      let title = variant.title;
                      let attributes = variant.attributes;
                      console.log(title);
                      let map = [];
                      // eslint-disable-next-line no-lone-blocks
                      {
                        attributes &&
                          attributes.map((a) => {
                            let att = a.attribute;
                            let array = { key: att, text: att, value: att };
                            map.push(array);
                          });
                      }
                      return (
                        <Dropdown
                           search selection clearable
                          options={map}
                          placeholder={title}
                        />
                      );
                    })}
                </Grid.Row>
                <Grid.Row>

                    <Button href={`/${data.currentStore}/collection/product/${data.product.id}`} basic size='large' color='grey' content='View Full Details'/>

                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      )}
    </Modal>
  );
};

export default connect(mapState, actions)(QuickViewModal);
