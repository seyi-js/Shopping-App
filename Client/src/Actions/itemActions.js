import Axios from 'axios'
import {
    GET_ITEMS,
    DELETE_ITEMS,
    ADD_ITEM,
    
    ITEMS_LOADING
} from './Types';
  import { returnErrors } from './errorActions';

  
export const getItems = () => dispatch => {
   dispatch(setItemsLoading());
   Axios
   .get('api/items')
   .then(res => dispatch({
       type: GET_ITEMS,
       payload: res.data
   } ) )
       .catch( err => 
        dispatch( returnErrors( err.response.data, err.response.status ) ))
}

export const deleteItem = (id) => dispatch => {
    Axios
    .delete(`api/items/${id}`)
    .then(res => dispatch({
        type: DELETE_ITEMS,
        payload: res.data
    } ) )
    .catch( err => 
        dispatch( returnErrors( err.response.data, err.response.status ) ))
 }

export const addItem = item => dispatch => {
    Axios
    .post('api/items', item)
    .then(res => dispatch({
        type: ADD_ITEM,
        payload: res.data
    } ) )
    .catch( err => 
        dispatch( returnErrors( err.response.data, err.response.status ) ))
}



export const setItemsLoading = () =>{
    return {
        type: ITEMS_LOADING,
        
    }
}