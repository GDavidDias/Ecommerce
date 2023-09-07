import { Route, Routes, useLocation } from "react-router-dom";
import ListProducts from "../../components/ListProducts/ListProducts";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import style from './Home.module.css';
import Cart from "../../components/Cart/Cart";
import Landing from "../../components/Landing/Landing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setPage } from "../../redux/pageSlice";

const Home = () =>{
    const pageSG = useSelector((state)=>state.page.page);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log("en que pagina esta: ", pageSG)
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
                {pageSG==='marketProducts'
                    ?<ListProducts/>
                    :<Cart/>
                }

            </div>
            <div className={style.footer}>
                <Footer/>
            </div>
        </>
    )
};

export default Home;