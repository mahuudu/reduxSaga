import { take, fork, call, put, cancel } from 'redux-saga/effects';
import { LoginPayLoad, authAction } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import AuthApi from './../../api/authApi';
import { push } from "redux-first-history";


function* handleLogin(payload: LoginPayLoad) {
    console.log('handlelogin',payload)
    try {
        const response = yield call(AuthApi.login, payload);

        const token = response.accessToken;
        const user = {
            username: response.user.username,
            id: response.user._id,
        }

        localStorage.setItem('access_token', token);
        localStorage.setItem('user', JSON.stringify(user));

        yield put(authAction.loginSuccess({
            username: user.username,
            id: user.id,
        }))

        yield put(push('/admin/dashboard'));

    } catch (error) {
        // console.log('err',error);
        yield put(authAction.loginFailed(error.response.data))
    }
}

function* handleLogOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    yield put(push('/login'));
}


function* watchLoginFlow() {
    console.log('watch watchLoginFlow')
    while (true) {
        const data: PayloadAction<LoginPayLoad> = yield take(authAction.login.type);
        const task = yield fork(handleLogin, data.payload);
        const action = yield take([authAction.logout.type, authAction.loginFailed.type]);
        if(action.type === authAction.logout.type){
            yield cancel(task);
            yield call(handleLogOut);
        }
        
    }
}

export default function* authSaga() {
    yield fork(watchLoginFlow);
}

export function* logActions() {
    while (true) {
      const action = yield take('*')
      console.log(action.type);
      if(action.type === 'auth/logout'){
        yield call(handleLogOut);
      }
    }
}