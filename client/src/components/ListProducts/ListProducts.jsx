import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import dataJson from '../../data/data.json';
import ProductCard from '../ProductCard/ProductCard';
import style from './ListProducts.module.css'

const ListProducts = () => {

    const productSG = useSelector((state)=>state.products.listProducts);

    useEffect(()=>{
        console.log('que tiene productSG: ',productSG);
    },[productSG])

    return(
        <>
            <div className={style.productsContainer}>
                {/* <h1>Lista de Productos</h1> */}
                {
                    productSG?.map((product,index)=>(
                        <ProductCard 
                            key={index}
                            id={product.id} 
                            image={product.image}
                            title={product.title}
                            description={product.description}
                        />
                    ))
                }
            </div>
        </>
    )
};

export default ListProducts;