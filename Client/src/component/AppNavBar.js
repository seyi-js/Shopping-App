import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
    Container
} from 'reactstrap';
  import RegisterModal from './auth/registerModal'
  import LoginModal from './auth/LoginModal'
import Logout from './auth/logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

export class AppNavBar extends Component {
    static propTypes = {
    auth: PropTypes.object.isRequired
  };

    state = {
        isOpen: false
    }

    toggle = () =>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
      const { isAuthenticated, user } = this.props.auth;
      
      const authLinks = (
        <React.Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>
            {user ? `Welcome ${user.name}` : ''}
          </strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </React.Fragment>
  );
      const guestLinks = (
    <React.Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </React.Fragment>
  );
        return (
            
            <React.Fragment>
            <Navbar color="dark" dark expand="sm" className="mb-5">
              <Container>
                <NavbarBrand href="/">ShoppingList</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    {isAuthenticated ? authLinks : guestLinks}
                    <NavItem>
                      <NavLink href="https://github.com/seyi-js" target="_blank">Github</NavLink>
                    </NavItem>
                    
                  </Nav>
                </Collapse>
              </Container>
            </Navbar>
          </React.Fragment>
        
        )
    }
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavBar)
