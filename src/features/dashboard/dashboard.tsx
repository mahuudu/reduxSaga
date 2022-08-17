import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { dashboardActions, selectDashboardLoading, selectDashboardStatictics, selecthighestStudentList, selectRankingByCityList } from './dashboardSlice';
import { Box, Grid, LinearProgress, makeStyles, Typography, Container } from '@mui/material';
import { ChatBubble, ChatRounded, LinearScaleSharp, PeopleAlt } from '@mui/icons-material';
import Widget from './components/Widget';
import StatisticItem from './components/StatisticItem';
import { StudentRankingList } from './components/StudentRankingList';

export interface DoashBoardsProps {
}

export function DoashBoards(props: DoashBoardsProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatictics);
  const highgestStusdentList = useAppSelector(selecthighestStudentList);
  const lowestStudentList = useAppSelector(selecthighestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);


  useEffect(() => {
    dispatch(dashboardActions.fectData());
  }, [dispatch]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatBubble fontSize="large" color="primary" />}
            label="mark >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<LinearScaleSharp fontSize="large" color="primary" />}
            label="mark <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Typography variant="h5">Sort by Mark</Typography>
        <Grid container  spacing={2} sx={{ mt: 1 }} >
          <Grid item xs={12} md={6} lg={3}>
            <Widget title="top hight mark student">
              <StudentRankingList studentList={highgestStusdentList}></StudentRankingList>
            </Widget>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Widget title="top low mark student">
              <StudentRankingList studentList={lowestStudentList}></StudentRankingList>
            </Widget>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3}>
        <Typography variant="h5">Sort by City</Typography>
        <Grid container spacing={2} sx={{ mt: 1}} >
          {rankingByCityList.map((ranking) => (
            <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
              <Widget title={ranking.cityId}>
                <StudentRankingList studentList={ranking.rankingList}></StudentRankingList>
              </Widget>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
