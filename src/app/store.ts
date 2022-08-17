import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import  createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import authReducer from './../features/auth/authSlice';
import { createReduxHistoryContext, reachify } from "redux-first-history";
import { createBrowserHistory } from 'history';
import { logActions } from 'features/auth/authSaga';
import dashBoardReducer from './../features/dashboard/dashboardSlice';
import studentReducer from 'features/student/studentSlice';


const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });

const rootReducer = combineReducers({
  router: routerReducer,
  counter: counterReducer,
  auth : authReducer,
  dashboard : dashBoardReducer,
  student : studentReducer,
});
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware),
});

export const history = createReduxHistory(store);


sagaMiddleware.run(rootSaga);
sagaMiddleware.run(logActions);


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
