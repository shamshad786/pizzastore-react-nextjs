import style from '../styles/Cart.module.css';
import Image from 'next/image';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from "react";
import { useState } from 'react';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

import axios from 'axios';
import { useRouter } from 'next/router';
import { reset } from '../redux/cartSlice'; 
import OderDetail from '../components/OderDetail';

const Cart = () => {

    const [open,setOpen] = useState(false)
    const [cash,setCash] = useState(false)
    const dispatch =  useDispatch();
    const cart = useSelector((state)=> state.cart);
    const router = useRouter();

    // paypal gateway options start
    const amount = cart.total;
    const currency = "USD";
    const style1 = {"layout":"vertical"};
    // paypal gateway options end

    const createOrder = async (data)=>{
      //  console.log("hello");
        try{
            // const res = await axios.post("http://localhost:3000/api/orders", data);
             
            //TODO: For Production
            const res = await axios.post( process.env.hostURL +  "/api/orders", data);
            res.status === 201 && router.push('/orders/'+ res.data._id);
            console.log(res.data._id);
            
            dispatch(reset());
        }catch(err){
            console.log(err);
            
        }
    } 

    //Razorpay gateway start

    const initializeRazorpay = () => {
       // console.log("In Initialize");
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
    
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
    
          document.body.appendChild(script);
        });
      };
    
    const makePayment = async () => {
       // console.log("in make payement");
        //createOrder({customer : ""})

        const res = await initializeRazorpay();
    
        if (!res) {
          alert("Razorpay SDK Failed to load");
          return;
        }
    
        // Make API call to the serverless API
        const data = await fetch("/api/razorpay", 
      
        { method: "POST" , 
            headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
            },
            body : JSON.stringify({price : cart.total})}
            
            ).then((t) =>
          t.json());
        console.log(data);
        var options = {
          key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
          name: "Shamshad Hussain Company",
          currency: data.currency,
          amount: data.amount,
          order_id: data.id,
          description: "Payment for pizza",
          image: "https://manuarora.in/logo.png",
          handler: function (response) {
            // Validate payment at server - using webhooks is a better idea.
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_signature);
            createOrder({
                customer: "test",
                address: "delhi",
                total: cart.total,
                method: 1

            })
          },
          prefill: {
            name: "Shamshad",
            email: "shamshad3300@gmail.com",
            contact: "9999999999",
          },
          "theme": {
            "color": "#d1411e"
        }
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };

      //razorpay gateway end


//paypal payment gateway start

    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    
        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);
    
    
        return (<>
                { (showSpinner && isPending) && <div className="spinner" /> }
                <PayPalButtons
                    style={style1}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (details) {
                            // Your code here after capture the order
                             console.log(details);

                            const shipping = details.purchase_units[0].shipping;
                            createOrder({
                                customer: shipping.name.full_name,
                                address: shipping.address.address_line_1,
                                total: cart.total,
                                method: 1,

                            })
                        });
                    }}
                />
            </>
        );
    }

    //paypal payment gateway end


    return (
      
        <div className={style.container}>
        
            <div className={style.left}>
                <table className={style.table}>
                <tbody>
                    <tr className={style.trTitle}> 
                    <th>Product</th>
                    <th>Name</th>
                    <th>Extra</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    </tr>
                    </tbody>
                    <tbody>
                    {
                        cart.products.map((product) =>(
                    <tr className={style.tr} key={product._id}>
                    <td>
                        <div className={style.imgContainer}>
                            <Image src={product.img} alt='' layout='fill' objectFit='cover' />
                        </div>
                    </td>
                    <td>
                        <span className={style.name}>{product.title}</span>

                    </td>

                    <td>
                        <span className={style.extras}>
                        {
                            product.extras.map((extra)=>(
                                <span key={extra._id}>{extra.text}, </span>
                            ))
                        }
                        </span>
                    </td>
                    <td>
                        <span className={style.price}>${product.price}</span>
                    </td>
                    <td>
                        <span className={style.quantity}>{product.quantity}</span>
                    </td>
                    <td>
                        <span className={style.total}>${product.price * product.quantity}</span>
                    </td>

                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className={style.right}>
                <div className={style.wrapper}>
                    <h2 className={style.title}>CART TOTAL</h2>

                    <div className={style.totalText}>
                        <b className={style.totalTextTitle}>Subtotal: </b> ${cart.total}
                    </div>
                    <div className={style.totalText}>
                        <b className={style.totalTextTitle}>Discount:</b> $0.00
                    </div>
                    <div className={style.totalText}>
                        <b className={style.totalTextTitle}>Total:</b> ${cart.total}
                    </div>

                    {open ? (
                <div className={style.paymentgateway}>
                <button className={style.payButton} onClick={()=>setCash(true)}>CASH ON DELIVERY</button>

                {/* paypal gateway payement button start */}
                <PayPalScriptProvider 
                options={{
                    "client-id": "ARo-ae4Xzj3hwBevnS1eRkK8JOk5ApysRDgMRURAfrf19ikla9_yBMKX4V4kwucbwUXN-ssyNpSJlY5T",
                    components: "buttons",
                    currency: "USD",
                    "disable-funding": "credit,p24,venmo",
                }}
            >
				<ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                />
			</PayPalScriptProvider>

            {/* paypal gateway payement button end */}

            <button onClick={makePayment}>Pay With Razorpay</button>
                   
                </div>
                    ) : (
                        <button onClick={()=>setOpen(true)} className={style.button}>CHECKOUT NOW!</button>
                    )}
                   
                </div>
            </div>
            {
                cash && <OderDetail total = {cart.total} createOrder = {createOrder}/> 
            }
           
        </div>
    )
}

export default Cart
