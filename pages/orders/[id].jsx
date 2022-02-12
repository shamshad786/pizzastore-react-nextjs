import style from '../../styles/Order.module.css';
import Image from 'next/image';
import axios from 'axios';


const order = ({order}) => {

    const status = order.status;

    const statusClass = (index)=>{
         if(index - status < 1) return style.done;
         if(index - status === 1) return style.inProgress;
         if(index - status >  1) return style.undone;

    }


    return (
        <div className={style.container}>
            <div className={style.left}>
                <div className={style.rows}>
                <table className={style.table}>
                <tbody>
                    <tr className={style.trTitle}> 
                    <th>Order Id</th>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Total</th>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr className={style.tr}>
                    <td>
                        <span className={style.id}>{order._id}</span>

                    </td>

                    <td>
                        <span className={style.name}>{order.customer}</span>
                    </td>
                    <td>
                        <span className={style.address}>{order.address}</span>
                    </td>
                    <td>
                        <span className={style.total}>${order.total}</span>
                    </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div className={style.rows}>
                    <div className={statusClass(0)}>
                       <Image src="/img/paid.png" width={30} height={30} alt='' /> 
                       <span>Payment</span>
                       <div className={style.checkedIcon}>
                           <Image className={style.checkedIcon} src="/img/checked.png" width={20} height={20} alt=''/>
                       </div>
                    </div>
                    <div className={statusClass(1)}>
                       <Image src="/img/bake.png" width={30} height={30} alt='' /> 
                       <span>Preparing</span>
                       <div className={style.checkedIcon}>
                           <Image className={style.checkedIcon} src="/img/checked.png" width={20} height={20} alt=''/>
                       </div>
                    </div>
                    <div className={statusClass(2)}>
                       <Image src="/img/bike.png" width={30} height={30} alt='' /> 
                       <span>On the way</span>
                       <div className={style.checkedIcon}>
                           <Image className={style.checkedIcon} src="/img/checked.png" width={20} height={20} alt=''/>
                       </div>
                    </div>
                    <div className={statusClass(3)}>
                       <Image src="/img/delivered.png" width={30} height={30} alt='' /> 
                       <span>Delivered</span>
                       <div className={style.checkedIcon}>
                           <Image className={style.checkedIcon} src="/img/checked.png" width={20} height={20} alt=''/>
                       </div>
                    </div>
                </div>
            </div>
            <div className={style.right}>
            <div className={style.wrapper}>
                    <h2 className={style.title}>CART TOTAL</h2>

                    <div className={style.totalText}>
                        <b className={style.totalTextTitle}>Subtotal: </b> ${order.total}
                    </div>
                    <div className={style.totalText}>
                        <b className={style.totalTextTitle}>Discount:</b> $0.00
                    </div>
                    <div className={style.totalText}>
                        <b className={style.totalTextTitle}>Total:</b> ${order.total}
                    </div>
                    <button disabled className={style.button}>PAID</button>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async({params}) =>{
    // const res =  await axios.get(`http://localhost:3000/api/orders/${params.id}`);

    //TODO: For Production
    const res =  await axios.get(`${process.env.hostURL}/api/orders/${params.id}`);

    return{
        props:{
            order: res.data
        },
    }
}



export default order
