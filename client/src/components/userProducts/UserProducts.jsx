import { useEffect, useState } from "react";
import {URL} from '../../../varGlobal';
import axios from 'axios';
import {FaShoppingCart,FaList,FaSearch,FaPlusSquare,FaUserAlt} from 'react-icons/fa';
import {MdAddBox} from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import NewProduct from "../NewProduct/NewProduct";
import UserListProducts from "../UserListProducts/UserListProducts";
import { setProducts } from "../../redux/userSlice";
import { fetchAllProducts } from "../../utils/fetchAllProducts";
import { addProducts } from "../../redux/productSlice";

const UserProducts = ()=>{
    const userSG = useSelector((state)=>state.user);
    const[user, setUser]=useState('');
    const[error,setError]=useState('');
    const[content, setContent]=useState(null);
    const[listUserProduct, setListUserProduct]=useState(null);

    const dispatch = useDispatch();


    const getProducts = async () =>{
        //const token = document.cookie.replace('token=','');
        await axios.post(`${URL}/userProducts/${userSG.id}`,{},{headers:{'Authorization':userSG.token}})
        //await axios.post(`${URL}/userProducts/${userSG.id}`)
            .then(async res=>{
                console.log('que trae res.data: ', res.data);
                //setUser(userSG.name);
                //setListUserProduct(res.data);
                dispatch(setProducts(res.data));
            })
            .catch(error=>{
                console.log('que trae error: ', error)
                if(error.response){
                    const errorMsg = error.response.data.msg;
                    console.log('que trae errorMsg getProducts: ', errorMsg);
                    setError(errorMsg);
                }
            })
    };

    const validateUser= async()=>{
        //const token = document.cookie.replace('token=','');
        const token = userSG.token;
        console.log('que tienen token: ',token);
        if(token){
            setUser(userSG.name)
            getProducts();

        }else{
            setUser('Ingrese con su usuario');
        }
    };

    const getAllProducts = async() => {
        const data = await fetchAllProducts();
        dispatch(addProducts(data));
    };

    const handlePage = (value) =>{
        switch(value){
            case 'UserListProducts':
                getProducts();
                getAllProducts();
                setContent(<UserListProducts/>);
                break;
            case 'NewProduct':
                setContent(<NewProduct handlePage={handlePage}/>);
                break;
            default:
                setContent(<UserListProducts/>);
        };
    };

    useEffect(()=>{
        validateUser();
        setContent(<UserListProducts/>);
    },[])

    // useEffect(()=>{
    //     console.log('Pagina de UserProducts: ',content)

    // },[content])

    return(
        <>
            <div className="h-[78vh]">
                <div className="flex items-center">
                    <h1 className="font-bold text-xl p-5">Mis Productos a la Venta:</h1>
                    <h1 className="font-bold text-xl text-red-500">{user}</h1>
                </div>
                <div className="flex flex-row px-4 space-x-6 h-12 border-2 border-solid items-center ">
                    <div className="cursor-pointer text-blue-500 hover:text-blue-800 ">
                        <h3
                            onClick={()=>handlePage('UserListProducts')}
                        >Listado de Productos</h3>
                    </div>
                    <div className="cursor-pointer text-blue-500 hover:text-blue-800">
                        <h3
                            onClick={()=>handlePage('NewProduct')}
                        >Nuevo Producto</h3>
                    </div>
                </div>
                <div className="overflow-auto h-[64vh]">
                    {content}
                </div>


            </div>
        </>
    )
};

export default UserProducts;