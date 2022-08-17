
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Student } from './../../models/student';

export interface DashboardStactictics {
    maleCount : number;
    femaleCount : number;
    highMarkCount : number;
    lowMarkCount : number;
}
export interface RankingByCity{
    cityId : string;
    rankingList : Student[],
}
export interface DashboardState {
    loading : boolean;
    statictics : DashboardStactictics,
    lowgestStudentList : Student[],
    highestStudentList : Student[],
    rankingByCityList: RankingByCity[],
}

const initialState: DashboardState = {
    loading: false,
    statictics : {
        maleCount : 0,
        femaleCount : 0,
        highMarkCount: 0,
        lowMarkCount : 0,
    },
    highestStudentList : [],
    lowgestStudentList : [],
    rankingByCityList : [],
}


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers : {
        fectData(state){
            state.loading = true;
        },
        fectDataSusscess(state){
            state.loading = false;
        },
        fectDataFailed(state){
            state.loading = false;
        },
        setStatictics(state, action : PayloadAction<DashboardStactictics>){
            state.statictics = action.payload;
        },
        setlowgestStudentList(state, action: PayloadAction<Student[]>){
            state.lowgestStudentList = action.payload;
        },
        sethighestStudentList(state, action: PayloadAction<Student[]>){
            state.highestStudentList = action.payload;
        },
        setrankingByCityList(state, action: PayloadAction<RankingByCity[]>){
            state.rankingByCityList = action.payload;
        },
    },
});

//Action
export const dashboardActions = dashboardSlice.actions;

//selector
export const selectDashboardStatictics = (state: RootState) => state.dashboard.statictics;
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectlowgestStudentList = (state: RootState) => state.dashboard.lowgestStudentList;
export const selecthighestStudentList = (state: RootState) => state.dashboard.highestStudentList;
export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByCityList;

//reducer
const dashBoardReducer = dashboardSlice.reducer;

export default dashBoardReducer;