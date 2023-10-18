import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    username:"",
    name:"",
    id:"",
    token:"",
    products:[],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            let {username,name,id,token} = action.payload;
            state.username=username;
            state.name=name;
            state.id=id;
            state.token=token
        },
        outUser:(state,action)=>{
            state.username='';
            state.name='';
            state.id='';
            state.token='';
        },
        setProducts:(state,action)=>{
            state.products=action.payload;
        }
    },
});

export const {setUser,outUser,setProducts} = userSlice.actions;
export default userSlice.reducer;