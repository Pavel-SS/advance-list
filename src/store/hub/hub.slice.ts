import {createSlice, PayloadAction} from '@reduxjs/toolkit'


const localStorageKey = 'ReactFavouriteKey'
interface HubState {
    favourites: string[]
}

const initialState: HubState = {
    favourites: JSON.parse(localStorage.getItem(localStorageKey) ?? '[]')
}

export const hubSlice = createSlice({
    name: 'hub',
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<string>){
            state.favourites.push(action.payload)
            //схораняем в LocalStorage
            localStorage.setItem(localStorageKey, JSON.stringify(state.favourites))
        },
        removeFavorite(state, action: PayloadAction<string>){
            state.favourites = state.favourites.filter(f => f !== action.payload)
            localStorage.setItem(localStorageKey, JSON.stringify(state.favourites))
        }
    }
})

export const  hubActions = hubSlice.actions
export const hubReducer = hubSlice.reducer