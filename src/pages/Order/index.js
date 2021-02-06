import React,{useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {getOrderDetailsStart} from './../../redux/Orders/orders.actions'
import {useDispatch,useSelector} from 'react-redux'

const mapState = ({ordersData}) => ({
    orderDetails : ordersData.orderDetails
})
const Order = () => {
    const {orderID} = useParams()
    const dispatch = useDispatch();
    const {orderDetails} =useSelector(mapState)
    const {orderTotal} = orderDetails

    useEffect(()=>{
        dispatch(getOrderDetailsStart(orderID))

    },[])
    return (
        <div>
            <h1>
                Order ID: #{orderID}
            </h1>
            <h3>
                Total: € {orderTotal}
            </h3>
        </div>
    )
    
}

export default Order;