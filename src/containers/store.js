// redux.js
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducers } from "./reducers";
import { createLogger } from "redux-logger";
import mySaga from "./sagas";
// store.js
const logger = createLogger({
  diff: true,
  collapsed: true
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(mySaga);
