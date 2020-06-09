import configureStore from "redux-mock-store";
// Actions to be tested
import * as selectActions from "../modalActions";

const mockStore = configureStore();
const store = mockStore();

describe("openModal", () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });
  test("Dispatches the correct action and payload", () => {
    const expectedActions = [
      {
        type: "MODAL_OPEN",
        payload: {
          modalType: undefined,
          modalProps: undefined,
        },
      },
    ];
    store.dispatch(selectActions.openModal());
    expect(store.getActions()).toEqual(expectedActions);
  });
});


describe("closeModal", () => {
    beforeEach(() => {
      // Runs before each test in the suite
      store.clearActions();
    });
    test("Dispatches the correct action and payload", () => {
      const expectedActions = [
        {
          type: "MODAL_CLOSE",
        },
      ];
      store.dispatch(selectActions.closeModal());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

   /*SnapShot Testing*/ 


describe("openModal", () => {
    beforeEach(() => {
      // Runs before each test in the suite
      store.clearActions();
    });
    test("Dispatches the correct action and payload", () => {
      store.dispatch(selectActions.openModal());
      expect(store.getActions()).toMatchSnapshot();
    });
  });

describe("closeModal", () => {
    beforeEach(() => {
      // Runs before each test in the suite
      store.clearActions();
    });
    test("Dispatches the correct action and payload", () => {
      store.dispatch(selectActions.closeModal());
      expect(store.getActions()).toMatchSnapshot();
    });
  });