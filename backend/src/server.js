import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const port = 4000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 

// Some partner data
const partners = {
  "sftt": {
    "thumbnailUrl": "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png",
    "name": "Speak For The Trees",
    "description": "Speak for the Trees Boston aims to improve the size and health of the urban forest in the greater Boston area, with a focus on under-served and under-canopied neighborhoods. They work with volunteers to inventory (collect data) trees, plant trees, and educate those about trees. C4C has built a tree stewardship application for SFTT that allows users to participate in conserving Boston's urban forest. Across Boston, hundreds of trees have been adopted and cared for.",
  }
}

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

//API endpoint GET 
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'c4c_partners.json');
  const data = fs.readFileSync(filePath, 'utf8');
  const partners = JSON.parse(data);
  res.status(200).json(partners);
}); 


//API endpoint - DELETE 
app.delete('/:uniqueId', (req, res) => {

  //extract id from url path 
  const id = req.params.uniqueId; 
  console.log(`Deleting partner with ID: ${id}`);
  const filePath = path.join(__dirname, 'c4c_partners.json');
  const data = fs.readFileSync(filePath, 'utf8');
  let partners = JSON.parse(data);

  //use filter on partners to filter out partner with matching guid
  const updatedPartners = partners.filter(partner => partner.uniqueId !== id);
  console.log('Partners after deletion:', updatedPartners);

  // Write the updated partners array back to the JSON file
  fs.writeFileSync(filePath, JSON.stringify(updatedPartners, null, 2), 'utf8');

  res.sendStatus(200);

})

// Start the backend
app.listen(port, () => {
  console.log(`Express server starting on port ${port}!`);
})