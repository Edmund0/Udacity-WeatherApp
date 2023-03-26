

/* GLOBAL VARIABLES */
// API Credential Variables
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
let geoLocation = 'https://api.openweathermap.org/geo/1.0/zip?zip=';
let apiKey = '&appid=9d1405c9e963ad78ac9e8cef6e20ffd0&units=imperial';



    /***************************************/
    /* HELPER FUNCTION TO GET PROJECT DATA */
    /***************************************/

    const getProjectData = async () => {

        // Determines the coordinate that corresponds to the zip code
        const request = await fetch ('/projectData');   
        try {
            const data = await request.json();
            const recentData = data[data.length-1];
            console.log(recentData);

            // Write latest data to to DOM elements
            document.getElementById('temp').innerHTML = Math.round(recentData.temperature)+ 'degrees';
            document.getElementById('content').innerHTML = recentData.userResponse;
            document.getElementById('date').innerHTML = recentData.date;

        } catch (error) {
            return undefined;
        }

    }



    /*******************************************/
    /* HELPER FUNCTION TO GET TEMPERATURE DATA */
    /*******************************************/

        const getData = async (baseURL, geoLocation, zipCode, apiKey) => {

            let location = '';

            // Determines the coordinate that corresponds to the zip code
            const geoResponse = await fetch (geoLocation + zipCode + apiKey);   
            try {
                const data = await geoResponse.json();
                location = 'lat=' + data.lat + '&lon=' + data.lon;
            } catch (error) {
                return undefined;
            }

            // Uses the web API to extract the necessary temperature data
            const baseResponse = await fetch (baseURL + location + apiKey);   
            try {
                const data = await baseResponse.json();
                const temperature = (data.main.temp - 32) * 5 / 9;  // F to Celcius
                return temperature;
            } catch (error) {
                return undefined;
            }

        }
    
    

    /*********************************************/
    /* HELPER FUNCTION TO POST ALL GATHERED DATA */
    /*********************************************/

    const postData = async ( url = ' ', data ={}) => {

        console.log(data)
        // the fetxh code is not working

        const response = await fetch (url, {
    
            method: 'POST' , 
            credentials: 'same-origin', //include, *same-origin, omit
            headers: {
    
                'content-Type': 'application/json' ,
            },
            body: JSON.stringify(data),  // Body data type must match "Content-Type" header
        }); 

        //  getProjectData() WHY WOULD THIS FUNCTION NOT RUN IF IT IS PLACED HERE?

    };



    let fetchData = (event) => {

        // Create a new date instance dynamically with JS
        let d = new Date();
        let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

        // Obtains User Response
        let userResponse = document.getElementById('feelings').value;

        // Obtains Temperature
        let zipCode = document.getElementById('zip').value;
        zipCode = zipCode.replace(/\s+/g, '');                                  //Remove the whitespaces
        getData(baseURL, geoLocation, zipCode, apiKey)
            .then(temperature => postData('/projectData', {temperature: temperature, date: newDate, userResponse: userResponse}))
            .then(getProjectData());

    };

    document.getElementById('generate').addEventListener('click', fetchData);
