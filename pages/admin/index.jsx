import style from '../../styles/Admin.module.css';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';

const Index = ({orders,products}) => {

    const [pizzaList, setPizzaList] =  useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ['preparing', 'on the way', 'delivered','order complete'];

    const handleDelete = async(product_id)=>{
        try{
            // await axios.delete('http://localhost:3000/api/products/' + product_id)
            //TODO: For Production
            await axios.delete(process.env.hostURL + '/api/products/' + product_id)

            const filterPizza = pizzaList.filter((pizza)=> pizza._id !== product_id);
           // console.log(filterPizza);
            setPizzaList(filterPizza);
        }
        catch(err){ 
            console.log(err);
        }
    }

    const handleStatus = async(id) =>{

        const item = orderList.filter((order)=> order._id === id)[0];
        const orderStatusCode = item.status;
            // console.log({orderList: item});
            // console.log(`order status code ${orderStatusCode}`);
        try{
            // const res = await axios.put('http://localhost:3000/api/orders/' + id, {status: orderStatusCode+1});
              //TODO: For Production
            const res = await axios.put(process.env.hostURL + '/api/orders/' + id, {status: orderStatusCode+1});
            setOrderList([
                res.data,
                 ...orderList.filter((order)=> order._id !== id),
                ]);
           // console.log(res.data);
        }catch(err){
            console.log(err);
        }
    };

    const deleteCustomerOrder = async(id)=>{
        try{
        //    await axios.delete('http://localhost:3000/api/orders/' + id);
         //TODO: For Production

           await axios.delete(process.env.hostURL + '/api/orders/' + id);
           const filterOrders = orderList.filter((order)=> order._id !== id);
           setOrderList(filterOrders)
        }catch(err){
            console.log(err);
        }

    }

  return (
      <>
          <div className={style.container}>
                <div className={style.item}>
                    <h1 className={style.title}>Products</h1>
                    <table className={style.table}>
                        <tbody>
                            <tr className={style.trTitle}>
                                <th>Image</th>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                            </tbody>
                            {pizzaList.map((product)=>(
                        <tbody key={product._id}>
                            <tr className={style.trTitle}>
                                <td>
                                    <Image src={product.img} width={50} height={50} objectFit="cover" alt=""/>
                                </td>
                                <td>{product._id}</td>
                                <td>{product.title}</td>
                                <td>${product.prices[0]}</td>
                                <td>
                                <button className={style.button}>Edit</button>
                                <button className={style.button} onClick={()=> handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>

                        </tbody>
                        ))}
                    </table>
                </div>
                <div className={style.item}>
                <h1 className={style.title}>Orders</h1>
                    <table className={style.table}>
                        <tbody>
                            <tr className={style.trTitle}>
                                <th>Id</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </tbody>
                            {orderList.map((order)=>(
                            <tbody key={order._id}>
                            <tr className={style.trTitle}>
                                <td>
                                  {order._id.slice(0,5)}...
                                </td>
                                <td>{order.customer}</td>
                                <td>${order.price}</td>
                                <td>{order.method === 1 ? "Paid" : "COD"}</td>
                                <td>{status[order.status] === status[4] ? "order complete" : status[order.status]}</td>
                                <td>
                                <button className={style.button} onClick={()=> handleStatus(order._id)}>Next Stage</button>
                                <button className={style.button} onClick={()=> deleteCustomerOrder(order._id)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                        ))}
                    </table>
                </div>
          </div>
      </>
  )
}

export const getServerSideProps =  async (ctx) =>{

    const myCookie = ctx.req?.cookies || "";
    if(myCookie.token !== process.env.TOKEN){
        return{
            redirect:{
                destination: "/admin/login",
                permanent: false,
            },
        };
    }

    // const productRes = await axios.get('http://localhost:3000/api/products');
    // const orderRes =  await axios.get('http://localhost:3000/api/orders');

    //TODO: For Production
    
    const productRes = await axios.get(process.env.hostURL + '/api/products');
    const orderRes =  await axios.get(process.env.hostURL + '/api/orders');
    return{
        props:{
            orders: orderRes.data,
            products: productRes.data,
        },
    }

}

export default Index;


//1:56:00