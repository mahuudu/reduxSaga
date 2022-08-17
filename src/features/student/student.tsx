import * as React from 'react';
import { AddStudentPage } from './page/AddStudentPage';
import { ListStudentPage } from './page/ListStudentPage';
import {Routes, Route} from 'react-router-dom';


export interface StudentProps {
}

export function Student (props: StudentProps) {

  return (
    <Routes>
       <Route path="" element={<ListStudentPage/>}>
       </Route>
    </Routes>
  );
}
