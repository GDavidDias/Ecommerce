import dataJson from './data/data.json';
import axios from 'axios';
import { addProducts } from './redux/productSlice';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Home from './views/Home/Home'
import { URL } from '../varGlobal';


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchdata = async () =>{
      try{
        // const response = dataJson;
        // console.log('que tiene response: ', response)
        // dispatch(addProducts(response));
        const {data} = await axios.get(`${URL}/products`);
        console.log("que tiene data: ", data)
        dispatch(addProducts(data));

      }catch(error){
        console.log('error al cargar datos: ', error.message)
      }
    };
    fetchdata();

  },[]);

  return (
    <>
      <div>
        <Home/>
      </div>
    </>
  )
};

export default App;
