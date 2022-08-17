import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Student } from './../../../models/student';
import { Button, Box, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface StudentProp {
  studentList: Student[];
  onRemoveStudent: (Student: Student) => void;
  onEditStudent: (Student: Student) => void;
}

export default function StudentTable({ studentList, onRemoveStudent, onEditStudent }: StudentProp) {

  const [open, setOpen] = React.useState(false);
  const [studentSelected, setstudentSelected] = React.useState<Student>()

  const handleClickOpen = (student: Student) => {
    setOpen(true);
    setstudentSelected(student);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = (student: Student) => {
    if (!onRemoveStudent) return;
    onRemoveStudent(student);
    setOpen(false);
  }

  const handleClickEdit = (student: Student) => {
    if (!onEditStudent) return;
    onEditStudent(student);
  }



  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">age</TableCell>
              <TableCell align="left">gender</TableCell>
              <TableCell align="left">mark</TableCell>
              <TableCell align="left">city</TableCell>
              <TableCell align="center">delete</TableCell>
              <TableCell align="center">edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((row, idx) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{idx + 1}</TableCell>
                <TableCell align="left" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.age}</TableCell>
                <TableCell align="left">{row.gender}</TableCell>
                <TableCell align="left">{row.mark}</TableCell>
                <TableCell align="left">{row.city}</TableCell>
                <TableCell align="center" size="small">
                  <Button variant="contained" color="error" onClick={() => handleClickOpen(row)} >delete</Button>
                </TableCell>
                <TableCell align="center" size="small">
                  <Button variant="contained" onClick={() => handleClickEdit(row)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove this student ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student : {studentSelected?.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container mb={2}>
            <Grid item xs={6}>
              <Button onClick={handleClose} variant="outlined" color="primary">Cancel</Button>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end"   direction="row"   alignItems="flex-end">
              <Button onClick={() => handleRemove(studentSelected as Student)} variant="outlined" color="error" autoFocus>
                Agree
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}