import React from 'react'
import {useSelector} from 'react-redux'

// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from "@apollo/client";

// Importing components 
import { SubscribeButton } from './SubscribeButton';
import {UnsubscribeButton} from './UnsubscribeButton';

const GET_ACCOUNT_DATA = gql`
query MyQuery {
  artist(where: {id: "clltir9pr2mwy0bo6zpk2duxk"}) {
    artistName
    description {
      text
    }
    about
    profilePicture {
      url
    }
    banner {
      url
    }
  }
}
`;

export const Profile = () => {
    const HanldeSubscribtion = useSelector((state) => state.subscribe.value)
    console.log(`Subscribtion Status in Profile Page: ${HanldeSubscribtion.isSubscribed}`);
  
  
    const { loading, error, data } = useQuery(GET_ACCOUNT_DATA);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    
  
    return (
      <div className="profile-container">
        <div className="banner h-[70vh]">
          <img
            className="h-[10vh] object-fill md:h-[100%] md:w-[100%]"
            src={data.artist.banner.url}
            alt=""
          />
        </div>
        <div className="relative bottom-10 md:relative md:bottom-20">
          <div className="profile-picture">
            <img
              className="w-[30%] md:w-[10%] mx-auto"
              src={data.artist.profilePicture.url}
              alt=""
            />
          </div>
          <div className="information flex justify-center">
            <h1 className="text-3xl font-bold ">{data.artist.artistName}</h1>
          </div>
          <div className="small-introduction  flex justify-center mt-2">
            <p className="text-center ">{data.artist.about}</p>
          </div>
          <div className="subscribe-button flex justify-center mt-4">
            {
              HanldeSubscribtion.isSubscribed ? 
              <UnsubscribeButton />
              :
              <SubscribeButton />
            }
          </div>
          <div className="description w-[75%] text-sm md:text-lg md:w-1/2 mx-auto mt-5">
            <p>{data.artist.description.text}</p>
          </div>
        </div>
      </div>
    )
  }