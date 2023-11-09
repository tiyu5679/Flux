import React from 'react'
import {useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css';
import { UserAuth } from '../context/AuthContext';

export const Navbar = () => 
{
    const HandleAccount = useSelector((state) => state.account.value)
    console.log(`Connected to ${HandleAccount}`);

    
  return (
    <div className="navbar-container flex justify-between py-3 border-b-2 border-[#331D2C]">

        <div className="logo-container ml-5">
            <Link to="/Profile">
            <h1 className='text-3xl font-bold text-white'>FLUX</h1>
            </Link>
            
        </div>

         <div className="wallet-container mr-2">
        {
        HandleAccount === undefined ? 
        <b>Connect Wallet</b> : 
        <h1 className='text-lg hidden md:block'>
        Connected to: {HandleAccount.slice(0, 8)}...
        </h1>
        }
    </div> 
      
        <div>
        <Link to='/Login'>
        <button className='logg'>Sign In</button>
        </Link>
        <Link to='/'>
        <button className='signn'>Sign Up</button>
        </Link>
        
      </div>
      


    </div>
  )
}
{/* <div className="wallet-container mr-5">
{
    HandleAccount === undefined ? 
    <b>Connect Wallet</b> : 
    <h1 className='text-lg hidden md:block'>
        Connected to: {HandleAccount.slice(0, 8)}...
    </h1>
}
</div> */}