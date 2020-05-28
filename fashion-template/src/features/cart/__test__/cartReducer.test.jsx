import * as types from '../cartConstants';
import reducer from '../cartReducer';
import { initialState  } from '../cartReducer';


const mockCart1 = [
    {
      "added": "2020-05-27",
      "item": "2ByX54HZo5CKxXsUbrIx",
      "price": 98,
      "quantity": 1,
      "subItem": 0
    },
    {
      "added": "2020-05-27",
      "item": "2ByX54HZo5CKxXsUbrIx",
      "price": 98,
      "quantity": 1,
      "subItem": 1
    }
]

const mockCart2 = []

describe('cart reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        {cart: []}
      )
    })
    it('should handle GET_CART', () => {
        expect(
          reducer(initialState , {
            type: types.GET_CART,
            payload: {cart: mockCart1}
          })
        ).toEqual({
            cart : mockCart1
          })

      })

      it('should handle GET_CART snapshot 1', () => {
        expect(
          reducer(initialState , {
            type: types.GET_CART,
            payload: {cart: mockCart1}
          })
        ).toMatchSnapshot()

      })

      it('should handle GET_CART', () => {
        expect(
          reducer(initialState , {
            type: types.GET_CART,
            payload: {cart: mockCart2}
          })
        ).toEqual({
            cart : mockCart2
          })

      })

      it('should handle GET_CART snapshot 2', () => {
        expect(
          reducer(initialState , {
            type: types.GET_CART,
            payload: {cart: mockCart2}
          })
        ).toMatchSnapshot()

      })
})