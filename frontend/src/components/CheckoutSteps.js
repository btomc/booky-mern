import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav>
            <NavItem>
                {step1 ? (
                    <ItemLink to='/login'>
                        <Button>Sign In</Button>
                    </ItemLink>
                ) : (
                    <Button disabled={true}>Sign In</Button>
                )}
            </NavItem>

            <NavItem>
                {step2 ? (
                    <ItemLink to='/shipping'>
                        <Button>Shipping</Button>
                    </ItemLink>
                ) : (
                    <Button disabled={true}>Shipping</Button>
                )}
            </NavItem>

            <NavItem>
                {step3 ? (
                    <ItemLink to='/payment'>
                        <Button>Payment</Button>
                    </ItemLink>
                ) : (
                    <Button disabled={true}>Payment</Button>
                )}
            </NavItem>

            <NavItem>
                {step4 ? (
                    <ItemLink to='/placeorder'>
                        <Button >Place Order</Button>
                    </ItemLink>
                ) : (
                    <Button disabled={true}>Place Order</Button>
                )}
            </NavItem>
        </Nav>
    )
}

export default CheckoutSteps

const Nav = styled.nav`
    display: flex;
    justify-content: space-evenly;
    margin: 1rem 2rem;
`;

const NavItem = styled.div`
    margin: .7rem;
`;

const ItemLink = styled(Link)`
    border-radius: 5px;
`;

const Button = styled.button`
    border: none;
    color: #f2f2f2;
    border-radius: 5px;
    transition: 0.2s ease-out;
    cursor: pointer;
    min-width: 100px;
    max-width: 200px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    background: ${({ disabled }) => (disabled ? 'rgba(81,76,173,0.8)' : '#514cad')}
`;

