import * as types from '../collectionConstants';
import reducer from '../collectionReducer'
import { initialState  } from '../collectionReducer'

describe('collection reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        {
          symbol: '$',
        }
      )
    })
    it('should handle GET_CURRENCY', () => {
        expect(
          reducer(initialState , {
            type: types.GET_CURRENCY,
            payload: {
                symbol: '€',
              }
          })
        ).toEqual({
            symbol: '€',
          })

      })
      it('should handle GET_CURRENCY snapshot', () => {
        expect(
          reducer(initialState , {
            type: types.GET_CURRENCY,
            payload: {
                symbol: '€',
              }
          })
        ).toMatchSnapshot()
      })
})