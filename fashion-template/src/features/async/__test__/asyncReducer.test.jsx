import * as types from '../asyncConstants';
import reducer from '../asyncReducer';
import { initialState } from '../asyncReducer';

const trueState = {
  loading: true
}

describe('async reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        {
            loading: false
        }
      )
    })
    //initial state to start state
    it('should handle ASYNC_ACTION_START', () => {
        expect(
          reducer(initialState , {
            type: types.ASYNC_ACTION_START
          })
        ).toEqual({
            loading: true
          })

    })
    //initial state to finish state
    it('should handle ASYNC_ACTION_FINISH', () => {
        expect(
          reducer(initialState , {
            type: types.ASYNC_ACTION_FINISH
          })
        ).toEqual({
            loading: false
          })

    })
    //initial state to error state
    it('should handle ASYNC_ACTION_ERROR', () => {
      expect(
        reducer(initialState , {
          type: types.ASYNC_ACTION_ERROR
        })
      ).toEqual({
          loading: false
        })

    })
    //true state to start state
    it('should handle ASYNC_ACTION_START', () => {
      expect(
        reducer(trueState , {
          type: types.ASYNC_ACTION_START
        })
      ).toEqual({
          loading: true
        })

    })
    //true state to finish state
    it('should handle ASYNC_ACTION_FINISH', () => {
      expect(
        reducer(trueState , {
          type: types.ASYNC_ACTION_FINISH
        })
      ).toEqual({
          loading: false
        })

    })
    //true state to error state
    it('should handle ASYNC_ACTION_ERROR', () => {
      expect(
        reducer(trueState , {
          type: types.ASYNC_ACTION_ERROR
        })
      ).toEqual({
          loading: false
        })

    })

    //Snapshot testing

    it('should handle ASYNC_ACTION_START', () => {
      expect(
        reducer(initialState , {
          type: types.ASYNC_ACTION_START
        })
      ).toMatchSnapshot()

    })
    it('should handle ASYNC_ACTION_FINISH', () => {
      expect(
        reducer(initialState , {
          type: types.ASYNC_ACTION_FINISH
        })
      ).toMatchSnapshot()

    })

    it('should handle ASYNC_ACTION_ERROR', () => {
      expect(
        reducer(initialState , {
          type: types.ASYNC_ACTION_ERROR
        })
      ).toMatchSnapshot()

    })

})