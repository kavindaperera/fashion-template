import {FILTER_PRODUCT_BY_SIZE } from './FilterConstants';

export const filterProducts = (products, size) => (dispatch) => {
    return dispatch ({
        type: FILTER_PRODUCT_BY_SIZE,
        payload:{
            size:size,
            items:size === '' ? products: products.filter(a => a.sizes.indexOf(size.toUpperCase()) >= 0)
        }
    });
    
}