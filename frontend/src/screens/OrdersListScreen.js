import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { FaTimes } from 'react-icons/fa'
import { Button } from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderActions'

function OrdersListScreen({ history }) {
  const dispatch = useDispatch()

  const ordersList = useSelector((state) => state.ordersList)
  const { loading, error, orders } = ordersList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <ProductListContainer>
      <h2>Orders</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <OrdersWrap>
          <OrdersTitle>
            <TitleId>ID</TitleId>
            <OrderUser>USER</OrderUser>
            <OrderDate>DATE</OrderDate>
            <OrderPrice>TOTAL</OrderPrice>
            <OrderPaid>PAID</OrderPaid>
            <OrderSent>SENT</OrderSent>
          </OrdersTitle>
          <OrdersItems>
            {orders.map((order) => (
              <ItemsWrap key={order._id}>
                <TitleId>{order._id}</TitleId>
                <OrderUser>{order.user & order.user.name}</OrderUser>
                <OrderDate>{order.createdAt.substring(0, 10)}</OrderDate>
                <OrderPrice>{order.totalPrice}</OrderPrice>
                <OrderPaid>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: '#cc2828' }} />
                  )}
                </OrderPaid>
                <OrderSent>
                  {order.isSent ? (
                    order.sentAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: '#cc2828' }} />
                  )}
                </OrderSent>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button>Details</Button>
                </LinkContainer>
              </ItemsWrap>
            ))}
          </OrdersItems>
        </OrdersWrap>
      )}
    </ProductListContainer>
  )
}

export default OrdersListScreen

const ProductListContainer = styled.div`
  background: #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* color: #f2f2f2; */
  color: #3f3b84;
  min-height: 600px;

  h2 {
    font-size: 2rem;
    margin: 1.5rem 0;
  }
`

const OrdersWrap = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  width: 90%;
  align-items: center;

  @media screen and (max-width: 975px) {
    overflow-y: hidden;
    overflow-x: scroll;
    scrollbar-color: #171e40 #514cad;
    scrollbar-width: thin;
    margin-left: 1.5rem;
  }
`

const OrdersTitle = styled.div`
  display: flex;
  max-width: 1000px;
  margin-bottom: 1rem;
  text-align: left;
  min-width: 1000px;

  @media screen and (max-width: 975px) {
    margin-left: 9rem;
  }
`

const TitleId = styled.p`
  width: 250px;
`

const OrderUser = styled.p`
  width: 160px;
  text-align: left;
`

const OrderDate = styled.p`
  min-width: 120px;
`

const OrderPrice = styled.p`
  min-width: 60px;
`

const OrderPaid = styled.p`
  min-width: 140px;
`

const OrderSent = styled.p`
  min-width: 140px;
`

const OrdersItems = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  text-align: left;

  @media screen and (max-width: 975px) {
    margin-left: 12rem;
  }
`

const ItemsWrap = styled.div`
  display: flex;
  margin-bottom: 1rem;
`

const LinkContainer = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`
