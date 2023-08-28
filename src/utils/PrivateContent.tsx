import React from 'react'
import {useSelector} from 'react-redux'

export const PrivateContent = ({children}) => {
    const HanldeSubscribtion = useSelector((state) => state.subscribe.value)
    console.log(`Subscribtion at Private: ${HanldeSubscribtion.isSubscribed}`);
    // Checks if the account is subscribed or not
    if (HanldeSubscribtion.isSubscribed === true) {
        console.log(`Subscubribtion at Private: ${HanldeSubscribtion.isSubscribed}`);
        return (
            <div className="content-container">
                {children}
            </div>
        )
    } 
}