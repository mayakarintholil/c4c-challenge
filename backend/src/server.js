import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const port = 4000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'c4c_partners.json');


/* 
  APPLICATION MIDDLEWARE
  This section contains some server configuration.
  You will likely not need to change anything here to meet the requirements.
  (but you are welcome to, if you'd like)
*/

// Parse request bodies as JSON
app.use(express.json())
// Enable CORS for the frontend so it can call the backend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next();
})

/*
  APPLICATION ROUTES
*/

//helper to read partners from JSON 
const readPartners = () => {
  const partnerData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(partnerData);
};

//helper to write partners to JSON 
const writePartners = (partners) => {
  fs.writeFileSync(filePath, JSON.stringify(partners, null, 2), 'utf8');
};


//API endpoint GET to retrieve partner data 
app.get('/', (req, res) => {
  try {
    const currentPartners = readPartners(); 
    res.status(200).json(currentPartners);
  } catch (error) {
    res.status(500).json({ message: 'Could not read partners from file', error });
  }
}); 


//API endpoint - DELETE to remove an existing partner 
app.delete('/:uniqueId', (req, res) => {
  //extract id from url path 
  const id = req.params.uniqueId; 
  console.log(`Deleting partner with ID: ${id}`);
  let partners = readPartners();
  //filtering out partner with matching guid
  const updatedPartners = partners.filter(partner => partner.uniqueId !== id);
  console.log('Partners after deletion:', updatedPartners);
  // Write the updated partners array back to the JSON file
  writePartners(updatedPartners);
  res.sendStatus(200);

})

//API endpoint - POST to add a partner 
app.post('/', (req, res) => {
  const newPartner = req.body; 
  try {
    const partners = readPartners();
    partners.push(newPartner);
    writePartners(partners);
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(500).json({ message: 'Could not add new partner', error });
  }
});


// Start the backend
app.listen(port, () => {
  console.log(`Express server starting on port ${port}!`);
})