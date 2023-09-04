import { useDispatch, useSelector } from 'react-redux';
import style from './Cart.module.css';
import { useEffect, useState } from 'react';
import ProductItemCart from '../ProductItemCart/ProductItemCart';
import { clearCart, setQuantityCart } from '../../redux/cartSlice';
import {FaCartArrowDown} from 'react-icons/fa';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';//?AGREGO POR MERCADOPAGO
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import axios from 'axios';
import { Link } from 'react-router-dom';
const URL = 'http://localhost:3001';

const Cart = () =>{

    const[isOpenModalBuy, openModalBuy, closeModalBuy]=useModal(false);
    const[isOpenModalEmptyCar, openModalEmptyCar, closeModalEmptyCar]=useModal(false);

    const[preferenceId, setPreferenceId] = useState(null); //?AGREGO POR MERCADOPAGO
    initMercadoPago('TEST-266d467d-bcd2-4992-a465-7b7ab11e048a'); //?AGREGO POR MERCADOPAGO

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
        amount = parseFloat(amount.toFixed(2));
        setAmount(amount);
        dispatch(setQuantityCart(count))
    };
    const dispatch=useDispatch();

    const handleclearCart=()=>{
        dispatch(clearCart());
    }

    const createPreference = async (title,price) =>{
        console.log('que tiene title: ', title)
        console.log('que tiene price: ', price)
        
        try{
            const response = await axios.post(`${URL}/create_preference`,{
                title: title,
                price: price,
                quantity: 1,
                currency_id: 'ARS',
            });
            const{id}=response.data;
            return id;

        }catch(error){
            console.log('error en createPreference: ',error.message);
        }
    };

    const handleBuy = async(data) =>{
        const{title,price} = data;
        if(price!==0){
            openModalBuy();
            const id = await createPreference(title,price);
            if(id){ setPreferenceId(id)}
        }else{
            openModalEmptyCar();
        }
        
    };

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
                        <div className={style.containerResume}>
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
                            <div className={style.resumeButtons}>
                                <div className={style.clear}>
                                    <button onClick={()=>handleclearCart()}>Vaciar Carrito</button>
                                </div>
                                <div className={style.comprar}>
                                    <button
                                        onClick={()=>handleBuy({
                                            title: `Productos (${quantity})`,
                                            price: amount,
                                        })}
                                    >Comprar Ahora</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Modal isOpen={isOpenModalEmptyCar} closeModal={closeModalEmptyCar}>
                <div className={style.modal}>
                    <h1>Carrito Vacio!</h1>
                    <div className={style.iconContainer}>
                        <FaCartArrowDown className={style.icon}/>
                    </div>
                    <div className={style.buttonCenter}>
                        <Link to='/'>
                            <button>Lista de Productos</button>
                        </Link>
                    </div>                    
                </div>
            </Modal>
            <Modal isOpen={isOpenModalBuy} closeModal={closeModalBuy}>
            {preferenceId && 
                <div className={style.modal}>
                    <h1>Compra</h1>
                    <h3>{`Productos (${quantity})`}</h3>
                    <div className={style.modalDescriptionContainer}>
                        {
                            cartSG?.map((product, index)=>(
                                <div key={index} className={style.modalDescription}>
                                    <img src={product.image}/>
                                    <h3>{product.title}</h3>
                                </div>
                            ))
                        }
                    </div>
                    <div className={style.resumeTotal}>
                        <div><h3>Total</h3></div>
                        <div>{`$${amount}`}</div>
                    </div>
                    <Wallet initialization={{preferenceId, redirectMode:'modal'}}/>
                </div>
            }
            </Modal>
        </>
    )
};

export default Cart;