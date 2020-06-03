import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
// Actions to be tested
import * as selectActions from '../collectionAction';


const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);
const store = mockStore();

const  config ={
    "currencies": {
      "AUD": "$",
      "CAD": "$",
      "CNY": "¥",
      "EUR": "€",
      "GBP": "£",
      "HKD": "$",
      "JPY": "¥",
      "LKR": "Rs.",
      "RUB": "р.",
      "USD": "$"
    },
    "orderStates": [
      "Paid",
      "Shipped",
      "Delivered"
    ]
  }

const store_1 ={
    currency: 'USD'
}

const store_2 ={
    currency: 'EUR'
}

describe('getCurrency', () => {
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
      });
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
                    {
                    "type": "ASYNC_ACTION_START",
                    },
                    {
                    'type': 'GET_CURRENCY',
                    'payload':{ symbol: '$'}
                    },
                    {
                    "type": "ASYNC_ACTION_FINISH",
                    },
                    ];
      store.dispatch(selectActions.getCurrency(config,store_1));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

describe('getCurrency', () => {
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
      });
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
                    {
                    "type": "ASYNC_ACTION_START",
                    },
                    {
                    'type': 'GET_CURRENCY',
                    'payload':{ symbol: '€'}
                    },
                    {
                    "type": "ASYNC_ACTION_FINISH",
                    },
                    ];
      store.dispatch(selectActions.getCurrency(config,store_2));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

describe('getCurrency', () => {
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
      });
    test('Dispatches the correct action and payload', () => {
      store.dispatch(selectActions.getCurrency(config,store_1));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

describe('getCurrency', () => {
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
      });
    test('Dispatches the correct action and payload', () => {
      store.dispatch(selectActions.getCurrency(config,store_2));
      expect(store.getActions()).toMatchSnapshot();
    });
  });