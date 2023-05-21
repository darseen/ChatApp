import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PERSIST,
  REHYDRATE,
  PURGE,
  REGISTER,
  PAUSE,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);

export default () => {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: [FLUSH, PERSIST, REHYDRATE, PURGE, REGISTER, PAUSE],
        },
      }),
  });
  let persistor = persistStore(store);
  return { store, persistor };
};
