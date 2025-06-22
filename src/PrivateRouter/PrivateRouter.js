import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRouter = ({ children, ...rest }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (!user?.email) {
            navigate("/login", {
                state: { from: location.pathname }
            })
        }
    }, [])

    if (user?.email) {
        return children;
    }
}

export default PrivateRouter