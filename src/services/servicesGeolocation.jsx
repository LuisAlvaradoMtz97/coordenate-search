import axios from 'axios';
const urlCoordenates = 'https://nominatim.openstreetmap.org/'

export const servicesGeolocation = {
    getCoordinates: async ({ params}) => {
        try {
            const response = await axios.get(`${urlCoordenates}search`, { params});
            return response.data;
        } catch (error) {
            console.error("Error fetching coordinates:", error);
            return null;
        }
    },
}


