import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";

const OrderHistory = ({ orders }) => {
  const history = useHistory();
  const columns = [
    {
      id: "orderCreatedDate",
      label: "Order Date",
    },
    {
      id: "documentID",
      label: "Order ID",
    },
    {
      id: "orderTotal",
      label: "Amount",
    },
  ];

  const styles = {
    fontSize: "16px",
    cursor: "pointer",
    width: "10%",
  };

  const formatText = (columnName, columnValue) => {
    switch (columnName) {
      case "orderTotal":
        return `€${columnValue}`;

      case "orderCreatedDate":
        return moment(columnValue.nano).format("DD/MM/YYYY");
      default:
        return columnValue;
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => {
              const { label } = column;
              return (
                <TableCell key={index} style={styles}>
                  {label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orders) &&
            orders.length > 0 &&
            orders.map((row, index) => {

              const {documentID} = row
              return (
                <TableRow
                onClick={()=>history.push(`/order/${documentID}`)} key={index}>
                  {columns.map((column, index) => {
                    const columnName = column.id;
                    const columnValue = row[columnName];
                    const formatedText = formatText(columnName, columnValue);

                    return (
                      <TableCell key={index} style={styles}>
                        {formatedText}
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

export default OrderHistory;
