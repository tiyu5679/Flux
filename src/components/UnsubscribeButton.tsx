import React from 'react'
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import {useSelector, useDispatch} from 'react-redux'
import { revokeAcess } from '../features/HandleSubscription';

  // This function deletes the flow 
export const UnsubscribeButton = () => {
  const HandleSubscribtion = useSelector((state) => state.subscribe.value)
  const dispatch = useDispatch();

  const deleteExistingFlow = async() => {
    console.log('started');
    
    // Enter the account address you want to accepts payments from
    const recipient = "0x6eba7Bd536557de0D0038905d7C0a4E0dCdd7ab1"
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
  
    const signer = provider.getSigner();
  
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider
    });
  
    const superSigner = sf.createSigner({ signer: signer });
  
    // Load the super token you want to access
    console.log(signer);
    console.log(await superSigner.getAddress());
    const daix = await sf.loadSuperToken("fDAIx");
  
    console.log(daix);
    
    try {
      const deleteFlowOperation = daix.deleteFlow({
        sender: await signer.getAddress(),
        receiver: recipient
        // userData?: string
      });
  
      console.log(deleteFlowOperation);
      console.log("Deleting your stream...");
  
      const result = await deleteFlowOperation.exec(superSigner);
      console.log(result);
      // Once the flow is sccessfully deleted revoke access from the user
      dispatch(revokeAcess())
      console.log(`Subscribtionstatus at Unsubscribe Button" ${HandleSubscribtion}`);

      console.log(
        `Congrats - you've just updated a money stream!
      `
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }

  return (
    <div className="subscribe-button">
        <button className='bg-[#331D2C] text-[#F4EEE0] hover:bg-[#F4EEE0] hover:text-[#331D2C] border-2 border-[#331D2C] py-2 px-4 rounded-xl  text-xl'
          onClick={deleteExistingFlow}
        >
            Unubscribe
        </button>
    </div>
  )
}