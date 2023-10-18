import { Route, Routes, useLocation } from "react-router-dom";
import ListProducts from "../../components/ListProducts/ListProducts";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import style from './Home.module.css';
import Cart from "../../components/Cart/Cart";
import UserProducts from "../../components/userProducts/UserProducts";
import Profile from "../../components/Profile/Profile";
import Landing from "../../components/Landing/Landing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setPage } from "../../redux/pageSlice";

const Home = () =>{
    const pageSG = useSelector((state)=>state.page.page);
    const[content,setContent] = useState(null);
    const dispatch = useDispatch();
    //let content;

    useEffect(()=>{
        console.log("en que pagina esta: ", pageSG)

        switch(pageSG){
            case 'marketProducts':
                setContent(<ListProducts/>);
                break;
            case 'cart':
                setContent(<Cart/>);
                break;
            case 'userProducts':
                setContent(<UserProducts/>);
                break;
            case 'profile':
                setContent(<Profile/>);
                break;
            default:
                setContent(<ListProducts/>);
        };

        // console.log('que tiene content: ', content)

    },[pageSG])
    
    useEffect(()=>{
        //?INICIA CON PAGINA -> marketProducts
        dispatch(setPage('marketProducts'))
    },[])

    return(
        <>
            <div className={style.navBar}>
                <NavBar/>
            </div>
            <div className={style.body}>
                {content}
            </div>
            <div className={style.footer}>
                <Footer/>
            </div>
        </>
    )
};

export default Home;