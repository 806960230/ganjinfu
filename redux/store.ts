import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { assetsListSlice } from "./assetsList/slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['assetsList']

}

const rootReducer = combineReducers({
    assetsList: assetsListSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:
        {
            ignoredActionPaths: ['register', 'rehydrate'],
        },
    }),
    devTools: true
})

const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default { store, persistor };