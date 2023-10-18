import axios from 'axios';
import { URL } from '../../varGlobal';

export const fetchAllProducts = async() => {
    try{
        const {data} = await axios.get(`${URL}/products`);
        console.log('que trae data de fetchAllProducts: ', data);
        return data;
    }catch(error){
        console.log('error en fetchAllProducts: ', error.message);
    }
};