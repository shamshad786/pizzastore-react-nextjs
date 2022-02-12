import style from '../styles/Add.module.css';
import { useState } from 'react';
import axios from 'axios';


const Add = ({setClose}) => {

    const [file,setFile] = useState(null);
    const [title,setTitle] = useState(null);
    const [desc,setDesc] = useState(null);
    const [prices,setPrices] = useState([]);
    const [extra,setExtra] = useState(null);
    const [extraOption,setExtraOption] = useState([]);

    console.log(extraOption);

  const changePrice = (e, index)=>{
    const currentPrice =  prices;
    currentPrice[index] =  e.target.value;
    setPrices(currentPrice); 
  }

    const handleExtraInput = (e)=>{
      setExtra({...extra, [e.target.name]: e.target.value});
  
    }

    const handleExtra = (e) =>{
      setExtraOption((prev) => [...prev, extra])
      // console.log(extra);
    }

    //TODO: Cloudinary Pizza images upload setup with its API.

    const handleCreate = async() =>{
        const data = new FormData();
        data.append("file", file);
        data.append('upload_preset', 'upload');
        try{
              const uploadData = await axios.post('https://api.cloudinary.com/v1_1/doienpnm7/image/upload', data);
              //console.log(uploadData);

          const {url} =  uploadData.data;
          const newProduct = {
            title: title,
            desc: desc,
            prices: prices,
            extraOptions: extraOption,
            img: url,
          };

         // await axios.post("http://localhost:3000/api/products", newProduct);

          //TODO: For production
          await axios.post(process.env.hostURL + '/api/products', newProduct);
          setClose(true);

        }catch(err){
          console.log("Product Not Created " + err);
        }
    }
    

  return <div className={style.container}>
  <div className={style.wrapper}>
    <span onClick={()=>setClose(true)} className={style.close}>X</span>
 
    <h1>Add New Pizza</h1>
    <div className={style.item}>
        <label className={style.label}>Choose an Image</label>
        <input type="file" onChange={(e)=> setFile(e.target.files[0])} />
    </div>
    <div className={style.item}>
        <label className={style.label}>Title</label>
        <input className={style.input} type="text" onChange={(e)=> setTitle(e.target.value)} />
    </div>
    <div className={style.item}>
        <label className={style.label}>Desc</label>
        <textarea  rows={4} type="text" onChange={(e)=> setDesc(e.target.value)} />
    </div>
    <div className={style.item}>
        <label className={style.item}>Prices</label>
        <div className={style.priceContainer}>
        <input className={`${style.input} ${style.inputsm}`} 
        type="number" placeholder='Small' onChange={(e)=> changePrice(e, 0)} />
        <input className={`${style.input} ${style.inputsm}`} type="number" placeholder='Medium' onChange={(e)=> changePrice(e, 1)} />
        <input className={`${style.input} ${style.inputsm}`} type="number" placeholder='Large' onChange={(e)=> changePrice(e, 2)} />
    </div>
    </div>

    <div className={style.item}>
      <label className={style.label}></label>
      <div className={style.extra}>
        <input className={`${style.input} ${style.inputsm}`} type="text" placeholder='Item' name='text' onChange={handleExtraInput} />
        <input className={`${style.input} ${style.inputsm}`} type="number" placeholder='Price' name='price' onChange={handleExtraInput} />
        <button className={style.extraButton} onClick={handleExtra}>Add</button>
      </div>
      <div className={style.extraItems}>
        {extraOption.map((option)=>(
          <span key={option.text} className={style.extraItem}>{option.text}</span>
        ))}
      </div>
      <button className={style.addButton} onClick={handleCreate}>
        Create
      </button>
    </div>
  </div>
  </div>;
};

export default Add;
