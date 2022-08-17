import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectStudentList, selectStudentPagination, studentAction, selectCityList, selectIsCommitForm } from '../studentSlice';
import StudentTable from './../components/StudentTable';
import { Button, Grid, Typography, Box, Pagination, LinearProgress } from '@mui/material';
import { selectStudentFilter, selectStudentLoading } from './../studentSlice';
import { StudentSearch } from '../components/StudentSearch';
import { ListParams } from 'models';
import { Student } from './../../../models/student';
import StudentApi from 'api/studentApi';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { AddStudentPage } from './AddStudentPage';
import IconButton from '@mui/material/IconButton';
import { useSnackbar } from 'notistack';


export interface ListStudentPageProps {
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}



const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export function ListStudentPage(props: ListStudentPageProps) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const studentListData = useAppSelector(selectStudentList);
  const loading = useAppSelector(selectStudentLoading);
  const paginationData = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const cityList = useAppSelector(selectCityList);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setisEdit] = React.useState(false);
  const [student, setStudent] = React.useState<Student>();

  const isSubmitted = useAppSelector(selectIsCommitForm);

  useEffect(() => {
    dispatch(studentAction.fetchStudentList(
      filter
    ));

    const isSb = isSubmitted;
    if (isSb === true) {
      setOpen(false);
    }

  }, [dispatch, filter,isSubmitted]);


  const handlePageChange = (e: any, page: number) => {
    dispatch(studentAction.setFilter({
      ...filter,
      page: page,
    }))
  }

  const hangleSearchChange = (data: ListParams) => {
    dispatch(studentAction.setFilter(data));
    dispatch(studentAction.fetchSearch(data));
  }

  const handleFilterChange = (data: ListParams) => {
    dispatch(studentAction.setFilter(data));
  }

  const handleRemove = async (student: Student) => {
    try {
      const result = await StudentApi.remove(student._id);
      const newFilter = { ...filter }
      dispatch(studentAction.setFilter(newFilter));
      enqueueSnackbar('Success', {
        variant: 'success', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        }
      })
    } catch (error) {
      console.log('err', error);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditAdd = (student: Student) => {
    setOpen(true);
    if (Object.keys(student).length !== 0) {
      setisEdit(true);
      setStudent(student);
    } else {
      setisEdit(false);
      setStudent({} as Student);
    }
  }


  return (
    <div>
      {loading && <LinearProgress  sx={{ mb: 3 }} />}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Typography variant="h5" >
            List Student
          </Typography>

          <Box sx={{ mt: 2 }}>
            <StudentSearch filter={filter} onSearchChange={hangleSearchChange} onChangeFilter={handleFilterChange} cityList={cityList} ></StudentSearch>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" size="large" onClick={() => handleEditAdd({} as Student)}>
              Add new student
            </Button>
          </Box>
        </Grid>
      </Grid>
      <StudentTable studentList={studentListData} onRemoveStudent={handleRemove} onEditStudent={handleEditAdd} ></StudentTable>
      <Box sx={{ mt: 3 }}>
        <Pagination
          count={Math.ceil(paginationData.total / paginationData.limit)}
          color="primary"
          page={paginationData.page}
          onChange={handlePageChange}
        />
      </Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {isEdit ? 'Update student' : 'Add new student'}
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ minWidth: 600 }}>
          <AddStudentPage studentData={student as Student} isEdit={isEdit} ></AddStudentPage>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
