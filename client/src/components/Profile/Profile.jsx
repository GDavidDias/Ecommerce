import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {URL} from '../../../varGlobal';
import Modal from '../Modal/Modal';
import {useModal} from '../../hooks/useModal';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";

const Profile = ()=>{
    const[isOpenModal,openModal,closeModal]=useModal(false);
    const[isEditOpenModal,editOpenModal,editCloseModal]=useModal(false);
    const userSG = useSelector((state)=>state.user);
    const[userData, setUserData] = useState({
        name:'',
        username:'',
        password:'',
    });
    const[validate,setValidate]=useState(false);
    const[msgError,setMsgError]=useState('');

    const handleChange =(event) =>{
        const{name,value} = event.target;
        setUserData({
            ...userData,
            [name]:value
        })
    };

    const inputUsername = useRef(null);

    const navigate = useNavigate();

    const submitHandler = async(event) =>{
        console.log('presiono submit en Profile');
        //?SI INICIO SESION, MODIFICA LOS DATOS.
        if(userSG.name){
            await axios.put(`${URL}/editProfile/${userSG.id}`,userData,{headers:{'Authorization':userSG.token}})
            .then(async res=>{
                console.log('que tiene res.data: ', res.data);
                editOpenModal();
            })
            .catch(error=>{
                if(error.response){
                    const errorMensaje = error.response.data.error;
                    console.log('que trae error: ', errorMensaje)
                    //setUserData({...userData,username:''})
                    inputUsername.current.focus();
                    setValidate(false)
                    setMsgError(errorMensaje)
                }
            })

        }else{
            //?SI NO INICIO SESION, CREA UN PERFIL DE USUARIO
            await axios.post(`${URL}/register/`,userData)
            .then(async res=>{
                console.log('que tiene res.data: ', res.data)
                
                openModal();
            })
            // .catch(err=>alert(err))
            .catch(error=>{
                if(error.response){
                    const errorMensaje = error.response.data.error;
                    console.log('que trae error: ', errorMensaje)
                    //setUserData({...userData,username:''})
                    inputUsername.current.focus();
                    setValidate(false)
                    setMsgError(errorMensaje)
                }
            })
        }
        
    };

    useEffect(()=>{
        if(userSG.name!=''){
            setUserData({
                ...userData,
                name:userSG.name,
                username:userSG.username,
            })
        }
    },[])

    useEffect(()=>{
        console.log('que tiene userData: ', userData);
        if(userData.name && userData.username && userData.password){
            setValidate(true)
            setMsgError('')
        }else{
            setValidate(false)
            setMsgError('Faltan Completar Datos')
        };
    },[userData])

    return(
        <>
            <div className="h-[78vh]">
                <h1 className="font-bold text-xl  text-left pl-5 pt-5">{userSG.name==='' ?'Crear nuevo usuario' :`Perfil de ${userSG.name}`}</h1>
                <div className="flex flex-col items-center mt-5">
                    <p className="mt-2">nombre y apellido</p>
                    <input
                        name="name"
                        type="text"
                        placeholder="ingrese su nombre.."
                        className="w-72 my-2 px-2 py-1 border-2 border-slate-400"
                        value={userData.name}
                        onChange={handleChange}
                    />
                    <p className="mt-2">usuario</p>
                    <input
                        name="username"
                        type="text"
                        placeholder="ingrese nombre de usuario"
                        className="w-72 my-2 px-2 py-1 border-2 border-slate-400"
                        value={userData.username}
                        onChange={handleChange}
                        ref={inputUsername}
                    />
                    <p className="mt-2">contraseña</p>
                    <input
                        name="password"
                        type="text"
                        placeholder="ingrese contraseña"
                        className="w-72 my-2 px-2 py-1 border-2 border-slate-400"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <div className="h-4 mt-4">
                        {validate ?<p></p> :<p className="italic text-red-500">{msgError}</p>}
                    </div>
                    <button
                        className={`mt-10 font-bold w-40 h-8 
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
            <Modal isOpen={isOpenModal} closeModal={closeModal}>
                <div className="mt-10 w-72">
                    <h1 className="text-xl text-center font-bold">¡Bienvenido!</h1>
                    <h1 className="mt-5 text-lg text-center font-bold">Ingresa de nuevo con tu usuario y contraseña creado</h1>
                    <div className="flex justify-center">
                        <button
                            className="mt-10 font-bold w-40 h-8 bg-orange text-white hover:bg-green"
                            onClick={()=>navigate('/')}
                        >Inicio</button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isEditOpenModal} closeModal={editCloseModal}>
                <div className="mt-10 w-72">
                    <h1 className="text-xl text-center font-bold">{userData.name}</h1>
                    <h1 className="mt-5 text-lg text-center font-bold">Tus datos fueron modificados con exito.</h1>
                    <h1 className="mt-5 text-lg text-center font-bold">Vuelve a ingresar con tus credenciales.</h1>
                    <div className="flex justify-center">
                        <button
                            className="mt-10 font-bold w-40 h-8 bg-orange text-white hover:bg-green"
                            onClick={()=>navigate('/')}
                        >Inicio</button>
                    </div>
                </div>
            </Modal>
        </>
    )
};

export default Profile;