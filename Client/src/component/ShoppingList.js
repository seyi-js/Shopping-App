
import React, {Component, useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {connect } from 'react-redux';
import {getItems, deleteItem} from '../Actions/itemActions';
import propTypes from 'prop-types';
export class ShoppingList extends Component {
    static propTypes = {
    getItems : propTypes.func.isRequired,
    item: propTypes.object.isRequired,
    isAuthenticated: propTypes.bool
}
    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id)
    }

    render() {
        const { items} = this.props.item;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({_id, item})=>(
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    { this.props.isAuthenticated ?
                                        <Button className="btn btn-danger remove-btn" size="sm" onClick={ this.onDeleteClick.bind( this, _id ) }>&times;</Button>
                                : null }
                                
                                {item}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                       
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}


const mapStateToProps = (state) =>({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList);
