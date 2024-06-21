import React, { Component } from 'react'
import { Container, Tabs, Tab } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import {v4} from "uuid";

import TodoForm from '../components/form/TodoForm'
import TodoHeader from '../components/header/TodoHeader'
import TodoCard from '../components/card/TodoCard'
import Footer from '../components/footer/Footer'

export class HomePage extends Component {
  state={
    activeTab:"all",
    contacts:JSON.parse(localStorage.getItem('contacts')) || [
      {
      firstname:"Ahror",
      lastname:"Valiyev",
      phone:"+998 100 79 81",
      category:"family",
      favorite:false,
      id:1,
    },
    {
      firstname:"Javlon",
      lastname:"Soliyev",
      phone:"+998 180 79 81",
      category:"friends",
      favorite:false,
      id:2,
    },
    {
      firstname:"Muhammad",
      lastname:"G'aniyev",
      phone:"+998 180 79 81",
      category:"relative",
      favorite:true,
      id:3,
    }
  ],
  contact:{
    firstname:"",
    lastname:"",
    phone:"",
    category:"family",
    favorite:false,
  },
  selected:null,
  search:"",
  category:"all",
  validated:false
  }
  render() {
    let {activeTab,contacts,contact,selected,search,category,validated} = this.state

    const handleSearch=(e)=>{
      // console.log(e.target.value);
      this.setState({search:e.target.value.trim().toLowerCase()});
    }
    let allContacts=contacts.filter((contact)=>{
    return  contact.firstname.toLowerCase().includes(search) || contact.lastname.toLowerCase().includes(search)
    });


    const changeTab=(e)=>{
      this.setState({activeTab:e})
    }

    const submit=(e)=>{
      e.preventDefault();
      this.setState({validated:true});
      if(e.target.checkValidity){
       // console.log(e.target.firstname.value);
       let newContact={...contact, id: v4()}
       let newContacts;
       if(selected===null){
          newContacts=[...contacts,newContact ];
          toast.success("Add successfully");
       }else{
          newContacts=contacts.map((contact)=>{
           if(contact.id === selected){
             return newContact;
           }
           return contact
         })
         toast.success("Save successfully");
       }
       localStorage.setItem('contacts',JSON.stringify(newContacts));
       this.setState({contacts:newContacts ,
       contact:{ firstname:"",
       lastname:"",
       phone:"",
       category:"family",
       favorite:false,
     },
     selected:null,
     validated:false,
       })
      }else{
        this.setState({validated: true});
      }

    }

    //yoyib olish
    const handleContact=(e)=>{
      this.setState({contact:{...contact,[e.target.id]:e.target.value}});
    }


    //favorite qilish
    const favoriteContact=(id)=>{
      let newContacts=contacts.map((contact)=>{
        if(contact.id === id){
           contact.favorite = true;
        }
        return contact;
      })
      this.setState({contacts:newContacts});
      localStorage.setItem('contacts',JSON.stringify(newContacts));
    }

    //delete qilish
    const deleteContact=(id)=>{
      let newContacts=contacts.filter((contact)=>contact.id !== id);
      this.setState({contacts: newContacts});
      localStorage.setItem('contacts',JSON.stringify(newContacts));
    }

    //edit
    const editContact=(id)=>{
      let contact = contacts.find((contact)=>contact.id === id);
      this.setState({contact, selected: id})
    }

    //category
    const handleCategory=(e)=>{
    this.setState({ category : e.target.value });
    }

    if(category !== "all" && category !==  "a-z"){
      allContacts=allContacts.filter((contact)=>contact.category === category)
    }

    if (category === "a-z") {
      allContacts.sort((a, b) => a.firstname.localeCompare(b.firstname));
    }

    //favorite contacts
    let favotiteContacts = allContacts.filter((contact)=>contact.favorite)

    return (
      <Container>
        <ToastContainer/>
        <TodoForm
        validated={validated}
         selected={selected} handleContact={handleContact} contact={contact} submit={submit}/>
        <TodoHeader
        handleCategory={handleCategory}
        category={category}
        handleSearch={handleSearch}/>

          <Tabs
              activeKey={activeTab}
              className="mb-3"
              onSelect={changeTab}
              fill
              variant='pills'
              >
             <Tab eventKey="all" title={`All ${allContacts.length} `}>
              {allContacts.map((contact,i)=> <TodoCard
              editContact={editContact}
              deleteContact={deleteContact}
              favoriteContact={favoriteContact}
              key={i} {...contact}/>)}
             </Tab>
             <Tab eventKey="favorite" title={`Favorite ${favotiteContacts.length}`}>
              {favotiteContacts.map((contact,i)=>(
                <TodoCard
                editContact={editContact}
                deleteContact={deleteContact}
                 key={i} {...contact}/>
              ))}
             </Tab>
         </Tabs>

        <Footer/>
      </Container>
    )
  }
}

export default HomePage