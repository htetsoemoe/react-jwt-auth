import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contacts: [],
    searchText: ""
}

export const contactSlice = createSlice({
    name: 'createSlice',
    initialState,
    reducers: {
        addContacts: (state, { payload }) => {
            state.contacts = payload
        },
    setSearchText: (state, { payload }) => {
            state.searchText = payload
        }
    }
})

export const { addContacts,setSearchText } = contactSlice.actions
export default contactSlice.reducer