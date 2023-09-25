import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    username:"",
    name:"",
    id:""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            let {username,name,id} = action.payload;
            state.username=username;
            state.name=name;
            state.id=id;
        },
        outUser:(state,action)=>{
            state.username='';
            state.name='';
            state.id='';
        }
    },
});

export const {setUser,outUser} = userSlice.actions;
export default userSlice.reducer;