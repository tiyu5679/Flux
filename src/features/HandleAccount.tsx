// HandleAccount.tsx
import {createSlice} from '@reduxjs/toolkit'
const initialStateValue =  {
    value: ""
}

export const HandleAccount = createSlice({
    name: "account", 
    initialState: initialStateValue, 
    reducers: {
        addAccount: (state, action) => {
            state.value = action.payload
        },
        removeAccount: (state) => {
            state = initialStateValue
        }
    }
});
export const {addAccount, removeAccount} = HandleAccount.actions;
export default HandleAccount.reducer;