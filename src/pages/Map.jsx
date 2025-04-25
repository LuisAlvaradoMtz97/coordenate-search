import React from "react";
import CardDirection from "../components/CardDirection";
import ComponentMap from "../components/ComponentMap";
import { Row, Col, Button } from "react-bootstrap";
import InputSearchDirection from "../components/InputSearchDirection";
const Map = () => {
    return (
        <>
           <Row className="mt-3">
            <Col xs={12} md={4}>
                <Row>
                    <Col md={12} className="d-flex justify-content-center">
                        <Button variant="primary" className="me-2">Agregar</Button>
                        <Button variant="primary" className="me-2">Importar Coordenadas</Button>
                    </Col>
                    <Col md={12}>
                        <InputSearchDirection />
                        <CardDirection adress={'Pirineos 712'} city={'Santa Catarina'} />
                        <CardDirection adress={'Pirineos 712'} city={'Santa Catarina'} />
                        <CardDirection adress={'Pirineos 712'} city={'Santa Catarina'} />
                        <CardDirection adress={'Pirineos 712'} city={'Santa Catarina'} />
                    </Col>
                </Row>
            </Col>
            <Col xs={12} md={8}>
                <ComponentMap />
            
            
            </Col>
           </Row>
        </>
    )
}
export default Map;