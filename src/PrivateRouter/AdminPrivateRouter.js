import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminPrivateRouter = ({ children, ...rest }) => {
    const { user, admin } = useAuth();
    console.log(admin);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (!user?.email && !admin) {
            navigate("/login", {
                state: { from: location.pathname }
            })
        }
        else if (user?.email && admin === false) {
            navigate("/", {
                state: { from: location.pathname }
            })
        }
    }, [])

    if (user?.email && admin) {
        return children;
    }
}

export default AdminPrivateRouter