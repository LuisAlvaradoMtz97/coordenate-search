import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useListMapAtom } from "../atoms/useListMapAtom";

const ComponentMap = (props) => {
    const [listAddressMap, setListAddressMap] = useListMapAtom();
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

                        {listAddressMap.map((address, index) => (
                            <Marker key={index} position={[address.coordinates.lat, address.coordinates.lng]}>
                                <Popup>
                                    {address.address}
                                </Popup>
                            </Marker>
                        ))}

                    </MapContainer>
     
    )
}

export default ComponentMap;