import { ListResponse2, ListResponse } from "models";
import { put,all,call, takeLatest } from "redux-saga/effects"
import { dashboardActions, RankingByCity } from "./dashboardSlice";
import { Student } from './../../models/student';
import StudentApi from './../../api/studentApi';
import { City } from './../../models/city';
import cityApi from './../../api/cityApi';

function* fetchStactictics(){
    const reponseList : Array<ListResponse<Student>> = yield all([
        call(StudentApi.getAll, {page:1,limit:1,gender:'male'}),
        call(StudentApi.getAll, {page:1,limit:1,gender:'female'}),
        call(StudentApi.getAll, {page:1,limit:1,mark_gte:8}),
        call(StudentApi.getAll, {page:1,limit:1,mark_gte:5}),
    ]);

    const statictics = reponseList.map((x) => x.pagination.total);
    const [maleCount,femaleCount,highMarkCount,lowMarkCount] = statictics;

    yield put(dashboardActions.setStatictics({maleCount,femaleCount,highMarkCount,lowMarkCount}));
}

function* fetchHighestStudentList(){
    const { data } : ListResponse<Student> = yield call(StudentApi.getAll,{
        page : 1,
        limit : 5,
        sort : 'mark',
        order : 'desc',
    });

    yield put(dashboardActions.sethighestStudentList(data));
}
function* fetchlowgestStudentList(){
    const { data } :ListResponse<Student> = yield call(StudentApi.getAll,{
        page : 1,
        limit : 5,
        sort : 'mark',
        order : 'asc',
    });

    yield put(dashboardActions.setlowgestStudentList(data));
}
function* fetchrankingByCityList(){
    const { data : ListCity } : ListResponse<City> = yield call(cityApi.getAll);

    const callList = ListCity.map((x) => call(StudentApi.getAll,{
        page : 1,
        limit : 5,
        sort : 'mark',
        order : 'asc',
        city : x.code,
    }));

   const reponseList: Array<ListResponse<Student>> =  yield all(callList);

   const rankingByCityList : Array<RankingByCity> = reponseList.map((x, idx) => ({
       cityId : ListCity[idx].code,
       rankingList : x.data,
   }));

    yield put(dashboardActions.setrankingByCityList(rankingByCityList));

}


function* fetchDashboardData(){
    try {
       yield all([
        call(fetchStactictics),
        call(fetchHighestStudentList),
        call(fetchlowgestStudentList),
        call(fetchrankingByCityList),
       ]);

       yield put(dashboardActions.fectDataSusscess);
    } catch (error) {
        console.log('fechtDashboard',error)   
    }
};


export default function* dashboardSaga(){
    yield takeLatest(dashboardActions.fectData.type, fetchDashboardData);
}