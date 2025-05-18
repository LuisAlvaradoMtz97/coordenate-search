import React, {useEffect, useState, useRef} from "react";
import { ButtonGroup, Button, Dropdown , Form} from "react-bootstrap";
import {servicesGeolocation} from "../services/servicesGeolocation";
import 'react-bootstrap-typeahead/css/Typeahead.css';

const InputSearchDirection = (props) => {   
    const { placeholder, value, onChange } = props;
    const [viewOptions, setViewOptions] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [addresses, setAddresses] = useState([]);

    const [abortController, setAbortController] = useState(null);
    const [optionAddress, setOptionAddress] = useState([]);
    const debounceTimeoutRef = useRef(null); // Referencia para el timeout del debounce

    const options = optionAddress.map((address) => `${address?.annotations?.flag} - ${address.formatted}`);


    //Funcion dedicada a realizar la busqueda de direcciones
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


    //Manda la peticion para obtener las direcciones
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

    //Se agrega la direccion al listado
    const addAddress = (address) => {
      setAddresses((prevAddresses) => [...prevAddresses, address]);
      setValueSearch('');
      setViewOptions(false);
    }
  
    return (
        <>
<Form.Control
        type="text"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        onChange={handleAdress}
        value={valueSearch}
        className="mt-3"
        placeholder="Buscar dirección"
      />
    <Dropdown.Menu show={viewOptions && optionAddress.length > 0} focusFirstItemOnShow={true} >
    {optionAddress.length > 0 && optionAddress.map((address, index) => (
        <Dropdown.Item key={index} eventKey={index} 
        onClick={() => {
            addAddress(address)
        }}
        >
          {address?.annotations?.flag} - {address.formatted}
        </Dropdown.Item>
      ))}
       </Dropdown.Menu>
        
        </>
        
    );

}

export default InputSearchDirection;