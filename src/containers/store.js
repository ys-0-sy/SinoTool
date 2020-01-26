// redux.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";
import createSagaMiddleware from "redux-saga";
import { events, config } from "./reducers";
import { createLogger } from "redux-logger";
import mySaga from "./sagas";
// store.js
const logger = createLogger({
  diff: true,
  collapsed: true
});

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

export const reducers = combineReducers({
  events: persistReducer(eventsPersistConfig, events),
  config: config
});

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);

export const persistor = persistStore(store);
persistor.purge();

sagaMiddleware.run(mySaga);
