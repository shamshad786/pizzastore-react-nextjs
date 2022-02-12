import style from '../styles/Featured.module.css';
import Image from 'next/image';
import { useState } from 'react';

const Featured = () => {
    const[index, setIndex] = useState(0);

    const  images = [
        '/img/pizzaSlider1.png',
        '/img/pizzaSlider2.png',
        '/img/pizzaSlider3.png',
    ]
    const handleArrow = (direction) =>{
    if(direction === 'l'){
        setIndex(index !==0 ? index - 1 : 2);
    }
    if(direction ==='r'){
        setIndex(index !== 2 ? index + 1 : 0);
    }
    }

    return(
        <>
        <div className={style.supercontainer}>

        </div>
        <div className={style.container}>
        <div className={style.arrowContainer} style={{left:0}} onClick={()=> handleArrow('l')}>
            <Image src='/img/arrowl.png' alt="arrowl" layout='fill'  objectFit='contain'/>
            </div>
            <div className={style.wrapper} style={{transform: `translateX(${-100*index}vw)`}}>
                {images.map((img, i)=>(
                <div className={style.imageContainer} key={i}>
                <Image src={img} alt="pizza" layout='fill'  objectFit='contain'/>
                </div>
                ))}
            </div>
            <div className={style.arrowContainer} style={{right:0}} onClick={()=> handleArrow('r')}>
            <Image src='/img/arrowr.png' alt='arrowr' layout='fill' objectFit='contain'/>
            </div>
        </div>
        </>
    )
}

export default Featured
