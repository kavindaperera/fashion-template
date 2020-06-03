import configureStore from 'redux-mock-store';
// Actions to be tested
import * as selectActions from '../asyncActions';

const mockStore = configureStore();
const store = mockStore();


describe('asyncActionStart', () => {
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
      });
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          'type': 'ASYNC_ACTION_START',
        },
      ];
      store.dispatch(selectActions.asyncActionStart());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

describe('asyncActionFinish', () => {
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
      });
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          'type': 'ASYNC_ACTION_FINISH',
        },
      ];
      store.dispatch(selectActions.asyncActionFinish());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

describe('asyncActionError', () => {
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
      });
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          'type': 'ASYNC_ACTION_ERROR',
        },
      ];
      store.dispatch(selectActions.asyncActionError());
      expect(store.getActions()).toEqual(expectedActions);
    });
  }); 


 /*SnapShot Testing*/ 

describe('asyncActionStart', () => {
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
      });
    test('Dispatches the correct action and payload', () => {
      store.dispatch(selectActions.asyncActionStart());
      expect(store.getActions()).toMatchSnapshot();
    });
  });

describe('asyncActionFinish', () => {
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
      });
    test('Dispatches the correct action and payload', () => {
      store.dispatch(selectActions.asyncActionFinish());
      expect(store.getActions()).toMatchSnapshot();
    });
  });

describe('asyncActionError', () => {
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
      });
    test('Dispatches the correct action and payload', () => {
      store.dispatch(selectActions.asyncActionError());
      expect(store.getActions()).toMatchSnapshot();
    });
  });
