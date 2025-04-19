import { Routes, Route } from "react-router";
import DataCoordenates from "../pages/DataCoordenates.jsx";
import Map from "../pages/Map.jsx";
const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<DataCoordenates />} />
            <Route path="/map" element={<Map />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
    );
}

export default AppRouter;