import { Route, Routes } from "react-router-dom";
import ListProducts from "../../components/ListProducts/ListProducts";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import style from './Home.module.css';
import Cart from "../../components/Cart/Cart";

const Home = () =>{
    return(
        <>
            <div className={style.navBar}>
                <NavBar/>
            </div>
            <div className={style.body}>
                <Routes>
                    <Route path="/" element={<ListProducts/>} />
                    <Route path="/cart" element={<Cart/>}/>
                </Routes>
            </div>
            <div className={style.footer}>
                <Footer/>
            </div>
        </>
    )
};

export default Home;