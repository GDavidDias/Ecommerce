import style from './NavBar.module.css';
import {FaShoppingCart,FaList,FaSearch,FaPlusSquare,FaUserAlt} from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { foundProducts, initialFilterProducts } from '../../redux/productSlice';
import { URL } from '../../../varGlobal';
import { setPage } from '../../redux/pageSlice';
import user from '../../../src/img/user.png';
import edit from '../../../src/img/edit.png'
import logout from '../../../src/img/log-out.png'
import { outUser } from '../../redux/userSlice';


const NavBar = () => {
    const userSG = useSelector((state)=>state.user);

    const[open, setOpen] = useState(false);

    const cartQuantitySG = useSelector((state)=>state.cart.quantity);

    const[input,setInput]=useState('');

    const handleInput = (event)=>{
        const{name,value} = event.target;
        setInput(value);
    };
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handlePage = (value) =>{
        dispatch(setPage(value));
    };

    const handleLogout = () =>{
        dispatch(outUser());
        navigate('/');
    };

    useEffect(()=>{
        console.log('que tiene input: ', input);
    },[input])

    let menuRef = useRef();

    useEffect(()=>{
        let handler = (e)=>{
            if(!menuRef.current.contains(e.target)){
                setOpen(false);
            }
        };

        document.addEventListener('mousedown',handler);

        return()=>{
            document.removeEventListener('mousedown',handler);
        }
    });
    
    return(
        <>
            <div className={style.containerTop}>
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
                        <FaList
                            className={style.icon}
                            onClick={()=>handlePage('marketProducts')}
                        />
                </div>
                <div className={style.quantity}>
                    <h3>{cartQuantitySG}</h3>
                </div>
                <div className={style.cart}>
                        <FaShoppingCart 
                            className={style.icon}
                            onClick={()=>handlePage('cart')}
                        />
                </div>
            </div>
            <div className={style.containerBottom} ref={menuRef}>
                <div className={style.nameUser}>
                    <p>{userSG.name ?userSG.name :"invitado" }</p>
                </div>
                <div className={style.menu}>
                    <FaUserAlt className={style.icon} onClick={()=>{setOpen(!open)}}/>
                </div>
                <div 
                    className={`${style.dropdownMenu} ${open ?style.active :style.inactive}`}
                >
                    <ul>
                        <DropdownItem 
                            img={user} 
                            text={'Mi Perfil'}
                            onClick={()=>handlePage('profile')}
                        />
                        <DropdownItem 
                            img={edit} 
                            text={'Mis Productos'}
                            onClick={()=>handlePage('userProducts')}
                        />
                        <DropdownItem 
                            img={logout} 
                            text={'Salir'}
                            onClick={()=>handleLogout()}
                        />
                    </ul>

                </div>
            </div>
        </>
    )
};

function DropdownItem(props){
    return(
        <li className={style.dropdownItem} onClick={props.onClick}>
            <img src={props.img}></img>
            <a>{props.text}</a>
        </li>
    );
}

export default NavBar;