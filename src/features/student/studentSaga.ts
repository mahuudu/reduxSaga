import { put,all,call, takeLatest, debounce, takeEvery } from "redux-saga/effects"
import { studentAction } from "./studentSlice";
import StudentApi from './../../api/studentApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams, Student } from 'models';
import { ListResponse } from 'models';
import { City } from './../../models/city';
import cityApi from './../../api/cityApi';


function* fetchStudentData(action : PayloadAction<ListParams>){
    try {
        const data : ListResponse<Student> = yield call(StudentApi.getAll, action.payload);
        const cityList : ListResponse<City> = yield call(cityApi.getAll);

        yield put(studentAction.fetchStudentListSuccess(data));
        yield put(studentAction.fetchListCity(cityList));
    } catch (error) {
        console.log(typeof error);
        yield put(studentAction.fetchStudentFailed(JSON.stringify(error)));
    }
}

function* fetchStudentDataByName(action : PayloadAction<ListParams>){
    try {
        const data : ListResponse<Student> = yield call(StudentApi.getAll, action.payload);

        console.log('data ne ',data)
        yield put(studentAction.fetchSearchSuccess(data));
    } catch (error) {
        console.log('failed');
        yield put(studentAction.fetchStudentFailed(error));
    }
}

function* setStudentSubmit(action: any){
    try {
        console.log('action',action);
        yield put(studentAction.setisCommitForm(action.payload));
    } catch (error) {
        console.log('failed');
    }
}


export default function* StudentSaga(){
    yield takeLatest(studentAction.fetchStudentList, fetchStudentData);

    yield debounce(500, studentAction.fetchSearch, fetchStudentDataByName);

    yield takeEvery(studentAction.onCommitForm.type, setStudentSubmit);
}