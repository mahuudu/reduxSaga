import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeEvery } from "redux-saga/effects";
import { incrementSaga, incrementSagaSuccess } from './counterSlice';

function* handleIncrementSaga(action: PayloadAction<number>){
    console.log('handle increment saga')

    yield delay(2000);

    yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga(){
    console.log('counter saga');

    yield takeEvery(incrementSaga.toString(),handleIncrementSaga);

}

