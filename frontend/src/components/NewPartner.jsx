import { useState, useEffect } from 'react';
//import uuid v4
import { v4 as uuid } from "uuid";
import PartnerTile from './PartnerTile';


function NewPartner({ handleNewPartner }) {
    const[newPartnerData, setNewPartner] = useState({
        //to initialize state with empty string for each field
        status: '', 
        thumbnailUrl: '', 
        name: '', 
        description: ''

    }); 


    //when input changes, update the state of field with new value
    const addInfo = (event) => {
        const { name, value } = event.target;
        setNewPartner({ ...newPartnerData, [name]: value });
      };


    //called when submit is clicked 
    const submitForm = (event) => {
        event.preventDefault();
        const newPartner = {
            ...newPartnerData,
            uniqueId: uuid(),
            dateCreated: new Date()
          };
          handleNewPartner(newPartner);
          setNewPartner({
            status: '',
            thumbnailUrl: '',
            name: '',
            description: ''
          });
      };
      console.log(newPartnerData.uniqueId); 
      console.log(newPartnerData.dateCreated); 

      return (
        <form onSubmit={submitForm}>
          <input
            type="checkbox"
            name="status"
            value={newPartnerData.status}
            onChange={addInfo}
            placeholder="Status"
            required
          />
          <label for="status"> Active? </label>
          <input
            type="text"
            name="thumbnailUrl"
            value={newPartnerData.thumbnailUrl}
            onChange={addInfo}
            placeholder="Thumbnail URL"
            required
          />
          <input
            type="text"
            name="name"
            value={newPartnerData.name}
            onChange={addInfo}
            placeholder="Name"
            required
          />
          <textarea
            name="description"
            value={newPartnerData.description}
            onChange={addInfo}
            placeholder="Description"
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      );
 }

 export default NewPartner;


