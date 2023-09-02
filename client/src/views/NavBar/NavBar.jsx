import style from './NavBar.module.css';
import {FaShoppingCart,FaList,FaSearch} from 'react-icons/fa';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { foundProducts, initialFilterProducts } from '../../redux/productSlice';
const URL = 'http://localhost:3001';

const NavBar = () => {

    const[input,setInput]=useState('');

    const handleInput = (event)=>{
        const{name,value} = event.target;
        setInput(value);
    };
    
    const dispatch = useDispatch();

    const searchData = async(value) => {
        try{
            const {data} = await axios.get(`${URL}/search/?title=${value}`);
            console.log("que tiene data desde axios: ", data);
            return data;
        }catch(error){
            console.log('error en searchData ',error.message)
        }
    };

    const handleSearch=async()=>{
        if(input!==''){
            console.log('entra a buscar');
            const data = await searchData(input);

            if(data.lenght!==0){
                dispatch(foundProducts(data));
            }else{
                dispatch(initialFilterProducts());
            }
        }else{
            dispatch(initialFilterProducts());
        }
    };
    
    const clearInput = ()=>{
        setInput('');
        dispatch(initialFilterProducts());
    };

    useEffect(()=>{
        console.log('que tiene input: ', input);
    },[input])
    
    return(
        <>
            <div className={style.container}>
                <div className={style.logo}>
                    <img src={logo}/>
                </div>
                <div className={style.searchBar}>
                    <input
                        className={style.input}
                        onChange={handleInput}
                        value={input}
                        placeholder='buscar producto ...'
                    />
                    <button
                        className={style.inputClear}
                        onClick={clearInput}
                    >X</button>
                    <FaSearch
                        className={style.icon}
                        onClick={handleSearch}
                    />
                </div>
                <div className={style.list}>
                    <Link to='/'>
                        <FaList
                            className={style.icon}
                        />
                    </Link>
                </div>
                <div className={style.cart}>
                    <Link to='/cart'>
                        <FaShoppingCart 
                            className={style.icon}
                        />
                    </Link>
                </div>
            </div>
        </>
    )
};

export default NavBar;