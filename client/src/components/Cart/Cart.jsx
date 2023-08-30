import { useDispatch, useSelector } from 'react-redux';
import style from './Cart.module.css';
import { useEffect, useState } from 'react';
import ProductItemCart from '../ProductItemCart/ProductItemCart';
import { clearCart } from '../../redux/cartSlice';

const Cart = () =>{
    const cartSG = useSelector((state)=>state.cart.cart);
    const[quantity, setQuantity] = useState(0);
    const[amount, setAmount] = useState(0);

    const recorreProductos = () =>{
        let count=0;
        let amount=0;
        cartSG.forEach(product => {
            count += product.count;
            amount += product.count*Number(product.price);
        });
        setQuantity(count);
        setAmount(amount);
    };
    const dispatch=useDispatch();

    const handleclearCart=()=>{
        dispatch(clearCart());
    }

    useEffect(()=>{
        console.log("que tiene cartSG: ",cartSG);
        recorreProductos();
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
                        <div className={style.resumeTitle}>
                            <h1>Resumen de compra</h1>
                        </div>
                        <div className={style.resumeProduct}>
                            <div>
                                <h3>{`Productos (${quantity})`}</h3>
                            </div>
                            <div>
                                <h3>{`$${amount}`}</h3>
                            </div>
                        </div>
                        <div className={style.resumeOtros}>
                            <div>
                                <h3>{`Otros Gastos`}</h3>
                            </div>
                            <div>
                                {`$0`}
                            </div>
                        </div>
                        <div className={style.resumeTotal}>
                            <div>
                                <h1>Total</h1> 
                            </div>
                            <div>
                                {`$${amount}`}
                            </div>
                        </div>
                        <div className={style.clear}>
                            <button onClick={()=>handleclearCart()}>Vaciar Carrito</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
};

export default Cart;