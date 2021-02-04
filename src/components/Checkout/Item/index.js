import React from "react";
import {useDispatch} from 'react-redux'
import {removeCartItem} from './../../../redux/Cart/cart.actions'
const Item = (product) => {
  const {
    productName,
    productThumbnail,
    productPrice,
    quantity,
    documentID,
  } = product;

  const dispatch = useDispatch()

  const handleRemoveCartItem = (documentID) => {
      dispatch(removeCartItem({documentID}))
  }
  return <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
      <tbody>
          <tr>
              <td>
                  <img src={productThumbnail} alt={productName} />
              </td>
              <td>
                  {productName}
              </td>
              <td>
                  <span>
                      {quantity}
                  </span>
              </td>
              <td>
                  €{productPrice}
              </td>
              <td align="center">
                  <span className="cartBtn" onClick={()=>handleRemoveCartItem(documentID)}>
                      x
                  </span>
              </td>
          </tr>
      </tbody>
  </table>
};

export default Item;
