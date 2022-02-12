import dbConnect from '../../../util/mongoconnection';
import Order from '../../../models/Order';

const handler = async(req,res)=>{
    const {method, query:{id}} = req;

      await dbConnect();


    if(method === "GET"){
            const orders =  await Order.findById(id);
            res.status(200).json(orders)
    }

    if(method === 'PUT'){
      try{
          const order =  await Order.findByIdAndUpdate(id,req.body,{
            new: true,
          });
          res.status(200).json(order)
      }catch(err){
          res.status(500).json(err);
      }
    }

    if(method === 'DELETE'){
       try{
         await Order.findByIdAndDelete(id);
          res.status(201).json("Customer Order Has Been Deleted");
       }catch(err){
         res.status(500).json(err);
       }
    }
}


export default handler