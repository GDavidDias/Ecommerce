import { useSelector } from 'react-redux';
import style from './Cart.module.css';
import { useEffect } from 'react';
import ProductItemCart from '../ProductItemCart/ProductItemCart';

const Cart = () =>{
    const cartSG = useSelector((state)=>state.cart.cart);

    useEffect(()=>{
        console.log("que tiene cartSG: ",cartSG);
    },[cartSG])

    return(
        <>
            <div className={style.container}>
                <div className={style.containerTop}>
                    <h1>Carrito de Compras</h1>
                </div>
                <div className={style.containerBottom}>
                    <div className={style.left}>
                        {
                            cartSG?.map((product,index)=>(
                                <ProductItemCart 
                                    key={index}
                                    dataProduct={product}
                                />
                            ))
                        }
                    </div>
                    <div className={style.right}>
                        
                    </div>
                </div>

            </div>
        </>
    )
};

export default Cart;