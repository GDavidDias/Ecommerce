import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cart:[],
    quantity:0
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addCart:(state,action)=>{
            const {id,image,title,description,price} = action.payload;

            let product;
            const findProduct=findProductCart(state,id);
            if(findProduct){
                console.log("entra true");
                findProduct.count+=1;
            }else{
                console.log("entra false")
                product = {
                    id:id, 
                    image:image, 
                    title:title, 
                    description:description, 
                    price:price,
                    count:1
                }
                state.cart = [...state.cart,product];
            }
            state.quantity+=1;
        },
        substractCart:(state,action)=>{
            const{id}=action.payload
            const findProduct=findProductCart(state,id)
            if(findProduct){
                if(findProduct.count!=1){
                    findProduct.count-=1;
                }
            }
        },
        removeCart:(state,action)=>{
            const{id}=action.payload;
            state.cart = state.cart.filter(product=>product.id!==id);
        },
        clearCart:(state,action)=>{
            state.cart=[];
        },
        setQuantityCart:(state,action)=>{
            state.quantity=action.payload;
        }
    }
});

export const findProductCart = (state,id)=>{
    const findProduct = state.cart.find(product=>product.id===id);
    return findProduct ?findProduct :false
};

export const {addCart,substractCart,removeCart,clearCart,setQuantityCart} = cartSlice.actions;
export default cartSlice.reducer;


