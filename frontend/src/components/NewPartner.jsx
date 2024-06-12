import { useState, useEffect } from 'react';
//import uuid v4
import { v4 as uuid } from "uuid";
import PartnerTile from './PartnerTile';


function NewPartner({ handleNewPartner }) {
    const[newPartnerData, setNewPartner] = useState({
        //to initialize state with empty string for each field
        status: 'Not Active', 
        thumbnailUrl: '', 
        name: '', 
        description: ''

    }); 


    //when input changes, update the state of field with new value
    const addInfo = (event) => {
        const { name, value ,type, checked} = event.target;
        setNewPartner({ ...newPartnerData, [name]: type === 'checkbox' ? (checked ? 'Active' : 'Not Active') : value 
    });
      };


    const formatDate = (date) => {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    //called when submit is clicked 
    const submitForm = (event) => {
        event.preventDefault();
        const newPartner = {
            uniqueId: uuid(),
            dateCreated: formatDate(new Date()),
            ...newPartnerData
          };
          handleNewPartner(newPartner);
          setNewPartner({
            status: 'Not Active',
            thumbnailUrl: '',
            name: '',
            description: ''
          });
      };
      console.log(newPartnerData.uniqueId); 
      console.log(newPartnerData.dateCreated); 

      return (
        <div className='form-container'>
    
         <h3>Add a Partner!</h3>

        <form onSubmit={submitForm}>
        <div className='form-input'>
        <label for="status"> Active? </label>
        <input
            type="checkbox"
            name="status"
            onChange={addInfo}
            checked={newPartnerData.status === 'Active'}
            placeholder="Status"
          />
          </div>
          <div className='form-input'>
          <label for="thumbnailUrl"> Partner Logo Source: </label>
          <input
            type="text"
            name="thumbnailUrl"
            value={newPartnerData.thumbnailUrl}
            onChange={addInfo}
            placeholder="Insert thumbnail URL"
            required
          />

          </div>
          <div className='form-input'>
          <label for="name"> Partner Name: </label>
          <input
            type="text"
            name="name"
            value={newPartnerData.name}
            onChange={addInfo}
            placeholder="Insert name here"
            required
          />
          </div>
          <div className='form-input'> 
          <label for="description"> Partner Description: </label>
          <textarea
            name="description"
            value={newPartnerData.description}
            onChange={addInfo}
            required
          ></textarea>
          </div>
          <button className='submit-button' type="submit">Submit</button>
        </form>
        </div>
      );
 }

 export default NewPartner;


