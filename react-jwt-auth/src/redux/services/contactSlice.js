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
        }
    }
})

export const { addContacts } = contactSlice.actions
export default contactSlice.reducer