import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';
import NewPartner from './NewPartner';


/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {

  const [partners, setPartners] = useState([]);

  const [searchTerm, setSearchTerm] = useState(''); 

  // Load all partners on initial page load 
  useEffect(() => {
    fetch('http://localhost:4000', {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => { setPartners(data); })
    .catch((error) => console.error('Could not fetch partners!', error));
  }, [])


  let partnersArray = Object.values(partners); 

  //Delete partner using it's associated id
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
        console.error('Could not delete partner!'); 
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
    .then((res) => res.json())  
    .then((addedPartner) => {
    setPartners((prevPartners) => [...prevPartners, addedPartner]);  
  })
  .catch((error) => console.error('Could not add this partner!', error));

  };

  const filteredPartners = partnersArray.filter((partner) =>
     partner.name.toLowerCase().includes(searchTerm.toLowerCase())); 

  //onChange -> when input changes update setSearchTerm

  return (
    <div id="main-content">
      <NewPartner handleNewPartner={addPartner} />
      <div id="main-partners-grid">
        <div className='search-container'>
          <label htmlFor="searchbar">Search for a Partner</label>
          <input type='text' name='searchbar' placeholder='Enter a partner name...' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/> 
        </div>
        {filteredPartners.map((partner, index) => (
          <PartnerTile key={index} partnerData={partner} deletePartner={ deletePartner }/>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;