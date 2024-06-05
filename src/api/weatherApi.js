import axios from 'axios';

const API_KEY = 'your_weather_api_key'; // Replace with your actual weather API key
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${';
const END_URL = "}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json"

"city"

export const fetchWeather = async (location) => {
    try {
        const response = await axios.get(`${BASE_URL}${location}${END_URL}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
