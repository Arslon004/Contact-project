import React, { Component, createRef } from 'react'
import { InputGroup, Form} from 'react-bootstrap'

export class TodoHeader extends Component {
  constructor(props) {
    super(props)
    // this.searchRef=createRef();
    this.state = {}
  }
  render() {
    let {handleSearch,handleCategory,category} = this.props;
    return (
      <InputGroup className="my-3">
      <Form.Control onChange={handleSearch} ref={this.searchRef}
        placeholder="Search"
      />
       <InputGroup.Text id="basic-addon2">
           <Form.Select onChange={handleCategory} value={category}>
                <option value="all">All</option>
               <option value="family">Family</option>
               <option value="friends">Friends</option>
               <option value="relative">Relative</option>
               <option value="a-z">A-Z</option>
            </Form.Select>
       </InputGroup.Text>
      </InputGroup>
    )
  }
}

export default TodoHeader