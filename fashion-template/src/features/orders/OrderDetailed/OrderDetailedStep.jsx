import React, { Component } from 'react'
import {Step, Grid } from 'semantic-ui-react'

export default class OrderDetailedStep extends Component {
    render() {
        return (
            <Step.Group ordered>
          <Step completed>
            <Step.Content>
              <Step.Title>Shipping</Step.Title>
              <Step.Description>Choose your shipping options</Step.Description>
            </Step.Content>
          </Step>
          <Step completed>
            <Step.Content>
              <Step.Title>Billing</Step.Title>
              <Step.Description>Enter billing information</Step.Description>
            </Step.Content>
          </Step>
          <Step active>
            <Step.Content>
              <Step.Title>Confirm Order</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
        )
    }
}
