export const getVisibleproducts = (data, {sortBy}) => {
    return [...data.filter(product => product.sort((product1, product2) => {
        if (sortBy === 'HighToLow') {
            return product2.price < product1.price ? -1 : 1;
        } else if (sortBy === 'LowToHigh') {
            return product2.price > product1.price ? -1 : 1;
        } else if (sortBy === 'Newest') {
            return product2.id < product1.id ? -1 : 1;
        } else{
            return product2.id > product1.id ? -1 : 1;
        }
    }))];
}