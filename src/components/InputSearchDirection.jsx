import React, {useEffect, useState, useRef} from "react";
import { ButtonGroup, Button, Dropdown , Form} from "react-bootstrap";
import {servicesGeolocation} from "../services/servicesGeolocation";

const InputSearchDirection = (props) => {   
    const { placeholder, value, onChange } = props;
    const [viewOptions, setViewOptions] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [addresses, setAddresses] = useState([]);
    
    const [abortController, setAbortController] = useState(null);
    const [optionAddress, setOptionAddress] = useState([]);
    const debounceTimeoutRef = useRef(null); // Referencia para el timeout del debounce



    const handleAdress = (e) => {
      const address = e.target.value;
      setValueSearch(address);

      // Si el usuario borra el texto, limpiar resultados y ocultar opciones
      if (address.length === 0) {
          setViewOptions(false);
          setOptionAddress([]);
          return;
      }

      // Limpiar el timeout anterior si el usuario sigue escribiendo
      if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
      }

      // Configurar un nuevo timeout para ejecutar la búsqueda después de 500ms
      debounceTimeoutRef.current = setTimeout(() => {
          searchAddress();
      }, 500); // 500ms de espera
  };


    const searchAddress = async () => {
      try{
        // const controller = new AbortController();
        // abortControllerRef.current = controller;

        const response = await servicesGeolocation.searchCoordenates({ 
          search: valueSearch 
      });


      console.log("respuesta", response)
        setOptionAddress(response?.results || []);
        setViewOptions(response?.results?.length > 0);
      } catch(error){
        console.error("Error fetching coordinates:", error);
      }
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
    <Dropdown.Menu show={viewOptions && optionAddress.length > 0}>
    {optionAddress.length > 0 && optionAddress.map((address, index) => (
        <Dropdown.Item key={index} eventKey={index}>
          {address?.annotations?.flag} - {address.formatted}
        </Dropdown.Item>
      ))}
       </Dropdown.Menu>
        
        </>
        
    );

}

export default InputSearchDirection;