import React from 'react'
import { Form, Rating } from 'semantic-ui-react'



const RatingInput = ({input, width, type, label, meta: { touched, error}}) => {

    return (
        <Form.Field error={touched && !!error}>
            <Rating size='large' maxRating={5} onRate={(e, data) => input.onChange(data.rating)} />
        </Form.Field>
    )
}

export default RatingInput