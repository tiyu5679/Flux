// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";

// Importing React Router 
import { BrowserRouter } from "react-router-dom";

// Importing Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from "react-redux";

// Importing Reducers used to update states 
import SubscrbtionReducer from './features/HandleSubscription'
import AccountReducer from './features/HandleAccount'

// Creating a store 
const store = configureStore({
  reducer: {
    subscribe: SubscrbtionReducer, 
    account: AccountReducer
  }
})

// Importing Apollo Client Dependenceies
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

// Creating an instance of the CMS to interact with. 
const client = new ApolloClient({
  // Enter your Hygraph API below
  uri: "https://api-ap-south-1.hygraph.com/v2/clltabnnq39cd01un2ql4dcg6/master",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);