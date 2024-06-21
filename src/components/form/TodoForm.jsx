import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

export class TodoForm extends Component {
  render() {
    let {submit,contact,handleContact,selected,validated} = this.props

    return (
      <Form validated={validated} onSubmit={submit} noValidate className='w-50 m-auto'>
         <Form.Group className='my-4'  controlId="firstname">
           <Form.Label>First name</Form.Label>
           <Form.Control
           onChange={handleContact}
           value={contact.firstname}
            required
            type="text"
           />
           <Form.Control.Feedback type='invalid'>Please fill</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-4'  controlId="lastname">
           <Form.Label>Last name</Form.Label>
           <Form.Control
           onChange={handleContact}
           value={contact.lastname}
            required
            type="text"
           />
           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-4' controlId="phone">
           <Form.Label>Phone</Form.Label>
           <Form.Control
           onChange={handleContact}
           value={contact.phone}
            required
            type="tel"
           />
           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-4' controlId="category">
           <Form.Label>Category</Form.Label>
           <Form.Select
           onChange={handleContact}
            value={contact.category} >
               <option value="family">Family</option>
               <option value="friends">Friends</option>
               <option value="relative">Relative</option>
            </Form.Select>
        </Form.Group>


        <Button  className='mb-4 w-100' type="submit">{selected===null ? "Add" : "Save"}</Button>
      </Form>
    )
  }
}

export default TodoForm