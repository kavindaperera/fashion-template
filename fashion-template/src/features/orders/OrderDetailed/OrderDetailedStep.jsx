import React, { Component } from 'react'
import {Step, Grid } from 'semantic-ui-react'

export default class OrderDetailedStep extends Component {
    render() {

      const {state} = this.props;
        return (
            <Step.Group ordered>
          <Step active={false} completed={true}>
            <Step.Content>
              <Step.Title>Pay Success</Step.Title>
              <Step.Description></Step.Description>
            </Step.Content>
          </Step>
          <Step active={true} completed={false}>
            <Step.Content>
              <Step.Title>Shipment</Step.Title>
              <Step.Description></Step.Description>
            </Step.Content>
          </Step>
          <Step active={false} completed={false}>
            <Step.Content>
              <Step.Title>Order Complete</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
        )
    }
}
