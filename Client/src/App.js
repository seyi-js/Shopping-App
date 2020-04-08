import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './component/AppNavBar';
import ShoppingList from './component/ShoppingList';
import ItemModal from './component/ItemModal';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { Container } from 'reactstrap';
import { loadUser} from './Actions/authActions';


const  App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  

    return (
      <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <Container>
        <ItemModal />
        <ShoppingList/>
        </Container>
        
      </div>
      </Provider>
      
    )
  
}

export default App
