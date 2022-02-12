import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import style from '../../styles/Login.module.css';

const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);

    const router = useRouter();

    const loginHandler = async ()=>{
        try{

           // await axios.post('http://localhost:3000/api/login', {
                //TODO: For Production
             await axios.post(`${process.env.hostURL}/api/login`, {
                username,
                password
            });
            router.push("/admin");
            
        }catch(err){
            console.log(err);
            setError(true);
        }
    }

  return (
      <div className={style.container}>
            <div className={style.wrapper}>
                <h1>Admin Dashboard</h1>
                {error && <span className={style.error}>Wrong Credentials!</span>}
                
                <input className={style.input} type="text" placeholder='Username' onChange={(e)=>setUsername(e.target.value)} required  autoComplete="new-password"/>
                <input className={style.input} type="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)} required autoComplete="new-password" />
                <button onClick={loginHandler} className={style.button}> Sign In</button>
                
            </div>
      </div>
  )
};

export default Login;
