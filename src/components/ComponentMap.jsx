import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";


const ComponentMap = (props) => {
    const DEFAULT_COORDINATES = [25.685189924878674, -100.32137349521139]
    
    return (
     
                    <MapContainer 
                    center={DEFAULT_COORDINATES} zoom={13} 
                    scrollWheelZoom={true} 
                    style={{width:"100%" , height:"80vh"}} >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                    </MapContainer>
     
    )
}

export default ComponentMap;