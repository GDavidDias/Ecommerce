import { useDispatch, useSelector } from 'react-redux';
import style from './ProductItemCart.module.css';
import { addCart, removeCart, substractCart } from '../../redux/cartSlice';

const ProductItemCart = ({dataProduct}) =>{
    console.log("que tiene dataProduct: ", dataProduct)
    const {id,image,title,description,price,count} = dataProduct;

    const productSG = useSelector((state)=>state.products.listProducts);
    
    const dispatch=useDispatch();

    const addProductCart=(id)=>{
        const data = productSG.find(product=>product.id===id);
        dispatch(addCart(data));
    };
    const substractProductCart=(id)=>{
        const data = productSG.find(product=>product.id===id);
        dispatch(substractCart(data));
    };
    const removeProduct=(id)=>{
        const data = productSG.find(product=>product.id===id);
        dispatch(removeCart(data));
    };

    return(
        <div>
            <div className={style.container}>
                <div className={style.image}>
                    <img src={image}/>
                </div>
                <div className={style.info}>
                    <div className={style.titleInfo}>
                        <h1>{title}</h1>
                        <h1>{`$ ${price}`}</h1>
                    </div>
                    <div className={style.descriptionContainer}>
                        <h3>{description}</h3>
                    </div>
                    <div className={style.actionLink}>
                        {/* <button className={style.buttonAction}>Comprar Ahora</button> */}
                        <button className={style.buttonAction} onClick={()=>removeProduct(id)}>Eliminar</button>
                    </div>
                </div>
                <div className={style.subtotal}>
                    <div className={style.cantidad}>
                        <div className={style.iconSuma}>
                            <button className={style.buttons} onClick={()=>addProductCart(id)}>+</button>
                        </div>
                        <div className={style.count}>
                            {count}
                        </div>
                        <div className={style.iconResta}>
                            <button className={style.buttons} onClick={()=>substractProductCart(id)}>-</button>
                        </div>
                    </div>
                    <div className={style.monto}>
                        <h1>Subtotal:</h1>
                        <h1>{`$ ${parseFloat((count*price).toFixed(2))}`}</h1>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default ProductItemCart;