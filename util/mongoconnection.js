// import mongoose from 'mongoose'
// const dbConnect = async () =>{

//    await mongoose.connect(process.env.MONGO_URL,{
   
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
       
//     }).then( ()=>{
//         console.log("Database Connected");
//     }).catch((err)=>{
//         console.log('Failed to Connect Databse: '+err);
//     });

// }


// export default dbConnect


import mongoose from 'mongoose'
const dbConnect = async () =>{
   await mongoose.connect(process.env.MONGO_URI_SAM,{
   
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
    }).then( ()=>{
        console.log("Database Connected");
    }).catch((err)=>{
        console.log('Failed to Connect Databse: '+err);
    });

}

export default dbConnect


