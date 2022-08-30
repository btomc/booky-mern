import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  if (!loading) {
    // Calculate prices
    const addDecimals = (num) => {
      return ((num * 100) / 100).toFixed(2)
    }

    order.shippingPrice = addDecimals(order.itemsPrice > 50 ? 0 : 7)

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, successPay, order, orderId])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? (
    <Loader style={{ display: 'inline-block' }} />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <OrderContainer>
      <OrderContent>
        <h2>Order {order._id}</h2>
        <ContentItem>
          <h3>Shipping</h3>
          <ItemText>
            <strong>Name: </strong>
            {order.user.name}
          </ItemText>
          <ItemText>
            <strong>Email: </strong>
            {order.user.email}
          </ItemText>
          <ItemText>
            <strong>Shipping Method: </strong>
            {order.shipping.shippingMethod}
          </ItemText>
          <ItemText>
            <strong>Address: </strong>
            {order.shipping.address}, {order.shipping.city},{' '}
            {order.shipping.postalCode}, {order.shipping.country}
          </ItemText>
          <ItemText>
            {order.isSent ? (
              <Message variant='true' width='true'>
                Sent on {order.sentAt}
              </Message>
            ) : (
              <Message width='true'>Not Sent</Message>
            )}
          </ItemText>
        </ContentItem>

        <ContentItem>
          <h3>Payment</h3>
          <ItemText>
            <strong>Method: </strong>
            {order.paymentMethod}
          </ItemText>
          {order.isPaid ? (
            <Message variant='true' width='true'>
              Paid on {order.paidAt}
            </Message>
          ) : (
            <Message width='true'>Not Paid</Message>
          )}
        </ContentItem>

        <ContentItem>
          <h3>Order Items</h3>
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <OrderItems>
              {order.orderItems.map((item, index) => (
                <ItemsWrap key={index}>
                  <ImgWrap>
                    <Img src={item.image} alt={item.title} />
                  </ImgWrap>
                  <NameWrap>
                    <Title>{item.title}</Title>
                    <ItemP style={{ fontSize: '13px' }}>{item.author}</ItemP>
                  </NameWrap>
                  <ItemP>
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </ItemP>
                </ItemsWrap>
              ))}
            </OrderItems>
          )}
        </ContentItem>
      </OrderContent>
      <OrderSummary>
        <Card>
          <h3>Order Summary</h3>
          <OrderWrap>
            <OrderText>
              <strong>Items</strong>
              <ItemP>${order.itemsPrice}</ItemP>
            </OrderText>

            <OrderText>
              <strong>Shipping</strong>
              <ItemP>${order.shippingPrice}</ItemP>
            </OrderText>

            <OrderText>
              <strong>Total</strong>
              <ItemP>${order.totalPrice}</ItemP>
            </OrderText>

            <OrderText>{error && <Message>{error}</Message>}</OrderText>
          </OrderWrap>
          {!order.isPaid && (
            <BtnWrap>
              {loadingPay && <Loader />}
              {!sdkReady ? (
                <Loader />
              ) : (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successPaymentHandler}
                />
              )}
            </BtnWrap>
          )}
        </Card>
      </OrderSummary>
    </OrderContainer>
  )
}

export default OrderScreen

const OrderContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  /* background: rgba(81, 76, 173, 0.6);  */
  /* background: rgba(124, 121, 178, 0.7); */
  background: #dddddd;
  color: #171e40;

  @media screen and (max-width: 999px) {
    flex-direction: column;
    align-items: center;
  }
`

const OrderContent = styled.div`
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  border-radius: 4px;
  margin: 2rem 0;
  min-width: 600px;

  @media screen and (max-width: 999px) {
    margin: 2rem;
  }

  h2 {
    width: 100%;
    text-align: center;
    padding: 1.5rem;
  }
`
const ContentItem = styled.div`
  margin: 1.2rem 2rem;

  h3 {
    margin-bottom: 1rem;
  }
`

const ItemText = styled.p`
  margin-bottom: 5px;
`

const OrderItems = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  flex-direction: column;

  @media screen and (max-width: 545px) {
    align-items: center;
  }
`

const ItemsWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;

  @media screen and (max-width: 545px) {
    flex-direction: column;
    align-items: flex-start;
    align-items: center;
  }
`

const ImgWrap = styled.div`
  height: 5.5rem;
  width: 4rem;

  @media screen and (max-width: 545px) {
    width: 200px;
    height: 280px;
  }
`

const Img = styled.img`
  height: 100%;
  width: 100%;
`

const NameWrap = styled.div`
  margin: 0 2rem;
  max-width: 250px;
  min-width: 150px;

  @media screen and (max-width: 545px) {
    margin: 1rem;
    text-align: center;
  }
`
const Title = styled(Link)`
  color: #514cad;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
`
const ItemP = styled.p`
  font-weight: 500;

  @media screen and (max-width: 545px) {
    text-align: center;
  }
`

const OrderSummary = styled.div`
  display: flex;
  justify-content: center;
  min-width: 320px;
  max-height: 570px;
  background: #f7f7f7;
  border-radius: 4px;
  margin: 2rem 0;

  @media screen and (max-width: 999px) {
    margin: 2rem;
  }
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  margin: 2rem 0;

  h3 {
    font-size: 1.5rem;
  }
`

const OrderWrap = styled.div`
  margin-top: 3rem;
  min-width: 160px;
`

const OrderText = styled.p`
  display: flex;
  max-width: 100px;
  margin-bottom: 1rem;

  strong {
    margin-right: 2rem;
  }
`

const BtnWrap = styled.div``
