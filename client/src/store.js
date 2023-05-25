import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import messageReducer from "./features/messageSlice";
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
    reducer: combineReducers({
      user: persistedReducer,
      message: messageReducer,
    }),
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
