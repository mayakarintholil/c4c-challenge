import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';
import NewPartner from './NewPartner';


/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {

  const [partners, setPartners] = useState([]);

  // Load all partners on initial page load 
  useEffect(() => {
    fetch('http://localhost:4000', {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => { setPartners(data); })
    .catch((error) => console.error('Could not fetch partners', error));
  }, [])


  let partnersArray = Object.values(partners); 


  const deletePartner = (partnerId) => {
    fetch(`http://localhost:4000/` + partnerId, {
      method: 'DELETE',
    })
    .then((res) => {
      if(res.ok) {
        setPartners(partnersArray.filter(partner => partner.id !== partnerId));
        console.log('got here! ' + partnerId);

        //reload page automatically 
        window.location.reload();
      } else {
        console.error('Could not delete partner'); 
      }
    })
  };
  

  const addPartner = (partner) => {
    fetch('http://localhost:4000', {
      method: 'POST', 
      headers: {
        //specifying request body as JSON
        'Content-Type': 'application/json'
      }, 
      //Convert JS object to JSON string
      body: JSON.stringify(partner)
    })
    .then((res) => res.json())  // Parses the response from the server as JSON
    .then((addedPartner) => {
    setPartners((prevPartners) => [...prevPartners, addedPartner]);  
  })
  };
  
  return (
    <div id="main-content">
      <NewPartner handleNewPartner={addPartner} />
      <div id="main-partners-grid">
        {partnersArray.map((partner, index) => (
          <PartnerTile key={index} partnerData={partner} deletePartner={ deletePartner }/>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;