## How to Start Application 
You will need to install Node.js/NPM and Git!
1. Clone my repository on to your computer. You can do so with the [desktop app](https://desktop.github.com/), or in a terminal with the following:
```
   git clone https://github.com/mayakarintholil/c4c-challenge.git
```
2. In your terminal, run `npm install` **at the root of this project** to install the required packages.
3. Run `npm run dev` **at the root of this project** to start the app locally. 
4. Visit `http://localhost:3000` to view the website
    
    4a. The backend will be available at `http://localhost:4000`

## Overview of Application
Structure of the Application: 
- Frontend: The frontend renders the UI of the application using React, and furthermore,  handles user input and interactions. 
Several components make up the frontend, including: 
   - Dashboard.jsx: Contains the search bar and the grid that displays all PartnerTiles. This component also handles fetching the current list of partners from the backend and manages the state of this partner list, including the functions of adding and deleting. 

   - NewPartner.jsx: The form component that handles adding a new partner to the dashboard - collects necessary information such as name, logo, description, and status. It supplies a unique GUID and date created upon submission from the user and sends this data to the backend. 

   - PartnerTile.jsx: This component represents an individual partner in the dashboard. It displays a partner's status, the date it was added to the dashboard, its name, logo, and description. Furthermore, it also includes the delete button to remove itself. 

- Backend: The backend runs on `http://localhost:4000` and serves partner data to the frontend
   - server.js: This is the server that defines the API endpoints (fetching, deleting, adding) using Express. It uses the json file as a database to store partner data. In order to test the API endpoints I created, I used Insomnia to verify the correct function of the requests being made. 
   - c4c_partners.json: This is the database that stores partner data. The backend reads from and writes to this file to keep partner data updated. 


Features: 
This application serves as a dashboard where the user can manage and manipulate Code for Community partners. Features of this application include: 
1. View Current Partners: display of a list of C4C partners. This includes their names, descriptions, logos, whether they are active or not, and the date and time they were added to the dashboard. 
2. Delete Partners: Each partner on the dashboard includes a delete button, where the partner can be removed from the list of current C4C partners. After deletion, the partners on the dashboard update automatically with the deleted partner filtered out. 
3. Add a Partner: Users have the option to add a partner to the dashboard. Using a form, users can indicate the status, logo, name, and description of the partner. Upon pressing the submit button, the new partner is added and displayed on the dashboard with its own unique GUID and date created and displayed as well. 
4. Search for Partners: Using the search bar under 'Search for a Partner', users can look up the name of any partner and the list of displayed partners updates in real-time to match the user's query. 


## Design Decisons Made
1. Backend Design: I used a JSON file as the database that stored partners, which made it easy to persist data across server restarts without needing a separate database server. For each partner added to the file, I created two extra properties: uniqueId and dateCreated. It helped ensure that each partner could be uniquely identified, and possibly filtered using creation date in the future. To generate each uniqueId, I utilized the 'uuid' library which provided an easy way to create a universally unique identifier. 

2. RESTful API Design: The API was created using REST principlest with routes such as: 
   - GET /= retrieves all partners from 'c4c_partners.json'.
   - DELETE /:uniqueId = deletes a partner by their id. 
   - POST / = adds a new partner with its properties to 'c4c_partners.json'. 

3. Error Handling: I sent the appropriate HTTP status codes to indicate back to the client the nature of the error. 

4. Frontend Design: I added the 'NewPartner.jsx' as a form-based component to collect essential partner information. This helped isolate logic and UI related to adding a new partner from other components. Furthermore, search functionality was added into 'Dashboard.jsx' mainly because all data fetching operations are managed within this file. When new partner data is fetched, or changes are made, search functionality can directly access the updated list of partners at all times without needing to synchronize data across different components. 

5. Managing State: Within the Dashboard component, 2 pieces of state are managed: partners and searchTerm. For example, the partners state manages the array of partner data fetched from the backend API. By keeping these as local states, it ensures that only Dashboard is tasked with fetching partners and handling search functionality. 


## Reflection 
I have learned so much from this project! I have had close to no experience with buildding applications using React, and have had very limited exposure to backend and frontend development. Although this project looked really overwhelming (and maybe was a little overwhelming), I decided to start early and take one step at a time. From watching many Youtube videos on how APIs and React work, reading and understanding long documentation, and using Stack Overflow for past questions related to issues I was facing, I tackled each functionality once at a time. If I had this knowledge going into this project to begin with, I would definitely have finished it a lot faster and also been more confident in my skills. 

With more time, I think I would definitely add cooler features such as user authentication (which seems really interesting) - either using just email and a JWT or through the commonly used login and password. Furthermore, I am still not the best at CSS and designing webpages as aesthetically as I'd like to - so learning more techniques and optimizing styling with CSS would be on my agenda as well. 

I ran into several issues throughout this project. However, since my learning curve has been so steep in these last two weeks, time-consuming issues were more common in the beginning. I created my first API by reading the JSON file, but regardless of how much I worked on the frontend, the partners were not displaying on the page. That's when I realized that maybe the issue was actually with the API - so to check if the request was going through I used Insomnia and realized the GET request wasn't actually fetching the correct data at all. A lot of the time, I would fix these issues by taking breaks and going back to them later. Otherwise, I would use Youtube tutorials or helpful websites to try other methods. 

I chose to add the search bar into my application because it allows users to quickly locate partners by filtering through a possibly large dataset. And within Dashboard, I already had access to partners, which made filtering by name not too difficult of a task. I also wanted to learn how to implement search functionality because it is so common in a majority of websites and it felt important to understand how to implement. 

