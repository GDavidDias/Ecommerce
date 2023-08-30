import style from './NavBar.module.css';
import {FaShoppingCart,FaList} from 'react-icons/fa';
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
                    <h1>searchbar</h1>
                </div>
                <div className={style.list}>
                    <Link to='/'>
                        <FaList
                            className={style.iconList}
                        />
                    </Link>
                </div>
                <div className={style.cart}>
                    <Link to='/cart'>
                        <FaShoppingCart 
                            className={style.iconCart}
                        />
                    </Link>
                </div>
            </div>
        </>
    )
};

export default NavBar;