import {configureStore} from'@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import pageReducer from './pageSlice';
import userReducer from './userSlice';


const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        page: pageReducer,
        user: userReducer,
    },
});

export default store;