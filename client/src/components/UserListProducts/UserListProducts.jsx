import { useEffect } from "react";
import { useSelector } from "react-redux";
import {URL} from '../../../varGlobal';
import axios from 'axios';
import UserCardProduct from "../UserCardProduct/UserCardProduct";

const UserListProducts = () => {
    const userSG = useSelector((state)=>state.user);
    console.log('que tiene userid: ', userSG.id)
    console.log('que tiene productSG: ', userSG.products)

    useEffect(()=>{
        //listProducts();
    },[])

    return(
        <>
            <div className="px-5 ">
                <h1 className="py-2 font-bold text-xl text-center ">Listado de Productos del Usuario</h1>
                {
                    userSG.products?.map((product,index)=>(
                        <UserCardProduct
                            //id,title,image,description,price,stock
                            key={index}
                            id={product.id}
                            title={product.title}
                            image={product.image}
                            description={product.description}
                            price={product.price}
                            stock={product.stock}
                        />
                    ))
                }
            </div>
        </>
    )
};

export default UserListProducts;