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
                        <BtnSmall>1</BtnSmall>
                    </ItemLink>
                ) : (
                    <>
                        <Button opacity={true}>Sign In</Button>
                        <BtnSmall opacity={true}>1</BtnSmall>
                    </>
                )}
            </NavItem>

            <NavItem>
                {step2 ? (
                    <ItemLink to='/shipping'>
                        <Button>Shipping</Button>
                        <BtnSmall>2</BtnSmall>
                    </ItemLink>
                ) : (
                    <>
                        <Button opacity={true}>Shipping</Button>
                        <BtnSmall opacity={true}>2</BtnSmall>
                    </>
                )}
            </NavItem>

            <NavItem>
                {step3 ? (
                    <ItemLink to='/payment'>
                        <Button>Payment</Button>
                        <BtnSmall>3</BtnSmall>
                    </ItemLink>
                ) : (
                    <>
                        <Button opacity={true}>Payment</Button>
                        <BtnSmall opacity={true}>3</BtnSmall>
                    </>
                )}
            </NavItem>

            <NavItem>
                {step4 ? (
                    <ItemLink to='/placeorder'>
                        <Button >Place Order</Button>
                        <BtnSmall>4</BtnSmall>
                    </ItemLink>
                ) : (
                    <>
                        <Button opacity={true}>Place Order</Button>
                        <BtnSmall opacity={true}>4</BtnSmall>
                    </>
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
    text-decoration: none;
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
  background: ${({ opacity }) => (opacity ? 'rgba(81,76,173,0.8)' : '#3f3b84')};

  @media screen and (max-width: 685px) {
    display: none;
  }
`

const BtnSmall = styled.button`
    display: none;

    @media screen and (max-width: 685px) {
        border: none;
        color: #f2f2f2;
        border-radius: 5px;
        transition: 0.2s ease-out;
        cursor: pointer;
        max-width: 20px;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        padding: 6px 12px;
        font-size: 1rem;
        font-weight: 700;
        background: ${({ opacity }) => (opacity ? 'rgba(81,76,173,0.8)' : '#514cad')}
    }
`;

