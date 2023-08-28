import style from './ProductCard.module.css';

const ProductCard = ({id,image,title,description}) =>{
    // console.log('que tiene prop product: ', product)
    // console.log('que tiene prop product.title: ', product.product.title)
    return(
        <>
            <div className='w-64 h-64 border-2 border-black p-2 flex flex-col items-center gap-1'>
                {/* <h1>producto</h1> */}
                {/* <img src=''/> */}
                <div className='w-60 h-24 border-2 border-red-500'>
                    <h1>imagen</h1>
                </div>
                <h1 className='text-lg font-bold text-center'>{title}</h1>
                <div className='w-60 h-16'>
                    <h3 className='text-left text-sm'>{description}</h3>
                </div>
                <div className='flex flex-row gap-3'>
                    <button className='bg-sky-500 hover:bg-cyan-600 text-white font-bold w-24 h-8'>Comprar</button>
                    <button className='bg-sky-500 hover:bg-cyan-600 text-white font-bold w-24 h-8'>Agregar</button>
                </div>
            </div>
        </>
    )
};

export default ProductCard;