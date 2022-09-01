import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ImBooks } from 'react-icons/im'
import { MdShoppingCart } from 'react-icons/md'
import { IoMdArrowDropdown } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'

const Navbar = () => {
  const [click, setClick] = useState(false)
  const [clickAdmin, setClickAdmin] = useState(false)

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const handleClick = () => setClick(!click)
  const handleClickAdmin = () => setClickAdmin(!clickAdmin)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Nav>
      <NavContainer>
        <NavLogo to='/'>
          <LogoIcon>
            <ImBooks />
          </LogoIcon>
          booky
        </NavLogo>
        <NavMenu>
          <Cart to='/cart'>
            <CartSpan>{cartItems.length}</CartSpan>
            <CartIcon>
              <MdShoppingCart />
            </CartIcon>
            <CartText>Cart</CartText>
          </Cart>

          {userInfo ? (
            <>
              <MenuName onClick={handleClick}>
                <p>{userInfo.name}</p>
                <IoMdArrowDropdown />
              </MenuName>
              <MenuWrap onClick={handleClick} click={click}>
                <MenuItem to='/profile'>
                  <ItemText>Profile</ItemText>
                </MenuItem>
                <LogoutBtn onClick={logoutHandler}>Logout</LogoutBtn>
              </MenuWrap>
            </>
          ) : (
            <MenuItem to='/login'>
              <ItemText>Sign In</ItemText>
            </MenuItem>
          )}
          {userInfo && userInfo.isAdmin && (
            <>
              <MenuName onClick={handleClickAdmin}>
                <p>{userInfo.name}</p>
                <IoMdArrowDropdown />
              </MenuName>
              <MenuWrap onClick={handleClickAdmin} click={clickAdmin}>
                <MenuItem to='/admin/productlist'>
                  <ItemText>Products</ItemText>
                </MenuItem>
                <MenuItem to='/admin/orderlist'>
                  <ItemText>Orders</ItemText>
                </MenuItem>
              </MenuWrap>
            </>
          )}
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
`

const NavContainer = styled.div`
  margin: 0 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #514cad;

  @media screen and (max-width: 700px) {
    margin: 0 1rem;
  }
`

const NavLogo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 2rem;
  text-decoration: none;
  color: #514cad;
`

const LogoIcon = styled(ImBooks)`
  margin-right: 4px;
  font-size: 2.3rem;
`

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  position: relative;
`

const Cart = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: #514cad;
  position: relative;

  @media screen and (max-width: 640px) {
    margin-right: 3px;

    p {
      display: none;
    }
  }
`

const CartSpan = styled.span`
  position: absolute;
  top: -15px;
  right: 0;
  left: 15px;
  height: 20px;
  width: 20px;
  background: #171e40;
  color: #f2f2f2;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
`

const CartIcon = styled(MdShoppingCart)`
  font-size: 1.5rem;
`

const CartText = styled.p`
  margin: 0 10px 0 2px;
`

const MenuName = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 1rem;

  @media screen and (max-width: 475px) {
    p {
      display: none;
    }
  }
`

const MenuWrap = styled.div`
  background: ${({ click }) => (click ? '#eaeaea' : 'transparent')};
  display: block;
  position: absolute;
  top: ${({ click }) => (click ? '30px' : '-300px')};
  right: 5rem;
  right: 0;
  z-index: 999;
  border-radius: 2px;
  transform: background 3s;
`

const MenuItem = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: #514cad;
`

const ItemText = styled.p`
  padding: 0.8rem 1.2rem;

  &:hover {
    background: #464293;
    border-radius: 2px;
    color: #fff;
  }
`

const LogoutBtn = styled.button`
  color: #514cad;
  padding: 0.8rem 1.2rem;
  border: none;
  width: 100%;
  font-size: 1.1rem;

  &:hover {
    background: #464293;
    border-radius: 2px;
    color: #fff;
  }
`
