import { Route, Routes, useLocation } from "react-router-dom";
import ListProducts from "../../components/ListProducts/ListProducts";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import style from './Home.module.css';
import Cart from "../../components/Cart/Cart";
import Landing from "../../components/Landing/Landing";

const Home = () =>{
    const location = useLocation();
    return(
        <>
            <div className={style.navBar}>
                {location.pathname!=='/' ?<NavBar/> :null}
                {/* <NavBar/> */}
            </div>
            <div className={style.body}>
                <Routes>
                    <Route exact path="/marketProducts" element={<ListProducts/>} />
                    <Route exact path="/cart" element={<Cart/>}/>
                    <Route exact path="/" element={<Landing/>}/>
                </Routes>
            </div>
            <div className={style.footer}>
                <Footer/>
            </div>
        </>
    )
};

export default Home;