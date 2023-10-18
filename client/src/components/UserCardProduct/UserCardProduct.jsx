const UserCardProduct = (props) =>{
    const{title,image,description,price,stock} = props;
    return(
        <>
            {/* id,title,image,description,price,stock */}
            <div className="my-2 p-2 flex justify-between border-2 border-slate-400  gap-1">
                {/* PARTE IZQUIERDA */}
                <div>
                    <h1 className="font-bold">{title}</h1>
                    <div className="overflow-hidden px-2 h-12">
                        <h1 className="text-left ">{description}</h1>
                    </div>
                    <div className="px-2 flex flex-row gap-4">
                        <h1>Precio Unitario: {`$ ${price}`}</h1>
                        <h1>Cantidad en Stock: {stock}</h1>
                    </div>
                </div>
                {/* PARTE DERECHA */}
                <div className="w-32 h-32 overflow-hidden">
                    <img className="h-full" src={image}/>
                </div>
            </div>
        </>
    )
};

export default UserCardProduct;