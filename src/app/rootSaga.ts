import authSaga from 'features/auth/authSaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import StudentSaga from 'features/student/studentSaga';
import {all} from 'redux-saga/effects';

function* initAuth(){
    const user = localStorage.getItem('access_token');
}

export default function* rootSaga(){
    yield all([authSaga(), dashboardSaga(), StudentSaga(),]);
}