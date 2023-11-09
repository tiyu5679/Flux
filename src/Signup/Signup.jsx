import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/Authcontext';
import '../Login/Login.css';

const Signup = () => {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('')
  const {user, SignUp} = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try
    {
      await SignUp(email,password)
      navigate('/Profile')
    }catch(error)
    {
      console.log("Invalid Username or password")
      setError('Invalid Entry of any one or both data')
    }
  }
  return (
    <>
    <div className='Box'>

          <h1 className='log-heading'>Sign Up</h1><br></br>

          <form onSubmit={handleSubmit}  className=''>
            <input onChange={(e)=> setEmail(e.target.value)} className='tf1' type="email" placeholder='Enter Your Email' ></input><br></br>
            <input onChange={(e)=> setPassword(e.target.value)} className='tf2' type="password" placeholder='Create Password' />
            <p className='st' >Password Must be 6-13 Characters long</p>
            <button onSubmit={handleSubmit} className='btn1'>Sign Up to FluxV1</button>

            
            <div className='line'>
          <p><input className='cb1' type="checkbox"/>Remeber Me</p>
          <p className='cb2'>Need Help?</p> 
          </div>

          <p className='lastline'><span className=''>
          Already Subscribed To FluxV1??
          </span>{' '}
          <Link to='/login' className='hov'>Sign In</Link>
          </p>
          </form>
          
        
    
    </div>
    </>
    
  )
}

export default Signup
