import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    listProducts:[]
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
        addProducts:(state,action)=>{
            const {products} = action.payload;
            // console.log('que tiene products en Slice: ',action.payload);
            // console.log('que tiene products: ',products)
            state.listProducts = products;
        },
    },
});

export const {addProducts} = productSlice.actions;
export default productSlice.reducer;
