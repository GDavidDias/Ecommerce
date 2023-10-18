import { useEffect, useState } from "react";
import axios from 'axios';
import {URL} from '../../../varGlobal';
import { useDispatch, useSelector } from "react-redux";
import {useModal} from '../../hooks/useModal';
import Modal from '../Modal/Modal';
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../../utils/fetchAllProducts";

const NewProduct = ({handlePage}) => {

    const[newProductData, setNewProductData] = useState({
        title:'',
        image:'',
        description:'',
        price:'',
        stock:'',
        available:true,
    });
    const[validate,setValidate]=useState(false);
    const[msgError,setMsgError]=useState('');
    const[url_image, setUrl_image] = useState('');
    const userSG = useSelector((state)=>state.user);
    const[isCreateOpenModal,createOpenModal,createCloseModal]=useModal(false);


    const handleChange = (event) => {
        const{name, value} = event.target;
        if(name==='available'){
            const isStockAvailable = value==='true';
            setNewProductData({
                ...newProductData,
                [name]:isStockAvailable
            })
        }
        setNewProductData({
            ...newProductData,
            [name]:value
        })
    };

    const changeUploadImage = async(event) => {
        const file = event.target.files[0];
        //console.log('que tiene event: ', event);
        
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset','preset_img_ecommerce');

        const response = await axios.post('https://api.cloudinary.com/v1_1/dyttujtxb/image/upload', data);

        setUrl_image(response.data.secure_url);
        setNewProductData({
            ...newProductData,
            image:response.data.secure_url
        })
    };

    const submitHandler = async(event) =>{
        console.log('Presiono submit en newProduct')
        await axios.post(`${URL}/newProduct/${userSG.id}`,newProductData)
        .then(async res=>{
            console.log('que tiene res.data: ', res.data);
            createOpenModal();

        })
        .catch(error=>{
            if(error.response){
                const errorMsg = error.response.data.error;
                console.log('que trae error: ', error);
            }
        })
    };

    useEffect(()=>{
        console.log('que tiene newProductData: ', newProductData)
        if(newProductData.title && newProductData.description && newProductData.price && newProductData.stock && newProductData.image){
            setValidate(true)
            setMsgError('')
        }else{
            setValidate(false)
            setMsgError('faltan Completar Datos')
        }
    },[newProductData])

    return(
        <>
            <div className="p-5 flex flex-col items-center">
                <div className="flex flex-row space-x-12">
                    {/* PARTE IZQUIERDA */}
                    <div>
                        <p className="text-center">Producto</p>
                        <input
                            name="title"
                            type="text"
                            placeholder="ingrese nombre del producto"
                            className="w-72 my-2 px-2 py-1 border-2 border-slate-400"
                            value={newProductData.title}
                            onChange={handleChange}
                        />
                        <p className="text-center">Descripcion</p>
                        <input
                            name="description"
                            type="text"
                            placeholder="ingrese descripcion del producto.."
                            className="w-72 my-2 px-2 py-1 border-2 border-slate-400"
                            value={newProductData.description}
                            onChange={handleChange}
                        />
                        <p className="text-center">Precio Unitario</p>
                        <input
                            name="price"
                            type="number"
                            placeholder="ingrese precio del producto.."
                            className="w-72 my-2 px-2 py-1 border-2 border-slate-400"
                            value={newProductData.price}
                            onChange={handleChange}
                        />
                        <p className="text-center">Stock</p>
                        <input
                            name="stock"
                            type="number"
                            placeholder="ingrese stock del producto.."
                            className="w-72 my-2 px-2 py-1 border-2 border-slate-400"
                            value={newProductData.stock}
                            onChange={handleChange}
                        />
                    </div>
                    {/* PARTE DERECHA */}
                    <div>
                        <p className="text-center">Disponible</p>
                        <select
                            name="available"
                            value={newProductData.available.toString()}
                            onChange={handleChange}
                            className="w-72 my-2 px-2 py-1 border-2 border-slate-400"
                        >
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                        <div>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={changeUploadImage}
                            />
                            { url_image && (
                                <div className="flex flex-col items-center">
                                    <img 
                                        src={url_image}
                                        className="w-48 h-48 border-2 border-slate-400"
                                    />
                                    <button>Eliminar imagen</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="h-4 mt-2">
                    {validate ?<p></p> :<p className="italic text-red-500">{msgError}</p>}
                </div>
                <div>
                    <button
                        className={`mt-4 font-bold w-40 h-8 
                            ${(validate)
                                ?`bg-orange hover:bg-green text-white`
                                :`bg-slate-400 hover:bg-slate-400 text-white`
                            }
                        `}
                        onClick={submitHandler}
                        disabled={!validate}
                    >Guardar</button>
                </div>
            </div>
            <Modal isOpen={isCreateOpenModal} >
                <div className="mt-10 w-72">
                    <h1 className="text-xl text-center font-bold">{newProductData.title}</h1>
                    <h1 className="mt-5 text-lg text-center font-bold">Producto fue creado exitosamente</h1>
                    <div className="flex justify-center">
                        <button
                            className="mt-10 font-bold w-40 h-8 bg-orange text-white hover:bg-green"
                            onClick={()=>handlePage('UserListProducts')}
                        >Ok</button>
                    </div>
                </div>
            </Modal>
        </>
    )
};

export default NewProduct;