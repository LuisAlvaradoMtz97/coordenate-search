//Se esta utilizando https://opencagedata.com/

import axios from 'axios';
const urlCoordenates = import.meta.env.VITE_REACT_APP_URL_GEOLOCATION
const key = import.meta.env.VITE_REACT_APP_KEY_OPENCAGE

console.log(urlCoordenates, key);

export const servicesGeolocation = {

     
    getCoordinates: async ({ params, signal= null}) => {
        try {
            const response = await axios.get(`${urlCoordenates}search`, { params, signal});
            return response.data;
        } catch (error) {
            console.error("Error fetching coordinates:", error);
            return null;
        }
    },
    searchCoordenates: async ({ search}) => {
        try {
            const response = await axios.get(`${urlCoordenates}geocode/v1/json`, {
                params: {
                    q: search,
                    key: key
                }
            });
            return response.data;
        } catch(error) {
            console.error("Error fetching coordinates:", error);
            return null;
        }
    }
}



