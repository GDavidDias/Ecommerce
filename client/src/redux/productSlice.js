import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    listProducts:[],
    filterProducts:[]
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
        addProducts:(state,action)=>{
            console.log('que tiene products en Slice: ',action.payload);
            // console.log('que tiene products: ',products)
            state.filterProducts = action.payload;
            state.listProducts = action.payload;
        },
        foundProducts:(state,action)=>{
            console.log('que trae action <search> Slice: ', action.payload);
            state.filterProducts = action.payload;
            
        },
        initialFilterProducts:(state,action)=>{
            state.filterProducts = state.listProducts;
        }
    },
});




export const {addProducts,foundProducts,initialFilterProducts} = productSlice.actions;
export default productSlice.reducer;
