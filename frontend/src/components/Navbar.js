import React, {useState} from 'react'
import styled from 'styled-components'
import { ImBooks } from 'react-icons/im'
import { MdShoppingCart } from 'react-icons/md'
import { IoMdArrowDropdown } from 'react-icons/io'

const Navbar = () => {
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)

    return (
        <Nav>
            <NavContainer>
                <NavLogo to='/'>
                    <LogoIcon><ImBooks /></LogoIcon>
                    <p>booky</p>
                </NavLogo>
                <NavMenu>
                    <Cart>
                        <CartIcon><MdShoppingCart /></CartIcon>
                        <CartText>Cart</CartText>
                    </Cart>
                    <ClientName onClick={handleClick} >Jane Doe<IoMdArrowDropdown /></ClientName>
                    <ClientMenu onClick={handleClick} click={click}>
                        <MenuItem>
                            <p>Profile</p>
                        </MenuItem>
                        <MenuItem><LogoutBtn>Logout</LogoutBtn></MenuItem>
                    </ClientMenu>
                </NavMenu>
            </NavContainer>
        </Nav>
    )
}

export default Navbar

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    background: #f2f2f2;
`;

const NavContainer = styled.div`
    margin: 0 3rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #514CAD;
`;

const NavLogo = styled.div`
    display: flex;
    align-items: center;
    font-size: 2rem;
    cursor: pointer;
`;

const LogoIcon = styled(ImBooks)`
    margin-right: 4px;
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    position: relative;
`;

const Cart = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
    cursor: pointer;
`;

const CartIcon = styled(MdShoppingCart)`
    font-size: 1.5rem;
`;

const CartText = styled.p`
    text-transform: uppercase;
`;

const ClientName = styled.p`
    text-transform: uppercase;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const ClientMenu = styled.div`
    background: ${({ click }) => (click ? '#eaeaea' : 'transparent')};
    display: block;
    position: absolute;
    top: ${({ click }) => (click ? '30px' : '-300px')};
    right: 0;
    padding: 1.8rem 2rem 1rem 2rem;
    z-index: 999;
    border-radius: 4px;
    transform: background 3s;
`;

const MenuItem = styled.div`
    margin-bottom: 1rem;
    cursor: pointer;
`;

const LogoutBtn = styled.a``;

