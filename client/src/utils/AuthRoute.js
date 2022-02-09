import React, {useContext} from 'react';
import { AuthContext } from '../context/auth';
import { Route, useNavigate } from 'react-router-dom';

function AuthRoute({ element: Component, ...rest }) {
    
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
        <Route {...rest} render={props => user? navigate('/'): <Component{...props}/>}></Route>
        </>
    )
}

export default AuthRoute;
