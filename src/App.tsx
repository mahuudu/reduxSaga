import cityApi from 'api/cityApi';
import { NotFound, PrivateRoute } from 'components/common';
import { AdminLayout } from 'components/layout';
import { LoginPage } from 'features/auth/pages/LoginPage';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './features/auth/pages/SignUpPage';

function App() {
  return (
    <div>
        <Routes>
          <Route path="/login" element={<LoginPage />}>
          </Route>
          <Route path="/signup" element={<SignUp />}>
          </Route>
          <Route path="/admin/*" 
          element={
          <PrivateRoute>
              <AdminLayout></AdminLayout>
          </PrivateRoute>
          }
          >
          </Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
