import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { Button } from '../components/Button'
import { addToCart, removeFromCart } from '../actions/cartActions'
import styled from 'styled-components'
import {FaTrash} from 'react-icons/fa'


const CartScreen = ({ match, location, history}) => {
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <CartContainer>
            <BtnBack to='/products'>Go Back</BtnBack>
            <CartWrapper>
            <CartContent>
                <CartH2>Shopping Cart</CartH2>
                {cartItems.length === 0 ? (
                    <Message variant='true'>
                        Your cart is empty. <Redirect to='/products'>Go Back</Redirect>
                    </Message>
                ) : (
                    <CartWrap>
                        {cartItems.map(item => (
                            <WrapRow key={item.product}>
                                <ProductImg><Img src={item.image} alt={item.title} /></ProductImg>
                                <WrapCol>
                                    <ProductName>
                                    <Title to={`/product/${item.product}`}>{item.title}</Title>
                                    <Author>{item.author}</Author>
                                    </ProductName>
                                </WrapCol>
                                <WrapCol>
                                    <ProductPrice>${item.price}</ProductPrice>
                                </WrapCol>
                                <WrapCol>
                                    <Form 
                                        as='select' 
                                        value={item.qty} 
                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                        {[...Array(item.countInStock).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </Form>
                                </WrapCol>
                                <WrapCol>
                                    <RemoveBtn onClick={() => removeFromCartHandler(item.product)}>
                                        <Icon><FaTrash /></Icon>
                                    </RemoveBtn>
                                </WrapCol>
                            </WrapRow>
                        ))}
                    </CartWrap>
                )}
            </CartContent>
            <CartSummary>
                <Card>
                    <CardWrapItem>
                        <CardText>
                            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                            items
                        </CardText>
                        <PriceSpan>${cartItems
                            .reduce((acc, item) => acc + item.qty * item.price, 0)
                            .toFixed(2)}
                        </PriceSpan>
                    </CardWrapItem>
                    <CardWrapItem>
                        <Button 
                            type='button' 
                            disabled={cartItems.length === 0} 
                            onClick={checkoutHandler}
                        >
                            Go To Checkout
                        </Button>
                    </CardWrapItem>
                </Card>
            </CartSummary>
            </CartWrapper>
        </CartContainer>
    )
}

export default CartScreen

const CartContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    /* background: rgba(129,76,173,0.2); */
    /* background: #ddd; */
    background: rgba(81,76,173,0.7);
    color: #171e40;

    @media screen and (max-width: 890px) {
        flex-direction: column;
        align-items: center;
    }
`;

const BtnBack = styled(Link)`
    background: #171e40;
    border: none;
    color: #f2f2f2;
    transition: 0.2s ease-out;
    cursor: pointer;
    min-width: 100px;
    max-width: 200px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    margin: 2rem 2rem 0 2rem;
    width: 150px;

    &:hover {
        background: #464293;
        transition: 0.2s ease-out;
    }
`;

const CartWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const CartContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    background: #f7f7f7;
    margin: 2rem;
    border-radius: 4px;
    min-height: 340px;

    @media screen and (max-width: 890px) {
        width: 90%;
    }
`;
const CartH2 = styled.h2`
    padding: 2.5rem;
    color: #464293;
    font-size: 2rem;

    @media screen and (max-width: 890px) {
        text-align: center;
        margin-left: 0;
    }
`;

const Redirect = styled(Link)`
    text-decoration: none;
    border-bottom: 2px solid #fff;
    color: #fff;
`;

const CartWrap = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const WrapRow = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 1.5rem;

    @media screen and (max-width: 600px) {
        flex-direction: column;
        align-items: center;
    }
`;

const WrapCol = styled.div`
    margin: 0 1rem;
    /* width: 100%; */

    @media screen and (max-width: 890px) {
        margin-top: 1rem;
    }
`;

const ProductImg = styled.div`
    height: 5.5rem;
    width: 4rem;

    @media screen and (max-width: 1000px) {
        margin : 0 1rem;
    }

    @media screen and (max-width: 600px) {
        width: 200px;
        height: 280px;
    }
`;

const Img = styled.img`
    height: 100%;
    width: 100%;
`;

const ProductName = styled.div`
    max-width: 250px;
    min-width: 150px;

    @media screen and (max-width: 600px) {
        text-align: center;
    }
`;

const Title = styled(Link)`
    color: #514cad;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.1rem;
`;

const Author = styled.p`
    font-size: 13px;
    margin-top: 5px;
    font-weight: 500;
`;

const Form = styled.form`
    padding: 9px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #514cad;
    outline: none;
    cursor: pointer;
`;

const ProductPrice = styled.div``;
const RemoveBtn = styled.button`
    cursor: pointer;
    border: none;
    outline: none;
    margin-top: .5rem;
`;

const Icon = styled.i`
    font-size: 1.2rem;
    color: #fff;
    background: #171e40;
    border: none;
    padding: .5rem 1rem;
    border-radius: 3px;

    &:hover {
        background: rgb(23,30,64, 0.8);
    }
`;

const CartSummary = styled.div`
    width: 35%;
    background: #f7f7f7;
    border-radius: 4px;
    min-height: 340px;
    display: flex;
    justify-content: center;
    margin: 2rem 2rem 2rem 0;
    
    @media screen and (max-width: 890px) {
        margin: 0 0 2rem 0;
        width: 300px;
    }
`;

const Card = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    height: 100%;
    width: 100%;
    margin: 2rem;
`;

const CardWrapItem = styled.div`
    margin-bottom: 3rem;
`;

const CardText = styled.h3`
    font-size: 1.5rem;
    color: #464293;
    margin-bottom: 2.5rem;
`;

const PriceSpan = styled.p`
    font-weight: 600;
    font-size: 1.5rem;
`;
