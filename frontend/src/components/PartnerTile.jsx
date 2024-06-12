import React from 'react';

/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

function PartnerTile({ partnerData , deletePartner }) { //partnerData represents a single partner 

 // const { thumbnail, name, info } = partnerData; 
 
 const thumbnail = partnerData.thumbnailUrl; 
 
 const name = partnerData.name; 
 const description = partnerData.description; 
 const status = partnerData.status; 
 const id = partnerData.uniqueId; 
 
 //dynamically set color of status for each partner 
 let isActive; 
 if (status === 'Active') {
  isActive = 'active'; 
 } else {
  isActive = 'inactive'; 
 }

  const handleDelete = (partnerId) => {
      deletePartner(id);
 };

  return (
    <div className="partner-tile">
      <img className="partner-thumbnail" src={ thumbnail } alt={ name }/>
      <hr />
      <div className="partner-info">
        <h3>{ name }</h3>
        <div className={`partner-status ${isActive}`}>
          <h4>{ status }</h4>
        </div>
        <p>{ description }</p>
        <div className='date-container'>
          <p>Date Added: { partnerData.dateCreated }</p>
        </div>
        <button className='button' id={partnerData.id} onClick={handleDelete} >Delete</button>
      </div> 
    </div>
  )
}

export default PartnerTile;