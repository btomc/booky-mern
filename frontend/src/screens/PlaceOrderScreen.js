import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../components/Button'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'


const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart)

    // Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100 / 100).toFixed(2))
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    ))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 50 ? 0 : (7 || 10))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)).toFixed(2)

    const placeOrderHandler = () => {
        console.log('order')
    }

    return (
        <PlaceOrderContainer>
            <OrderContent>
                <CheckoutSteps step1 step2 step3 step4 />
                <ContentItem>
                    <h3>Shipping</h3>
                    <ItemText>
                        <strong>Method: </strong>
                        {cart.shipping.shippingMethod}
                    </ItemText>
                    <ItemText>
                        <strong>Address: </strong>
                        {cart.shipping.address},{' '}
                        {cart.shipping.city},{' '}
                        {cart.shipping.postalCode},{' '}
                        {cart.shipping.country}
                    </ItemText>
                </ContentItem>

                <ContentItem>
                    <h3>Payment</h3>
                    <ItemText>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </ItemText>
                </ContentItem>

                <ContentItem>
                    <h3>Order Items</h3>
                    {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                        <OrderItems>
                            {cart.cartItems.map((item, index) => (
                                <ItemsWrap key={index}>
                                    <ImgWrap><Img src={item.image} alt={item.title} /></ImgWrap>
                                    <NameWrap>
                                        <Title>{item.title}</Title>
                                        <ItemP style={{ fontSize: '13px'}}>{item.author}</ItemP>
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
                            <ItemP>${cart.itemsPrice}</ItemP>
                        </OrderText>

                        <OrderText>
                            <strong>Shipping</strong>
                            <ItemP>${cart.shippingPrice}</ItemP>
                        </OrderText>

                        <OrderText>
                            <strong>Total</strong>
                            <ItemP>${cart.totalPrice}</ItemP>
                        </OrderText>

                        <Button 
                            disabled={cart.cartItems === 0} 
                            onClick={placeOrderHandler}
                            style={{ marginTop: '2rem'}}
                        >Place Order</Button>
                    </OrderWrap>
                </Card>
            </OrderSummary>
        </PlaceOrderContainer>
    )
}

export default PlaceOrderScreen


const PlaceOrderContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    background: rgba(129,76,173,0.5);
    color: #171e40;

    @media screen and (max-width: 999px) {
        flex-direction: column;
    }
`;

const OrderContent = styled.div`
    background: #f7f7f7;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    background: #f7f7f7;
    border-radius: 4px;
    margin: 2rem 0;

    @media screen and (max-width: 999px) {
        margin: 2rem;
    }
`;
const ContentItem = styled.div`
    margin: 1.2rem 2rem;

    h3 {
        margin-bottom: 1rem;
    }
`;


const ItemText = styled.p`
    margin-bottom: 5px;
`;
const OrderItems = styled.div`
    display: flex;
    margin-bottom: .5rem;
`;

const ItemsWrap = styled.div`
    display: flex;
    justify-content: space-around;
`;

const ImgWrap = styled.div`
    height: 5.5rem;
    width: 4rem;

 
    @media screen and (max-width: 600px) {
        width: 200px;
        height: 280px;
    }
`;

const Img = styled.img`
    height: 100%;
    width: 100%;
`;

const NameWrap = styled.div`
    margin: 0 2rem;
    max-width: 250px;
    min-width: 150px;
`;
const Title = styled(Link)`
    color: #514cad;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.1rem;
`;
const ItemP = styled.p`
    font-weight: 500;
`;
const OrderSummary = styled.div`
    display: flex;
    justify-content: center;
    min-width: 320px;
    background: #f7f7f7;
    border-radius: 4px;
    margin: 2rem 0;

    @media screen and (max-width: 999px) {
        margin: 2rem;
    }
`;
const Card = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    margin: 2rem 0;

    h3 {
        font-size: 1.5rem;
    }
`;

const OrderWrap = styled.div`
    margin-top: 3rem;
    min-width: 160px;
`;

const OrderText = styled.p`
    display: flex;
    max-width: 100px;
    margin-bottom: 1rem;

    strong {
        margin-right: 2rem;
    }
`;
