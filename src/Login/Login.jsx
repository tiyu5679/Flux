import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/Authcontext';
import './Login.css';

const Login = () => {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, SetError] = useState('')
  const {user, LogIn} = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault()
    SetError('')
    try{
      await LogIn(email,password)
      navigate('/Profile')
    }catch(error){
      console.log(error)
      SetError('Invalid Username or password')
    }
  }

  return (
    <>

<div className='Box'>
    
      <h1 className='log-heading'>Log In</h1><br></br>
      {error?<p className='errors'>{error}</p>:null}

      <form onSubmit= {handleSubmit}className=''>
        <input onChange = {(e)=> setEmail(e.target.value)} className='tf1' type="email" placeholder='  Enter Your Email'></input><br></br>
        <input onChange = {(e)=> setPassword(e.target.value)} className='tf2' type="password" placeholder='  Enter Your Password'/>
        

        <div className=''>
        <button className='btn1'>Log In To FluxV1</button>
        <div className="line">
        <p><input className='cb1' type="checkbox"/>Remeber Me</p>
        <p className='cb2'>Need Help?</p>
        </div>
        
      </div>

      <p className='lastline'><span className=''>
      New To FluxV1?  
      </span>{' '}
      <Link to='/' className='hov'> Sign Up</Link>
      </p>
      </form>
      
    </div>
 

    </>
  )
}

export default Login
