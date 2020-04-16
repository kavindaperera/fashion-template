import React, { Component } from 'react'
import { Card, Button,Icon,} from "semantic-ui-react";

class OrderSummary extends Component {
    render() {
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>Order Summary</Card.Header>
                    <Card.Description>Subtotal</Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Header>Estimated Total</Card.Header>
                    <Card.Meta>Additional taxes and duties may apply.</Card.Meta>
                </Card.Content>
                <Card.Content>
                    <Button secondary fluid size="huge">Checkout<Icon name="" /></Button>
                </Card.Content>
            </Card>
        )
    }
}

export default OrderSummary