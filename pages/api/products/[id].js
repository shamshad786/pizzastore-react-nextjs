import dbConnect from '../../../util/mongoconnection'
import Product from '../../../models/Product'


export default async function handler(req, res) {
    const {method, query:{id}, cookies} = req;
  await  dbConnect()

    const token = cookies.token;

    if(method === 'GET'){

      

        const product = await Product.findById(id);
        res.status(200).json(product);
       // console.log(product);
    }

    if(method === 'PUT'){
      if(!token || token !== process.env.TOKEN){
        return res.status(401).json("you are not Authorised");
      }
            try{
            const product = await Product.create(req.body);
            res.status(201).json(`your product has been created ${product}`);
            }catch(err){
                console.log(`something error while posting the product the error is ${err}`)
                res.status(500).json(err);
            } 
    }
    if(method === 'DELETE'){ 
      if(!token || token !== process.env.TOKEN){
        return res.status(401).json("you are not Authorised");
      }
            try{
              await Product.findByIdAndDelete(id);
            res.status(201).json(`products Has been Deleted`);
            }catch(err){
                console.log(`something error while posting the product the error is ${err}`)
                res.status(500).json(err);
            } 
    }
  }


