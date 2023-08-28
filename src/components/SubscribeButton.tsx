//SubscribeButton.tsx
// Importing Widget Details
import widgetProps from "./widgetProps.json";
import {useSelector, useDispatch} from 'react-redux'
// *** IMPORTING WEB3 LIBRARIES ***

// ** SUPERFLUID LIBRARIES **
// 1. Import SuperFluid Tokens
import superTokenList from "@superfluid-finance/tokenlist";

// 2. Import SuperFluid Widget
import SuperfluidWidget, {
  EventListeners,
  supportedNetworks,
} from "@superfluid-finance/widget";

// 3. Import Web3Modal Library
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { useWeb3Modal, Web3Modal } from "@web3modal/react";

// 4. Import useMemo hook from react
import { useMemo } from "react";
import { render } from "react-dom";

// 5. Import Wagmi hooks
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { provideAccess } from "../features/HandleSubscription";

// Paste Your ProjectId here
const projectId = "8e61cfe7f2793cbbdd696064d0e029b0";

// Web3Modal stuff
const { publicClient } = configureChains(supportedNetworks, [
  w3mProvider({ projectId }),
]);

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({
    projectId,
    chains: supportedNetworks,
  }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, supportedNetworks);

export const SubscribeButton = () => {
    // Checks if the user is isSubscribed
    const HandleSubscribtion = useSelector((state) => state.subscribe.value)
    const dispatch = useDispatch();


  const { open, isOpen } = useWeb3Modal();
  const walletManager = useMemo(
    () => ({
      open,
      isOpen,
    }),
    [open, isOpen]
  );

  const eventListeners: EventListeners = useMemo(
    () => ({
      onSuccess: () => {
        console.log(`Success`);
        // Once the subscribes successfully provide him with the address
        dispatch(provideAccess(true))
      },
    onSuccessButtonClick: () => {
        // window.location.reload();
        console.log("onSuccessButtonClick")
      },
    }),
    []
  );

  return (
    <div className="subscribe-button">
      <WagmiConfig config={wagmiConfig}>
        <SuperfluidWidget
          className=""
          productDetails={widgetProps.productDetails}
          paymentDetails={widgetProps.paymentDetails}
          tokenList={superTokenList}
          type="dialog"
          theme={widgetProps.theme}
          walletManager={walletManager}
          eventListeners={eventListeners}
        >
          {({ openModal }) => (
            <button
              className="bg-[#331D2C] text-[#F4EEE0] hover:bg-[#F4EEE0] hover:text-[#331D2C] border-2 border-[#331D2C] py-2 px-4 rounded-xl  text-xl"
              onClick={() => openModal()}
            >
              Subscribe
            </button>
          )}
        </SuperfluidWidget>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
};