import React from "react";
import { Button, Card } from "react-bootstrap";

const CardDirection = (props) => {
    const { address, index , handleDelete} = props;



    return (
        <Card className="mt-3 mx-4">
            <Card.Header><h5 className="card-title">Dirección {index + 1}</h5></Card.Header>
            <Card.Body>
                <Card.Text>
                    <p className="card-text">{address}</p>
                </Card.Text>
                <div className="d-flex justify-content-end">
                    <Button variant="danger" onClick={()=> {
                        handleDelete(index)
                    }}>Eliminar</Button>
                </div>
            </Card.Body>
        </Card>

    )
}
export default CardDirection;