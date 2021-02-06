import React,{useEffect} from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

import {useDispatch} from 'react-redux';
import {setOrderDetails} from './../../redux/Orders/orders.actions'
const columns = [
  {
    id: "productThumbnail",
    label: "",
  },
  {
    id: "productName",
    label: "Name",
  },
  {
    id: "productPrice",
    label: "Price",
  },
  {
    id: "quantity",
    label: "quantity",
  },
];

const styles = {
  fontSize: "16px",
  with: "10%",
};

const formatText = (columnName,columnValue)=>{
    switch(columnName){
        case 'productPrice' : 
        return `€${columnValue}`

        case 'productThumbnail': 
        return <img src={columnValue} width={250} />

        default:
            return columnValue
    }
}
const OrderDetails = ({ order }) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        //clear orderdetails in the store when leaving the page
        return()=>{
            dispatch(
                setOrderDetails({})
            )
        }
    },[])


  const orderItems = order && order.orderItems;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => {
              return (
                <TableCell key={index} style={styles}>
                  {col.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orderItems) &&
            orderItems.length > 0 &&
            orderItems.map((row, pos) => {
              return (
                <TableRow key={pos}>
                  {columns.map((col, index) => {
                      const columnName = col.id
                      const columnValue = row[columnName]
                    return (
                      <TableCell key={index} style={styles}>
                        {formatText(columnName,columnValue)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderDetails;
