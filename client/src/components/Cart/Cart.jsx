import { useSelector } from 'react-redux';
import style from './Cart.module.css';

const Cart = () =>{
    const cartSG = useSelector((state)=>state.cart);
    
    return(
        <>
            <div className={style.container}>
                <div className={style.containerTop}>
                    <h1>Carrito de Compras</h1>
                </div>
                <div className={style.containerBottom}>
                    <div className={style.left}>

                    </div>
                    <div className={style.right}>

                    </div>
                </div>

            </div>
        </>
    )
};

export default Cart;