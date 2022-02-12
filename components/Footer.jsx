import style from '../styles/Footer.module.css';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className={style.container}>
            <div className={style.item}>
                <Image src='/img/bg.png' layout="fill" objectFit='cover' alt="pic"/>
            </div>
            <div className={style.item}>
                <div className={style.card}>
                    <h2 className={style.motto}>
                        OH YES WE MADE THE PIZZA IN BEST OF ALL TERMS
                    </h2>
                </div>
                <div className={style.card}>
                    <h1 className={style.title}>FIND OUR RESTAURANT</h1>
                    <p className={style.text}>
                        1654 R. Don Road #304.
                        <br/> New York, 85022
                        <br/> (602) 867-1010
                    </p>
                    <p className={style.text}>
                        1654 R. Don Road #304.
                        <br/> New York, 85022
                        <br/> (602) 867-1010
                    </p>
                    <p className={style.text}>
                        1654 R. Don Road #304.
                        <br/> New York, 85022
                        <br/> (602) 867-1010
                    </p>
                    <p className={style.text}>
                        1654 R. Don Road #304.
                        <br/> New York, 85022
                        <br/> (602) 867-1010
                    </p>
                </div>
                <div className={style.card}>
                    <h1 className={style.title}>WORKING HOURS</h1>
                    <p className={style.text}>
                        MONDAY UNTIL FRIDAY
                        <br/> 9:00 - 22:00
                    </p>
                    <p className={style.text}>
                        SATURDAY - SUNDAY
                        <br/> 12:00 - 24:00
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer
