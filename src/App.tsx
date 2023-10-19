// App.tsx
import "./App.css";

// Importing Redux 
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

// Importing React Hooks
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Importing Ethers
import { ethers } from "ethers";

// Importing SuperFluid libraries
import { Framework } from "@superfluid-finance/sdk-core";

// Importing Components
import { Navbar } from "./components/Navbar";
import { Profile } from "./components/Profile";
import { Content } from "./components/Content";
import { PrivateContent } from "./utils/PrivateContent";
import { addAccount } from "./features/HandleAccount";
import { provideAccess, revokeAcess } from "./features/HandleSubscription";
import PageNotFound from "./components/PageNotFound";

const getFlowRate = async (account) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const sf = await Framework.create({
    chainId: Number(chainId),
    provider: provider,
  });

  const daix = await sf.loadSuperToken("fDAIx");

  console.log(daix);

  try {
    const getFlow = await daix.getFlow({
      sender: account,
      receiver: "0x6eba7Bd536557de0D0038905d7C0a4E0dCdd7ab1",
      providerOrSigner: provider,
    });

    console.log(getFlow.flowRate);
    return getFlow.flowRate;
  } catch (error) {
    console.error(error);
  }
};

function App() {
  // State that checks if the user is connected or not
  const [isConnected, setIsConnected] = useState(false);

  // Managing Account State 
  const HandleAccount = useSelector((state) => state.account.value)
  const dispatch = useDispatch();
  // Checks if the user is isSubscribed
  const HandleSubscribtion = useSelector((state) => state.subscribe.value)
  console.log(HandleSubscribtion);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // Wallet Gets conected
        if (!isConnected) {
          setIsConnected(true);
        }
        checkFlow(HandleAccount)
        console.log(accounts[0]);
        dispatch(addAccount(accounts[0]));
      } else {
        alert("Install Metamask");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkFlow = async (account) => {
    const flow = await getFlowRate(account);
    if (Number(flow) >= 380517503805) {
      console.log("is Subscribed");
      if (!HandleSubscribtion.isSubscribed) {
        dispatch(provideAccess())
      }
      console.log(`Sub: ${HandleSubscribtion.isSubscribed}`);
      
    } else {
      dispatch(revokeAcess())
      console.log(`Is not subscribed`);
    }
  };

      // This use effect runs everytime a state is changed
      useEffect(() => {
        const accountChanged = (accounts) => {
          console.log("changed to ", accounts[0]);
          // If no account is connected access is revoked, and connect wallet function 
          // is called to connect the user again
          if (accounts[0] === undefined || accounts[0] === "") {
            dispatch(revokeAcess())
            dispatch(addAccount(""));;
            connectWallet();
          } else {
            dispatch(addAccount(accounts[0]));
            checkFlow(HandleAccount)
          }
        };
        // Whenever the account gets disconnected the access is revoked
        const accountDisconnected = () => {
          console.log("Account Disconnected");
          dispatch(revokeAcess())
          setIsConnected(false);
    
          console.log(`is Subscribed: ${HandleSubscribtion.isSubscribed}`);
        };
    
        // These events listen for accountsChanged and disconnect
        // Events
        window.ethereum.on("accountsChanged", accountChanged);
        window.ethereum.on("disconnect", accountDisconnected);
      });

      useEffect(() => {
        connectWallet();
        console.log(`Account is: ${HandleAccount}`);
      }, [])

      return (
        <div className="App bg-[#03001C] min-h-screen">
          <Navbar />
          <Profile />
          <Routes>
            <Route
              path="/"
              element={
                <PrivateContent>
                  <Content />
                </PrivateContent>
              }
            />
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </div>
      );
    }
    
    export default App;