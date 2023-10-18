import dataJson from './data/data.json';
import axios from 'axios';
import { addProducts } from './redux/productSlice';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Home from './views/Home/Home'
import { URL } from '../varGlobal';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import style from './App.module.css';
import { fetchAllProducts } from './utils/fetchAllProducts';


function App() {
  const dispatch = useDispatch();

  const getAllProducts = async() => {
    const data = await fetchAllProducts()
    dispatch(addProducts(data))
  };

  useEffect(()=>{
    getAllProducts();
  },[]);

  return (
    <div className={style.containerMain}>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
    </div>
  )
};

export default App;
