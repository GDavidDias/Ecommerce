import { useDispatch } from 'react-redux';
import style from './ProductCard.module.css';
import { addCart } from '../../redux/cartSlice';
import axios from 'axios';
// import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';//?AGREGO POR MERCADOPAGO
// import { useState } from 'react';
// import Modal from '../Modal/Modal';
// import { useModal } from '../../hooks/useModal';
// const URL = 'http://localhost:3001';


const ProductCard = ({data}) =>{
    // const[isOpenModalBuy, openModalBuy, closeModalBuy]=useModal(false);

    // const[preferenceId, setPreferenceId] = useState(null); //?AGREGO POR MERCADOPAGO
    // initMercadoPago('TEST-266d467d-bcd2-4992-a465-7b7ab11e048a'); //?AGREGO POR MERCADOPAGO

    const {id,image,title,description,price} = data;
    // console.log('que tiene prop product: ', product)
    // console.log('que tiene prop product.title: ', product.product.title)
    const dispatch = useDispatch();

    const addProductCart = (data) =>{
        console.log('que tiene data: ',data);
        dispatch(addCart(data));
    };

    // const createPreference = async (title,price) =>{
    //     console.log('que tiene title: ', title)
    //     console.log('que tiene price: ', price)
        
    //     try{
    //         const response = await axios.post(`${URL}/create_preference`,{
    //             title: title,
    //             price: price,
    //             quantity: 1,
    //             currency_id: 'ARS',
    //         });
    //         const{id}=response.data;
    //         return id;

    //     }catch(error){
    //         console.log('error en createPreference: ',error.message);
    //     }
    // };

    // const handleBuy = async(data) =>{
    //     const{title,price} = data;
    //     openModalBuy();
    //     const id = await createPreference(title,price);
    //     if(id){
    //         setPreferenceId(id);
    //     }
    // }

    return(
        <>
            <div className='bg-white w-48 h-64 border-2 border-slate-400 flex flex-col items-center gap-1 bg-clip-content'>

                <div className={style.containerImage}>
                    <img src={image}/>
                </div>
                <h1 className='text-lg font-bold text-center'>{`${title} $${price}`}</h1>
                <div className='pl-2 pr-2 w-48 h-16'>
                    <h3 className='text-left text-sm'>{description}</h3>
                </div>

                <div className='flex flex-row gap-3 pb-2 px-2'>
                    {/* <button 
                        className='bg-orange hover:bg-blue text-white font-bold w-24 h-8'
                        onClick={()=>handleBuy(data)}
                    >Comprar</button> */}

                    <button 
                        className='bg-orange hover:bg-blue text-white font-bold w-40 h-8' 
                        onClick={()=>addProductCart(data)}
                    >Agregar al Carrito</button>
                </div>
            </div>
            {/* <Modal isOpen={isOpenModalBuy} closeModal={closeModalBuy}>
            {preferenceId && 
                <div>
                    <div className={style.containerImageModal}>
                        <img src={image}/>
                    </div>
                    <h1 className='text-lg font-bold text-center'>{`${title} $${price}`}</h1>
                    <h3 className='text-left text-sm'>{description}</h3>
                    <Wallet initialization={{preferenceId, redirectMode:'modal'}}/>
                </div>
            }
            </Modal> */}
        </>
    )
};

export default ProductCard;