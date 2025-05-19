import React from "react";
import CardDirection from "../components/CardDirection";
import ComponentMap from "../components/ComponentMap";
import { Row, Col, Button } from "react-bootstrap";
import InputSearchDirection from "../components/InputSearchDirection";
import { useListMapAtom } from "../atoms/useListMapAtom";

const Map = () => {
    const [listAddressMap, setListAddressMap] = useListMapAtom();

    const handleDelete = (index) => {
        const updatedList = listAddressMap.filter((_, i) => i !== index);
        setListAddressMap(updatedList);
    }

    return (

           <Row className="mt-3">
            <Col xs={12} md={4}>
                <Row>
                    <Col md={12}>
                        <InputSearchDirection />
                        <div style={{overflow:"auto", maxHeight: "80vh"}}>
                        {listAddressMap.map((address, index) => (
                            <CardDirection
                                key={index}
                                index={index}
                                address={address.address}
                                city={address.city}
                                state={address.state}
                                postalcode={address.postalcode}
                                handleDelete={handleDelete}
                            />
                        ))}
                        </div>

                    </Col>
                </Row>
            </Col>
            <Col xs={12} md={8}>
                <ComponentMap />
            
            
            </Col>
           </Row>
    )
}
export default Map;