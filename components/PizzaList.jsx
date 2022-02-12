import style from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

const PizzaList = ({pizzaList}) => {
    return (
        <div className={style.container}>
            <h1 className={style.title}>The Best Pizza In Town</h1>
            <p className={style.desc}>
            It is a long established fact that a reader will be distracted by the 
            readable content of a page when looking at its layout. The point of
             using Lorem Ipsum is that it has a more-or-less normal distribution 
             of letters, as opposed to using Content here,
            </p>

            <div className={style.wrapper}>
            {pizzaList.map((pizza)=>(
                <PizzaCard key={pizza._id} pizza = {pizza} />
            ))}
            </div>

        </div>
    )
}

export default PizzaList
