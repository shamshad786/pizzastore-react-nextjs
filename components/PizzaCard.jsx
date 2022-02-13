import style from '../styles/PizzaCard.module.css'
import Image from 'next/image';
import Link from 'next/link';

const PizzaCard = ({pizza}) => {
    console.log("this is data from pizza card" +  pizza)
    return (
        <div className={style.container}>
        <Link href={`/product/${pizza._id}`} passHref>
           <Image src={pizza.img} alt='' width="500" height="500" />
           </Link>
           <h1 className={style.title}>{pizza.title}</h1>
           <span className={style.price} >${pizza.prices[0]}</span>
           <p className={style.desc}>{pizza.desc}</p>
        </div>
    )
}

export default PizzaCard
