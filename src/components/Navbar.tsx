import React from 'react'
import {useSelector} from 'react-redux'

export const Navbar = () => {
    const HandleAccount = useSelector((state) => state.account.value)
    console.log(`Connected to ${HandleAccount}`);
    
  return (
    <div className="navbar-container flex justify-between py-5 border-b-2 border-[#331D2C]">
        <div className="logo-container ml-5">
            <h1 className='text-3xl font-bold text-white'>FLUX</h1>
        </div>
        <div className="wallet-container mr-5">
            {
                HandleAccount === undefined ? 
                <b>Connect Wallet</b> : 
                <h1 className='text-lg hidden md:block'>
                    Connected to: {HandleAccount.slice(0, 8)}...
                </h1>
            }
        </div>
    </div>
  )
}