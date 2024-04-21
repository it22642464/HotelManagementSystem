import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './contact.css';

function ContactVeiw(){
 const [contacts,setContacts]= useState([]);
 const [loading, setLoading] = useState(true);
 const [inputValue, setInputValue] = useState('');
 const [selectedContactId, setSelectedContactId] = useState(null);
 const [con, setCon] = useState(null);
 useEffect(() => {
  
    const fetchContacts = async() =>{
  try{
    const response = await axios.get('http://localhost:8070/contacts/');
    setContacts(response.data);

  }catch(error){
    console.error('Error fetching contact:', error);

  } finally {
    setLoading(false);
}    
    };
    fetchContacts();

 },[])

 const deleteContact =(id)=>{
    setContacts((prevContacts) => prevContacts.filter((con) => con._id !== id));
 }


 if (loading) {
    return <div>Loading...</div>;
};

const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
};

const handleButtonClick = (id) => {
    const contact = contacts.find((cont) => cont._id === id);
    setCon(contact);
    setSelectedContactId(id)
   
};


const handleSendButtonClick = async () => {
    
    if (selectedContactId && inputValue) {
        try {
            const response = await axios.put(`http://localhost:8070/contacts/update/${selectedContactId}`, {
                reply: inputValue,
            });
            const updatedContacts = contacts.map((con) => {
                if (con._id === selectedContactId) {
                    return {
                        ...con,
                        reply: inputValue
                    };
                }
                return con;
            });
            setContacts(updatedContacts);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }
};
const handleDeleteButtonClick = async () => {
    
    if (selectedContactId) {
        try {
            const response = await axios.delete(`http://localhost:8070/contacts/delete/${selectedContactId}`)

        } catch (error) {
            console.error('Error updating data:', error);
        }
    }
};

return (
    <div className="contacts-container col">
        {contacts.length === 0 ? (
            <p>No contacts found.</p>
        ) : (
            <div className="contacts-container">
                <h3 className="contact-head">All Contact</h3>

                <div className="contacts-card-container">
                    {contacts.map((contact) => {
                        const { _id, name, email, subject, massage,reply } = contact;
                        return (
                            
                            <div className="contact-card" key={_id}>
                                <div className="card-header row">
                                    <div className="name col-3">{name}</div>
                                    {/* <div className="name col-3">{name}</div> */}
                                    <div className="email col-5">{email}</div>
                                </div>
                                <div className="card-body">
                                    <div className="subject"> <strong>Subject:</strong>{subject}</div>
                                    <div className="Question"><strong>Question:</strong>{massage}</div>
                                    <div className="Reply"> <strong className="reply">Reply:</strong>{reply}</div>
                                </div>
                                <div className="card-footer">
                                    <button className="btn delete-btn" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => handleButtonClick(_id)}>
                                        Delete
                                    </button>
                                    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="deleteModalLabel">    
                                                        <div className=" row">
                                                            <div className="nname col-8">{con ? con.name : "No contact selected"}</div>
                                                            <div className="eemail col-4">{con ? con.email : "No contact selected"}</div>
                                                        </div>
                                                    </h1>
                                                </div>
                                                <div class="modal-body">
                                                  <p>Are you suer your ation</p>
                                                </div>    
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                                                                handleDeleteButtonClick();
                                                                deleteContact(_id);
                                                            }}>
                                                                Sure
                                                            </button>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleButtonClick(_id)}>
                                        Reply
                                    </button>
                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">    
                                                        <div className=" row">
                                                            <div className="nname col-7">{con ? con.name : "No contact selected"}</div>
                                                            <div className="eemail col-5">{con ? con.email : "No contact selected"}</div>
                                                        </div>
                                                    </h1>
                                                </div>
                                                <div class="modal-body">
                                                    <div className="card-body">
                                                        <div className="ssubject ">{con ? con.subject : "No contact selected"}</div>
                                                        <div className="mmessage">{con ? con.massage : "No contact selected"}</div>
                                                        <div className="input m-3"> 
                                                            <input type="text"
                                                                id="single-input"
                                                                value={inputValue}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>  
                                                </div>    
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                                                                handleSendButtonClick(_id);
                                                            
                                                            }}>
                                                                Send
                                                            </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
    </div>
);






}

export default ContactVeiw;