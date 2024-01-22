/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=b0df923fe22b20b64ac181d4eb968f81&units=imperial'
  
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



const getData = async () => {
    const response = await fetch('/all');
    try {
        const data = await response.json();

        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


const postData = async (url , data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.error('Error posting data:', error);
    }
};


const updateUI = async () => {
    const response = await fetch('/getData');
    try {
        const data = await response.json();
        // Update UI elements with dynamic values
        document.getElementById('temperature').innerHTML = `Temperature: ${data.temperature}`;
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('user-response').innerHTML = `User Input: ${data.userResponse}`;
    } catch (error) {
        console.error('Error updating UI:', error);
    }
};


document.getElementById('generate').addEventListener('click', async () => {
    const zipCode = document.getElementById('zip').value;
    const apiUrl = `${baseURL}${zipCode}${apiKey}`;

    try {
        const weatherData = await fetch(apiUrl);
        const weatherInfo = await weatherData.json();

        const date = new Date().toLocaleString();
        const userResponse = document.getElementById('feelings').value; 

        const newData = {
            temperature: weatherInfo.main.temp,
            date,
            userResponse,
        };

        console.log(newData);
        await postData('/all', newData);
        await updateUI()
    } catch (error) {
        console.error('Error processing weather data:', error);
    }
});