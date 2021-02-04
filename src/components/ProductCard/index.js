import React, { useEffect } from "react";
import { useParams,useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from './../Forms/Button'
import {addProduct} from './../../redux/Cart/cart.actions'
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Products/products.actions";
import "./styles.scss";

const mapState = (state) => ({
  product: state.productsData.product,
});
const ProductCard = ({}) => {
  const { productID } = useParams();
  const { product } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory()

  const { productName, productThumbnail, productPrice,productDesc } = product;
  useEffect(() => {
    dispatch(fetchProductStart(productID));


    //Component will unmount 
    return ()=>{
        dispatch(
            setProduct({})
        )

    }
  }, []);

  const configAddToCartBtn = {
      type: 'button'
  }

  const handleAddToCart = (product) => {
    if(!product) return;
    dispatch(addProduct(product))
    history.push('/cart')
  }
  return (
    <div className="productCard">
      <div className="hero">
        <img src={productThumbnail} />
      </div>
      <div>
        <div className="productDetails">
          <ul>
            <li>
              <h1>{productName}</h1>
            </li>

            <li>
              <h1><span>€{productPrice}</span></h1>
            </li>

            <li>
                <div className="addToCart">
              <Button {...configAddToCartBtn} onClick={()=>handleAddToCart(product)}>Add to card</Button>

              </div>
            </li>
            <li>
              <span dangerouslySetInnerHTML={{__html:productDesc}}/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
