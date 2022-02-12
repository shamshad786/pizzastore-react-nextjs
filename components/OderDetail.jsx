import { useState } from 'react';
import style from '../styles/OrderDetail.module.css';

const OderDetail = ({total,createOrder}) => {

    const [customer, setCustomer] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] =  useState("");

    const handleClick = () =>{
            createOrder({
                customer,
                total,
                address,
                method: 0,
            }) 
    }

  return <div className={style.container}>

    <div className={style.wrapper}>
        <h1 className={style.title}>You will pay $12 After Delivery</h1>
        <div className={style.item}>
        <label className={style.label}>Name Surname</label>
        <input type='text' placeholder='Enter Your Name' className={style.input} onChange={(e)=> setCustomer(e.target.value)} />
        </div>
        <div className={style.item}>
          <label className={style.label}>Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"
            className={style.input}
            onChange={(e)=> setPhone(e.target.value)}
          />
        </div>
        <div className={style.item}>
          <label className={style.label}>Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"
            className={style.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={style.button} onClick={handleClick}>
          Order
        </button>
    </div>

  </div>;
};

export default OderDetail;
