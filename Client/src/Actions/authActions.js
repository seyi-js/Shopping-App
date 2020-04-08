import Axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './Types';

//Check for userId 

export const loadUser = () => ( dispatch, getState ) => {
    //User loading
    dispatch( {
        type: USER_LOADING
    } );
   
    const token = getState().auth.token;
    console.log(token)
    Axios
        .get( 'api/user/user')
        .then( res => dispatch( {
            type: USER_LOADED,
            payload: res.data
        } ) )
        .catch( err => {
            dispatch( returnErrors( err.response.data, err.response.status ) );
            dispatch( {
                type: AUTH_ERROR
            })
           console.log(err)
        }
            );
}


//Register User

export const register = ( { name, email, password } ) => dispatch => {
    const config = {
        headers: {
            "content-type": "application/json"
        }

    }
    const body = JSON.stringify( { name, email, password } );

    Axios
        .post( 'api/user/register', body, config )
        .then( res => dispatch( {
            type: REGISTER_SUCCESS,
            payload: res.data
        } ) )
        .catch( err => {
            dispatch( returnErrors( err.response.data, err.response.status, 'REGISTER_FAIL' ) );
            dispatch( {
            type: REGISTER_FAIL
        })
    })
}

//Login User

export const login = ( { email, password } ) => dispatch => {
    const config = {
        headers: {
            "content-type": "application/json"
        }

    }
    const body = JSON.stringify( {email, password } );

    Axios
        .post( 'api/user/login', body, config )
        .then( res => dispatch( {
            type: LOGIN_SUCCESS,
            payload: res.data
        } ) )
        .catch( err => {
            dispatch( returnErrors( err.response.data, err.response.status, 'LOGIN_FAIL' ) );
            dispatch( {
            type: LOGIN_FAIL
        })
    })
}
//Logout User

export const logout = () => dispatch => {
    Axios
        .get( 'api/user/logout' )
        .then( res => dispatch( {
        type: LOGOUT_SUCCESS
    }))
};
//setup Config

export const tokenConfig = getState => {
 const token = getState().auth.token;

    const config = {
        headers: {
            "content-type": "application/json"
        }

    }
    if ( token ) {
        console.log( token )
    }
    return config;
}