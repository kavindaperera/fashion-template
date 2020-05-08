import { combineReducers } from 'redux'
import { reducer as FormReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import collectionReducer from '../../features/collection/collectionReducer'
import modalsReducer from '../../features/modals/modalReducer'
import authReducer from '../../features/auth/authReducer'
import asyncReducer from '../../features/async/asyncReducer'
import storeReducer from '../../features/store/storeReducer'
import FilterReducer from '../../features/filter/FilterReducer';
import cartReducer from '../../features/cart/cartReducer'
import ordersReducer from '../../features/orders/ordersReducer'

const rootReducer = combineReducers ({
    form: FormReducer,
    collection: collectionReducer,
    store: storeReducer,
    modals: modalsReducer,
    auth: authReducer,
    async: asyncReducer,
    toastr: toastrReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    filters: FilterReducer,
    cart: cartReducer,
    orders: ordersReducer

})

export default rootReducer;