import style from '../../styles/ProductId.module.css';
import Image from 'next/image';
import { useState } from 'react/cjs/react.development';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';

const ProductId = ({pizza}) => {
    const [size, setSize] = useState(0);
    const [price, setPrice] = useState(pizza.prices[0]);
    const [extras, setExtra] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const dispatch =  useDispatch();
    const quantityHandler = (e) =>{
        const value = e.target.value
        if(value < 1){
          alert('Minimum Quantity At Least 1');
        }else if(value >= 1){
            setQuantity(value);
        }
    }

    const changePrice = (number) =>{
        setPrice(price + number);
    }
    const handleSize = (sizeIndex)=>{
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
      setSize(sizeIndex);
      changePrice(difference);
    }
    const handleChange = (e,option)=>{
        const checked = e.target.checked;
    
        if(checked){
              changePrice(option.price)
              setExtra((prev)=> [...prev,option]);  
        }else{
            changePrice(-option.price)
            setExtra(extras.filter((extra)=> extra._id !== option._id));
        }
    } 
    const handleClick = ()=>{
        dispatch(addProduct({...pizza, extras,price,quantity}));
    }

    return (
        <div className={style.container}>
             <div className={style.left}>
                 <div className={style.imgContainer}>
                     <Image src={pizza.img} layout='fill' alt="" />
                 </div>
             </div>   
             <div className={style.right}>
                 <h1 className={style.title}>{pizza.title}</h1>
                 <span className={style.price}>${price}</span>
                 <p className={style.desc}>{pizza.desc}</p>
                 <h3>choose your size</h3>

                 <div className={style.sizes}>
                     <div className={style.size} onClick={()=> handleSize(0)}>
                        <Image src="/img/size.png" layout='fill' alt=""/>
                        <span className={style.number}>Small</span>
                     </div>
                     <div className={style.size} onClick={()=> handleSize(1)}>
                        <Image src="/img/size.png" layout='fill' alt=""/>
                        <span className={style.number}>Medium</span>
                     </div>
                     <div className={style.size} onClick={()=> handleSize(2)}>
                        <Image src="/img/size.png" layout='fill' alt=""/>
                        <span className={style.number}>Large</span>
                     </div>
                 </div>
                 <h3 className={style.choose}>Choose Additional Ingredients</h3>
                 <div className={style.ingredients}>

                 {pizza.extraOptions.map((option)=>(
                    <div className={style.option} key={option._id}>
                    <input type="checkbox" id={option.text} name={option.text} className={style.checkbox} 
                        onChange={(e)=> handleChange(e, option)}
                    />
                    <label htmlFor='double'>{option.text}</label>
                    </div>
                 ))}
                 </div>
                 <div className={style.add}>
                     <input onChange={(e)=> quantityHandler(e)} type="number" defaultValue={quantity} className={style.quantity}/>
                     <button className={style.button} onClick={handleClick}>Add to cart</button>
                 </div>
             </div>   
        </div>
    )
}

export const getServerSideProps = async({params}) =>{
    // const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);

    //TODO: For Production
    const res = await axios.get(`${process.env.hostURL}/api/products/${params.id}`);
    console.log(res)
    return{
        props:{
            pizza: res.data
        },
    }
}

export default ProductId
