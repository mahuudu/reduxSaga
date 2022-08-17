import { createSlice, PayloadAction , createSelector} from '@reduxjs/toolkit';
import { ListParams, PaginationParams, Student } from 'models';
import { ListResponse } from 'models';
import { RootState } from 'app/store';
import { City } from './../../models/city';


export interface StudentListState {
    loading : boolean;
    studentList : Student[];
    filter: ListParams;
    pagination : PaginationParams;
    cityList : City[];
    isCommitForm : boolean;
    msg : unknown;
}

const initialState :StudentListState ={
    loading : false,
    studentList : [],
    filter : {
        page : 1,
        limit : 10,
        sort : 'mark',
        order : 'desc',
        city : '',
    },
    pagination : {
        page : 1,
        limit : 10,
        total : 10
    },
    cityList : [],
    isCommitForm: false,
    msg : '',
}



const studentSlice = createSlice({
    name: 'student',
    initialState: initialState,
    reducers : {
        fetchStudentList(state,action: PayloadAction<ListParams>){
            state.loading = true;
        },
        fetchStudentListSuccess(state,action: PayloadAction<ListResponse<Student>>){
            state.loading = false;
            state.studentList = action.payload.data;
            state.pagination = action.payload.pagination;
        },
        fetchStudentFailed(state,action){
            state.loading = false;
            state.msg = action.payload;
        },
        setFilter(state,action: PayloadAction<ListParams>){
            state.filter = action.payload;
        },
        fetchSearch(state, action : PayloadAction<ListParams>){
            state.loading = false;
        },
        fetchSearchSuccess(state, action: PayloadAction<ListResponse<Student>>){
            state.loading = false;
            state.studentList = action.payload.data;
            state.pagination = action.payload.pagination;
        },
        fetchListCity(state,action: PayloadAction<ListResponse<City>>){
            state.cityList = action.payload.data;
        },
        onCommitForm(state,action){
            state.isCommitForm = false;
        },
        setisCommitForm(state,action){
            state.isCommitForm = action.payload;
        }
    },
})

export const studentAction = studentSlice.actions;

export const selectStudentLoading = (state:RootState) => state.student.loading;
export const selectStudentList = (state:RootState) => state.student.studentList;
export const selectStudentFilter = (state:RootState) => state.student.filter;
export const selectStudentPagination = (state:RootState) => state.student.pagination;
export const selectCityList = (state:RootState) => state.student.cityList;
export const selectIsCommitForm = (state: RootState) => state.student.isCommitForm;

export const selectCityOptions = createSelector(selectCityList, (cityList) =>
  cityList.map((city) => ({
    label: city.name,
    value: city.code,
  }))
);

const studentReducer = studentSlice.reducer;


export default studentReducer;