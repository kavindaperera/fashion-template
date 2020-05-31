import * as types from '../authConstants';
import reducer from '../authReducer';
import { initialState  } from '../authReducer';

const mockUserData=[]
describe('auth reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        {
            currentUser: {}
        }
      )
    })
    it('should handle SIGN_OUT_USER', () => {
        expect(
          reducer(initialState , {
            type: types.SIGN_OUT_USER,
            payload: {
                authenticated: false,
                currentUser: {}
              }
          })
        ).toEqual({
            authenticated: false,
            currentUser: {}
          })
      })

      it('should handle SIGN_OUT_USER', () => {
        expect(
          reducer(initialState , {
            type: types.SIGN_OUT_USER,
            payload: {
                authenticated: true,
                currentUser: {mockUserData}
              }
          })
        ).toEqual({
            authenticated: false,
            currentUser: {}
          })
      })

      //SnapShot testing

      it('should handle SIGN_OUT_USER', () => {
        expect(
          reducer(initialState , {
            type: types.SIGN_OUT_USER,
            payload: {
                authenticated: false,
                currentUser: {}
              }
          })
        ).toMatchSnapshot()
    })

    it('should handle SIGN_OUT_USER', () => {
        expect(
          reducer(initialState , {
            type: types.SIGN_OUT_USER,
            payload: {
                authenticated: true,
                currentUser: {mockUserData}
              }
          })
        ).toMatchSnapshot()
    })

    it('should handle SIGN_OUT_USER', () => {
        expect(
          reducer(initialState , {
            type: types.SIGN_OUT_USER,
            payload: {
                authenticated: false,
                currentUser: {}
              }
          })
        ).toMatchSnapshot()
    })
})