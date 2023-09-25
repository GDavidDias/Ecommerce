import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from '../../../varGlobal';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice";

const Landing = () => {

    const userSG = useSelector((state)=>state.user);
    const dispatch = useDispatch();

    const[formData,setFormData] = useState({
        username:'',
        password:'',
    });
    const[validate, setValidate] = useState(true);
    const[msgError, setMsgError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    };

    const submitHandler = async(event) =>{
        console.log('se presiona submit');
        event.preventDefault();
        console.log('que tiene form: ', formData);
        console.log('como pasa url: ', URL+'/login');

        if(formData.username && formData.password){
            await axios.post(`${URL}/login/`,formData)
            .then(async res=>{
                console.log('que tiene res.data: ',res.data)
                dispatch(setUser(
                    {username:res.data.username, 
                     name:res.data.name,
                     id:res.data.id
                    }
                    ));
                document.cookie = `token=${res.data.token};max-age${60*3}; path=/; samesite=strict`;
                console.log('que tiene cookie: ', document.cookie);
                navigate('/home');
            })
            .catch(error=>{
                if(error.response){
                    const errorMensaje = error.response.data.error;
                    console.log('que trae error: ', errorMensaje)
                    setValidate(false)
                    setMsgError(errorMensaje)
                }
            })
        }
        if(!(formData.username && formData.password)){
            navigate('/home');
        }
        


    };

    useEffect(()=>{
        console.log('que tiene formData: ', formData);
        
        if((!formData.username && !formData.password) || (formData.username && formData.password)){
            setValidate(true);
            setMsgError('') 
        } else {
            setValidate(false);
            setMsgError('Faltan completar campos')
        }
    
        console.log('que tiene validate: ', validate)
    },[formData],[validate])

    return (
            <div className="h-screen flex flex-col justify-center bg-gradient-to-b from-[#85A0F2] to-[#4BF286]">
                <div>
                    <h1 className="text-2xl font-bold text-center"
                    >Bienvenidos a la Tienda Virtual</h1>
                </div>
                <div className="flex flex-col items-center mt-2">
                    <form >
                        <div className="flex flex-col items-center my-5">
                            <input
                                name='username'
                                type='text'
                                placeholder="username"
                                className="my-3 px-2 py-1"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <input
                                name="password"
                                type="text"
                                placeholder="contraseña"
                                className="my-3 px-2 py-1"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="h-4">
                            {validate ?<p></p> :<p className="italic text-red-500">{msgError}</p>}
                        </div>
                        <div className="flex justify-center mt-4">
                                <button 
                                    className={`font-bold w-40 h-8 
                                    ${(validate) 
                                        ?`bg-orange hover:bg-green text-white` 
                                        :`bg-slate-400 hover:bg-slate-400 text-white`} 
                                    `}
                                    disabled={!validate}
                                    onClick={submitHandler}

                                >Ingresar</button>
                        </div>
                    </form>
                </div>
                
            </div>
    )
};
 
export default Landing;