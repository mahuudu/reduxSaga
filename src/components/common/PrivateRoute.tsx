
import { useLocation,  Navigate  } from 'react-router-dom';
import { AdminLayout } from 'components/layout';

export interface PrivateRouteProps {
}

export function PrivateRoute(props: PrivateRouteProps) {
    const isLoggedin = Boolean(localStorage.getItem('access_token'));
    let location = useLocation();


    return isLoggedin ? (
        <AdminLayout />
    ) : (<Navigate
        to="/login"
        replace
        state={{ location }}
    />)
}
