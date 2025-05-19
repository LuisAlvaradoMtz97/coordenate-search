//Se esta utilizando https://opencagedata.com/

import axios from 'axios';
const urlCoordenates = import.meta.env.VITE_REACT_APP_URL_GEOLOCATION
const key = import.meta.env.VITE_REACT_APP_KEY_OPENCAGE

export const servicesGeolocation = {

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



