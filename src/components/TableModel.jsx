import React from "react";
import { Table } from "react-bootstrap";

const TableModel = (props) => {
    return (
        <Table responsive>
            <thead>
                <tr>
                {!!props?.headers && (props?.headers?.map((header, index) => (
                        <th style={{ width: header.width }}>{header.headerName}</th>
                    
                )))}
                </tr>
            </thead>
            <tbody>
                {!!props?.data && (props?.data?.map((row, index) => (
                    <tr key={index}>
                        {props.headers.map((header, index) => (
                            <td key={index}  >{row[header.field]}</td>
                        ))}
                    </tr>
                )))
                }
            </tbody>
        </Table>
    )

}

export default TableModel;