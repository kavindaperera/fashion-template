import * as types from '../modalConstants';
import reducer from '../modalReducer';
import { initialState } from '../modalReducer';

describe('modal reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined,{})).toEqual(null)
    })
    it('should handle MODAL_OPEN', () => {
        expect(reducer(initialState,{
            type: types.MODAL_OPEN,
            payload: {
                modalType: 'test',
                modalProps: undefined
            }
        })).toEqual({
            modalType: 'test',
            modalProps: undefined
        })
    })
    it('should handle MODAL_OPEN', () => {
        expect(reducer(initialState,{
            type: types.MODAL_OPEN,
            payload: {
                modalType: 'test',
                modalProps: {data: 'testData'}
            }
        })).toEqual({
            modalType: 'test',
            modalProps: {data: 'testData'}
        })
    })
    it('should handle MODAL_OPEN snapshot 1', () => {
        expect(reducer(initialState,{
            type: types.MODAL_OPEN,
            payload: {
                modalType: 'test',
                modalProps: undefined
            }
        })).toMatchSnapshot()
    })
    it('should handle MODAL_OPEN snapshot 2', () => {
        expect(reducer(initialState,{
            type: types.MODAL_OPEN,
            payload: {
                modalType: 'test',
                modalProps: {data: 'testData'}
            }
        })).toMatchSnapshot()
    })


    it('should handle MODAL_CLOSE', () => {
        expect(reducer(initialState,{
            type: types.MODAL_CLOSE,
        })).toEqual(null)
    })

    it('should handle MODAL_CLOSE snapshot 1', () => {
        expect(reducer(initialState,{
            type: types.MODAL_CLOSE,

        })).toMatchSnapshot()
    })
})