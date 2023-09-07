import {configureStore} from'@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import pageReducer from './pageSlice';


const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        page: pageReducer,
    },
});

export default store;