import React from "react";
import { Button, Card } from "react-bootstrap";


const CardDirection = (props) => {
    const {address, city, state, postalcode}  = props;


    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Text>
                <h5 className="card-title">Dirección</h5>
                <p className="card-text">{address}</p>
                <p className="card-text">{city}, {state} {postalcode}</p>

                </Card.Text>
            </Card.Body>
        </Card>
        
    )
}
export default CardDirection;