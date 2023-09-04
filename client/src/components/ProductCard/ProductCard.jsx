import { useDispatch } from 'react-redux';
import style from './ProductCard.module.css';
import { addCart } from '../../redux/cartSlice';
import axios from 'axios';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';



const ProductCard = ({data}) =>{
    const[isOpenModalProduct, openModalProduct, closeModalProduct]=useModal(false);

    const {id,image,title,description,price} = data;

    const dispatch = useDispatch();

    const addProductCart = (data) =>{
        console.log('que tiene data: ',data);
        dispatch(addCart(data));
    };

    const handleImage = ()=>{
        openModalProduct();
    }

    return(
        <>
            <div className='bg-white w-48 h-64 border-2 border-slate-400 flex flex-col items-center gap-1 bg-clip-content'>

                <div className={style.containerImage}>
                    <img src={image} onClick={handleImage}/>
                </div>
                <h1 className='text-lg font-bold text-center truncate'>{`${title}`}</h1>
                <div className='max-w-xxs  overflow-hidden pl-2 pr-2 w-48 h-5'>
                    <h3 className='leading-4 text-left text-sm truncate'>{description}</h3>
                </div>
                <div>
                    <h1 className='text-base font-bold text-center'>{`$${price}`}</h1>
                </div>
                <div className='flex flex-row gap-3 pb-2 px-2'>
                    <button 
                        className='bg-orange hover:bg-blue text-white font-bold w-40 h-8' 
                        onClick={()=>addProductCart(data)}
                    >Agregar al Carrito</button>
                </div>
            </div>
            <Modal isOpen={isOpenModalProduct} closeModal={closeModalProduct}>
                <div>
                    <div>
                        <img src={image}/>
                    </div>
                    <h1 className='text-lg font-bold text-center'>{`${title}`}</h1>
                    <h3 className='text-left text-sm'>{description}</h3>
                    <h1 className='text-lg font-bold text-center'>{`$${price}`}</h1>
                    
                    
                </div>
            
            </Modal>
        </>
    )
};

export default ProductCard;