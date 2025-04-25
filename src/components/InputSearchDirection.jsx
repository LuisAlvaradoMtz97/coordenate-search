import React, {useEffect, useState, useRef} from "react";
import { ButtonGroup, Button, Dropdown , Form} from "react-bootstrap";
import {servicesGeolocation} from "../services/servicesGeolocation";

const InputSearchDirection = (props) => {   
    const { placeholder, value, onChange } = props;
    const [viewOptions, setViewOptions] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [addresses, setAddresses] = useState([]);
    const abortControllerRef = React.useRef(null); 
    const [abortController, setAbortController] = useState(null);


    useEffect(() => {
        if(valueSearch.length > 0){
          
       
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
            setViewOptions(true);
            searchAddress();
        }
        else{
            setViewOptions(false);
        }
    }, [valueSearch]);

    const searchAddress = async () => {
      try{
        const controller = new AbortController();
        abortControllerRef.current = controller;

        const response = await servicesGeolocation.getCoordinates({ 
          params: { q: valueSearch, format: 'json' },
          signal: controller.signal, 
      });
        console.log(response);
      } catch(error){
        console.error("Error fetching coordinates:", error);
      }
    }
    const handleAdress = (e) => {
        setValueSearch(e.target.value);
    }
    return (
        <>
<Form.Control
        type="text"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        onChange={handleAdress}
        className="mt-3"
        placeholder="Buscar dirección"
      />
    <Dropdown.Menu show={viewOptions}>
      <Dropdown.Item eventKey="2">Another action kasdhkshdfksdhfksdfksdfkkjhsfksd</Dropdown.Item>
      <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
    </Dropdown.Menu>
        
        </>
        
    );

}

export default InputSearchDirection;