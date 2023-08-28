import {createSlice} from '@reduxjs/toolkit'

const initialStateValue =  {
    isSubscribed: false
 }

export const subscribtionSlice = createSlice({
    name: "subscribtion", 
    initialState: {value: initialStateValue},
    reducers: {
        provideAccess: (state) => {
            console.log("State value: ", state.value);
            
            state.value = {
                isSubscribed: true
            }
        }, 
        revokeAcess: (state) => {
            state.value = initialStateValue
        }
    }
});

export const {provideAccess, revokeAcess} = subscribtionSlice.actions;

export default subscribtionSlice.reducer;