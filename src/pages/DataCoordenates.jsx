import React from "react";
import { Button, Col, Row , Form} from "react-bootstrap";
import useXlsx from "../helpers/useXlsx";
import TableModel from "../components/TableModel";
import { headerTablePreviewAddress } from "../models/headerTablePrevieAddress";
import { servicesGeolocation } from "../services/servicesGeolocation";
import Swal from "sweetalert2";



const DataCoordenates = () => {
    const { exportToXlsx, readXlsx } = useXlsx();
    const [data, setData] = React.useState([]);
    const MAX_ROWS = 50;
    const exportTemplate = () => {
        const data = [["Calle", "No. Ext.", "Colonia", "Ciudad", "Estado", "País", "CP"]]
        const widthColumns = [30, 10, 25, 20,20,20,10]
        exportToXlsx(data, "Template.xlsx", widthColumns)
    }

    

    const getCoordenates =async () => {

       const address = data.map((row) => ({
        ...row,   
        street : `${row.streetOrigin} ${row.noExt}`,
        county: row.district,
        postalcode: row.postalCode,
        format:"json"
        }))
        Swal.fire({
            title: 'Obteniendo coordenadas...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

        try {


            const promises = address.map(async (row) => {
                try {
                  const response = await servicesGeolocation.getCoordinates({ params: row });
                  return {
                    ...row,
                    latitude: response?.[0]?.lat ?? null,
                    longitude: response?.[0]?.lon ?? null,
                  };
                } catch (err) {
                  console.error("Error individual:", err);
                  return {
                    ...row,
                    latitude: null,
                    longitude: null,
                  };
                }
              });

              const results = await Promise.all(promises);
            setData(results);
            Swal.close();


        } catch(error) {
            console.log(error)
            Swal.close();
        }
        
    }


    const clearInput = () => {
        document.getElementById("inputImport").value = null;
    }

    const formatData = (data) => {
        
        const formattedData = [];
        for (const row of data) {
            if (row[0] === "" || row[0] === null || formattedData.length >= MAX_ROWS) {
                break; 
            }
    
            formattedData.push({
                id: Math.random(),
                streetOrigin: row[0],
                noExt: row[1],
                district: row[2],
                city: row[3],
                state: row[4],
                country: row[5],
                postalCode: row[6],
            });
        }

        setData(formattedData);
    }

    const exportCoordenates= ()=> {
        const dataExport = data.map((row) => {
            return [
                row.streetOrigin,
                row.noExt,
                row.district,
                row.city,
                row.state,
                row.country,
                row.postalCode,
                row.latitude,
                row.longitude
            ]
        })

        const headers = ["Calle", "No. Ext.", "Colonia", "Ciudad", "Estado", "País", "CP", "Latitud", "Longitud"]
        dataExport.unshift(headers);
        const widthColumns = [30, 10, 25, 20,20,20,10,10,10]
        exportToXlsx(dataExport, "Coordenates.xlsx", widthColumns)
    }

    const getData = async (event) => {

        if(event.target.files.length === 0) {
            return;
        }
        try {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = async (e) => {
                const data =   await readXlsx(e.target.result)
                formatData(data);
            }
            reader.readAsArrayBuffer(file);
        } catch(error) {
            console.log(error)
        } finally {
            clearInput();
        }

      
        
    }
        

    return (
        <>
            <Row className="mt-3 align-items-center">
                <Col xs={12} md={6}>
                    <h1>Obtencion de coordenadas</h1>
                    <p>Para poder proceder con la obtención de las coordenadas,
                        es imprescindible que complete un formulario con los datos
                        necesarios. Esta información es fundamental para asegurar
                        que el proceso se realice de manera precisa y eficiente.
                        Agradecemos su colaboración al proporcionarnos los detalles
                        requeridos en el formato indicado.</p>
                </Col>
                <Col xs={12} md={6} className="text-center">
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" onClick={() => document.getElementById("inputImport").click()}>
                            Import Template
                        </Button>
                       <Form.Control type="file"
                        hidden 
                        id="inputImport" 
                        onChange={getData}
                        accept=".xlsx"
                        ></Form.Control>

                        <Button variant="secondary" size="lg" onClick={exportTemplate}>
                            Export Template
                        </Button>
                    </div>
                </Col>
                </Row>
            
                <Row className="pt-2">
                <Col xs={12} className="text-end">
                <Button variant="secondary" disabled={data.length == 0} size="md" style={{
                        marginRight: "10px"
                    }} onClick={exportCoordenates} >
                        Export Data
                    </Button>
                    <Button variant="primary" disabled={data.length == 0} size="md" onClick={getCoordenates} >
                        Get Coordenates
                    </Button>
                </Col>
                <Col xs={12}>
                    <TableModel headers={headerTablePreviewAddress} data={data}/>
                </Col>
               
            </Row>
        </>
    )

}

export default DataCoordenates;