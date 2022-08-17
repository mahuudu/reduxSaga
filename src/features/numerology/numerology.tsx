import * as React from 'react';
import { NumerlogyPage } from './page/numerologyPage';
import {Routes, Route} from 'react-router-dom';


export interface Numerology {
}

export function Numerology (props: Numerology) {

  return (
    <Routes>
       <Route path="" element={<NumerlogyPage/>}>
       </Route>
    </Routes>
  );
}
