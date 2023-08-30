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
            <div className='bg-white w-48 h-64 border-2 border-slate-400 flex flex-col items-center gap-1 bg-clip-content'>

                <div className={style.containerImage}>
                    <img src={image}/>
                </div>
                <h1 className='text-lg font-bold text-center'>{`${title} $${price}`}</h1>
                <div className='pl-2 pr-2 w-48 h-16'>
                    <h3 className='text-left text-sm'>{description}</h3>
                </div>
                <div className='flex flex-row gap-3 pb-2 px-2'>
                    <button className='bg-orange hover:bg-blue text-white font-bold w-24 h-8'>Comprar</button>
                    <button className='bg-orange hover:bg-blue text-white font-bold w-24 h-8' onClick={()=>addProductCart(data)}>Agregar</button>
                </div>
            </div>
        </>
    )
};

export default ProductCard;