import React, { Component } from 'react'
import { Alert, Button } from 'react-bootstrap'

export class TodoCard extends Component {
  render() {
    let {firstname,lastname,phone,category,id,favorite,favoriteContact,deleteContact,editContact}=this.props;

    const colors={
      family:"danger",
      friends:"warning",
      relative:"secondary"
    }
    return (
      <Alert variant={colors[category]} className='d-flex justify-content-between align-items-center'>
        <div>
        <span>{phone}</span> <span>{firstname}</span> <span>{lastname}</span>
        </div>

        <div>
        <Button onClick={()=>editContact(id)} className='me-3' variant='secondary'>Edit</Button>
        {favorite ? (
          <Button  onClick={()=>deleteContact(id)} variant='danger'>Delete</Button>
        ) : (
          <Button onClick={()=>favoriteContact(id)} className='me-3' variant='success'>Favorite</Button>
        )}
        </div>
      </Alert>
    )
  }
}

export default TodoCard