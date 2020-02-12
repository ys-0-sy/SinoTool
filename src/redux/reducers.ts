import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";
import { configReducer } from "./config/reducers";
import { eventsReducer } from "./events/reducers";
import { IInitialState } from "./states";

// store.js
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["events"]
};

const eventsPersistConfig = {
  key: "events",
  storage: AsyncStorage,
  blacklist: ["eventsAll"]
};

export const combinedReducers = combineReducers<IInitialState>({
  events: persistReducer(eventsPersistConfig, eventsReducer),
  config: configReducer
});

export const persistedReducer = persistReducer(persistConfig, combinedReducers);
