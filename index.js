import { registerRootComponent } from "expo";

//Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

//Redux saga
import rootSaga from "./src/sagas/rootSaga";

import createSagaMiddleware from "redux-saga";
import allReducers from "./src/reducers";
import App from "./src/navigations/root";
const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));

const AppRoot = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
sagaMiddleware.run(rootSaga);
registerRootComponent(AppRoot);
