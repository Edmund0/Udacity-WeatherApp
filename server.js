// Setup empty JS object to act as endpoint for all routes
projectData = {};




// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
    //Here we are configuring express to use body-parser as middle-ware.
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Cors for cross origin allowance
    const cors = require('cors');
    app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
port = 8000;
function listening() {  
        const host = server.address().address  
        const port = server.address().port  
        console.log("Example app listening at http://%s:%s", host, port);
    }

const server = app.listen(port, listening);

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

