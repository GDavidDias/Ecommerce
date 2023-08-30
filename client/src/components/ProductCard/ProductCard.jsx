import { useDispatch } from 'react-redux';
import style from './ProductCard.module.css';
import { addCart } from '../../redux/cartSlice';

const ProductCard = ({data}) =>{
    const {id,image,title,description,price} = data;
    // console.log('que tiene prop product: ', product)
    // console.log('que tiene prop product.title: ', product.product.title)
    const dispatch = useDispatch();

    const addProductCart = (data) =>{
        console.log('que tiene data: ',data);
        dispatch(addCart(data));

    }

    return(
        <>
            <div className='w-48 h-64 border-2 border-slate-400 flex flex-col items-center gap-1 bg-clip-content bg-white'>

                <div className={style.containerImage}>
                    <img src={image}/>
                </div>
                <h1 className='text-lg font-bold text-center'>{`${title} $${price}`}</h1>
                <div className='px-8 w-48 h-16'>
                    <h3 className='text-left text-sm'>{description}</h3>
                </div>
                <div className='flex flex-row gap-3'>
                    <button className='bg-sky-500 hover:bg-cyan-600 text-white font-bold w-24 h-8'>Comprar</button>
                    <button className='bg-sky-500 hover:bg-cyan-600 text-white font-bold w-24 h-8' onClick={()=>addProductCart(data)}>Agregar</button>
                </div>
            </div>
        </>
    )
};

export default ProductCard;