import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import myFirstReducer from "./reducers/reducer.js";
import App from "./App.jsx";
import mySaga from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ myFirstReducer });
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
