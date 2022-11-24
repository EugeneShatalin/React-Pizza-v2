import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async ({order, sortBy, category,search, currentPage}) => {
        const {data} = await axios.get(`https://63567f4da2d1844a97763927.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)



const initialState = {
    items: []
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: {
        [fetchPizzas.fulfilled]: (state, action) => {
            console.log(action)
            state.items = action.payload
        }
    }
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer