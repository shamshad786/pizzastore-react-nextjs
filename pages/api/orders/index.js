import dbConnect from '../../../util/mongoconnection';
import Order from '../../../models/Order';

const handler = async(req,res)=>{
    const {method} = req;

       await dbConnect();


    if(method === "GET"){
        try{
            const orders = await Order.find();
            res.status(200).json(orders);
            
        }catch(err){
            res.status(500).json({Error: `something went wrong while fetching orders ${err}`})
        }

    }

    if(method === 'POST'){
            try{
                const order  = await Order.create(req.body);
                res.status(201).json(order);

            }catch(err){
                res.status(500).json({ Error: `Something went wrong while creating order ${err}`})
            }

    }
}

export default handler