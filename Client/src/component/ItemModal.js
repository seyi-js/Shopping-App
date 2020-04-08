import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
  import PropTypes from 'prop-types'
  import { connect } from 'react-redux';
  import { addItem } from '../Actions/itemActions';
export class ItemModal extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
    state = {
        modal: false,
      name: ''
    }

    toggle = ()=>{
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = e =>{
        this.setState({[e.target.name]: e.target.value});
    }
 
    onSubmit = e =>{
        e.preventDefault();

        const newItem = {
            item: this.state.name
        }
        //Add item via action
        this.props.addItem(newItem);

        //Close Modal
        this.toggle();
    }
    render() {
        return (
          <React.Fragment>
            { this.props.isAuthenticated ?
             <Button
              color="dark"
              style={{ marginBottom: "2rem" }}
              onClick={this.toggle}
            >
              Add Item
            </Button>
          : <h4 className="mb-3 ml-4">Please Login to Manage Items</h4> }
           
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>
                Add To Shopping List
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label for="item">Item</Label>
                    <Input 
                    type="text" name="name"
                    id="item"
                    placeholder="Add shopping item"
                    onChange={this.onChange} />
                    <Button color="dark"
                    style={{ marginTop: "2rem" }}
                    block >
                    Add Item
                    </Button>
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </React.Fragment>
        );
    }
}

const mapStateToProps = (state) =>({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addItem})(ItemModal);
