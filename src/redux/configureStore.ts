import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { persistedReducer } from "./reducers";
import createSagaMiddleware from "redux-saga";
import mySaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);

export const persistor = persistStore(store);
persistor.purge();

sagaMiddleware.run(mySaga);
