import style from '../styles/Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Navbar = () => {
const quantity = useSelector((state)=>state.cart.quantity)

    return (
        <div className={style.container}>
            <div className={style.item}>
                <div className={style.callButton}>
                    <Image src='/img/telephone.png' width="32" height="32"  alt="call icon"/>
                </div>
                <div className={style.texts}>
                    <div className={style.text}>Order Now!</div>
                    <div className={style.text}>+91 897 897 8970</div>
                </div>
            </div>
            <div className={style.item}>
                <ul className={style.list}>
                <Link href="/">
                    <a><li className={style.listItem}>Home</li></a>
                    </Link>
                    <li className={style.listItem}>Products</li>
                    <li className={style.listItem}>Menu</li>
                    <Image src='/img/logo.png' width="160px" height='69px' alt=""/>
                    <li className={style.listItem}>Events</li>
                    <li className={style.listItem}>Blog</li>
                    <li className={style.listItem}>Contact</li>
                    <li className={style.listItem}>More...</li>
                </ul>
            </div>
            <div className={style.item}>
               <div className={style.cart}>
               <Link href="/cart" passHref>
               <Image src="/img/cart.png" width="30px" height="30px" alt=""/>
               </Link>
                <div className={style.counter}>{quantity}</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
