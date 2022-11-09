import { configureStore } from "@reduxjs/toolkit";
import { hubApi } from "./hub/hub.api";
import { setupListeners} from "@reduxjs/toolkit/query"
import { hubReducer } from "./hub/hub.slice";

export const store = configureStore({
    reducer:{
        [hubApi.reducerPath]: hubApi.reducer,
        hub: hubReducer
    },
    middleware: (getDefalutMiddlewere) => {
        return getDefalutMiddlewere().concat(hubApi.middleware)
    }
})
// утилита для включения поведения refetchOnFocus
setupListeners(store.dispatch);

export type rootState = ReturnType<typeof store.getState>