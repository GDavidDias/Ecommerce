import style from './NavBar.module.css';
import {FaShoppingCart} from 'react-icons/fa';
import { Link } from "react-router-dom";

const NavBar = () => {
    
    return(
        <>
            <div className={style.container}>
                <div className={style.logo}>
                    <h1>logo</h1>
                </div>
                <div className={style.searchBar}>
                    <h1>searchbar</h1>
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