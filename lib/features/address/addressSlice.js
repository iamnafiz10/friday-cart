import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// 🟦 Fetch all addresses
export const fetchAddress = createAsyncThunk(
    "address/fetchAddress",
    async ({getToken}, thunkAPI) => {
        try {
            const token = await getToken();
            const {data} = await axios.get("/api/address", {
                headers: {Authorization: `Bearer ${token}`},
            });
            return data ? data.addresses : [];
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// 🟥 Delete an address
export const deleteAddress = createAsyncThunk(
    "address/deleteAddress",
    async ({id, getToken}, thunkAPI) => {
        try {
            const token = await getToken();
            const {data} = await axios.delete(`/api/address?id=${id}`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            return id; // Return deleted ID for Redux to remove
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

const addressSlice = createSlice({
    name: "address",
    initialState: {
        list: [],
    },
    reducers: {
        addAddress: (state, action) => {
            state.list.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            // ✅ Remove address from state after deletion
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.list = state.list.filter((addr) => addr.id !== action.payload);
            });
    },
});

export const {addAddress} = addressSlice.actions;
export default addressSlice.reducer;