import { Link } from "react-router-dom";

const Landing = () => {
    return (
            <div className="h-screen flex flex-col justify-center bg-gradient-to-b from-[#85A0F2] to-[#4BF286]">
                <div>
                    <h1 className="text-2xl font-bold text-center"
                    >Bienvenidos a la Tienda Virtual</h1>
                </div>
                
                <div className="flex justify-center mt-2">
                    <Link to={'/home'}>
                        <button 
                            className="bg-orange hover:bg-green text-white font-bold w-40 h-8"
                        >Ingresar</button>
                    </Link>
                </div>
            </div>
    )
};
 
export default Landing;