import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cart:[]
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addCart:(state,action)=>{
            const {productId,amount} = action.payload;

            let product = {
                productId: productId,
                amount:amount
            }
            state.cart = product;
        }
    }
});

export const {addCart} = cartSlice.actions;
export default cartSlice.reducer;


