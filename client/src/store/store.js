import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import navbarSlice from "./navbarSlice";
import cryptoSlice from "./cryptoSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  navbar: navbarSlice.reducer,
  crypto: cryptoSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

let persistor = persistStore(store);

export { store, persistor };
