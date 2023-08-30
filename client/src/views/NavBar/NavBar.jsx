import style from './NavBar.module.css';
import {FaShoppingCart,FaList,FaSearch} from 'react-icons/fa';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'

const NavBar = () => {
    
    return(
        <>
            <div className={style.container}>
                <div className={style.logo}>
                    <img src={logo}/>
                </div>
                <div className={style.searchBar}>
                    <input
                        className={style.input}
                    />
                    <FaSearch
                        className={style.icon}
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