import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    totalPizzas: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)

            state.totalPizzas = state.items.reduce((sum, obj) => {
                return obj.count + sum
            }, 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload)

            if (findItem) {
                findItem.count--
                state.totalPrice = state.items.reduce((sum, obj) => {
                    return obj.price * obj.count + sum
                }, 0)
                state.totalPizzas = state.items.reduce((sum, obj) => {
                    return obj.count + sum
                }, 0)
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
            state.totalPizzas = state.items.reduce((sum, obj) => {
                return obj.count + sum
            }, 0)
        },
        clearItem(state) {
            state.items = []
            state.totalPrice = 0
            state.totalPizzas = 0
        }
    }
})

export const {addItem, removeItem, clearItem, minusItem} = cartSlice.actions

export default cartSlice.reducer