import axios from 'axios';
const urlCoordenates = 'https://nominatim.openstreetmap.org/'

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
}


