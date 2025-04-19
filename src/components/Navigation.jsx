import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const Navigation = () => { 
    return (
      <Nav justify variant="tabs">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/">
          Reportes
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={NavLink} to="/map">
          Map
        </Nav.Link>
      </Nav.Item>
    </Nav>
    )
        
    
}

export default Navigation;