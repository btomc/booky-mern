import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {FaTimes} from 'react-icons/fa'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {BtnSubmit} from '../components/BtnSubmit'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { myListOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderMyList = useSelector(state => state.orderMyList)
    const { loading: loadingOrders, error: errorOrders, orders } = orderMyList

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(myListOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }


    return (
        <ProfileContainer>
            <ProfileContent>
                <ProfileTitle>User Profile</ProfileTitle>
                {message && <Message>{message}</Message>}
                {error && <Message>{error}</Message>}
                {loading && <Loader />}
                <ProfileForm onSubmit={submitHandler}> 
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormInput 
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></FormInput>
                    </FormItem>

                    <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormInput 
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></FormInput>
                    </FormItem>

                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormInput 
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></FormInput>
                    </FormItem>

                    <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormInput 
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></FormInput>
                    </FormItem>

                    <BtnSubmit type='submit' primary='true'>Update</BtnSubmit>
                </ProfileForm>
            </ProfileContent>
            <OrderContent>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader />
                    : errorOrders ? <Message>{errorOrders}</Message>
                    : (
                        <OrdersWrap>
                            <OrdersTitle>
                                <TitleId>ID</TitleId>
                                <OrderP>DATE</OrderP>
                                <OrderTotal>TOTAL</OrderTotal>
                                <OrderP>PAID</OrderP>
                                <OrderP>SENT</OrderP>
                                <OrderBtn></OrderBtn>
                            </OrdersTitle>
                            <OrdersItems>
                                {orders.map(order => (
                                    <ItemsWrap key={order._id}>
                                        <ItemId>{order._id}</ItemId>
                                        <Item>{order.createdAt.substring(0, 10)}</Item>
                                        <ItemTotal>${order.totalPrice}</ItemTotal>
                                        <Item>{order.isPaid 
                                            ? (order.paidAt.substring(0, 10))
                                            : (
                                                <FaTimes style={{ color: 'red'}} />
                                            )}
                                        </Item>
                                        <Item>{order.isSent 
                                            ? (order.sentAt.substring(0, 10))
                                            : (
                                                <FaTimes style={{ color: 'red'}} />
                                            )}
                                        </Item>
                                      
                                        <BtnWrap to={`/order/${order._id}`}>
                                            <Btn>Details</Btn>
                                        </BtnWrap>
                                     
                                    </ItemsWrap>
                                ))}
                            </OrdersItems>
                        </OrdersWrap>
                    )}
            </OrderContent>
        </ProfileContainer>
    )
}

export default ProfileScreen


const ProfileContainer = styled.div`
    background: #514cad;
    display: flex;
    justify-content: space-evenly;

    @media screen and (max-width: 1030px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ProfileContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    color: #fff;
`;

const ProfileTitle = styled.h2`
    font-size: 1.5rem;
    text-transform: uppercase;
`;

const ProfileForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
`;

const FormItem = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const FormLabel = styled.label`
    margin-bottom: 5px;
    color: #fff;
    font-weight: 600;
`;

const FormInput = styled.input`
    padding: 12px;
    border-radius: 4px;
    font-size: 1rem;
    border: none;
    outline: none;
    color: #171e40;
`;

const OrderContent = styled.div`
    /* width: 50%; */
    background: #f7f7f7;
    margin: 2rem 1rem;
    border-radius: 4px;
    min-height: 250px;
    min-width: 500px;
    max-width: 700px;

    h2 {
        padding: 1.8rem 1.5rem;
        text-transform: uppercase;
    }

    
`;

const OrdersWrap = styled.div`
    margin: 1.5rem;
    display: flex;
    flex-direction: column;
    /* width: 100%; */
`;

const OrdersTitle = styled.div`
    display: flex;
    justify-content: space-between;
    width: 600px;
    margin-bottom: 1rem;
`;

const TitleId = styled.p`
    width: 220px;
`;

const OrderP = styled.p`
    width: 90px;
`;

const OrderTotal = styled.p`
    width: 70px;
`;

const OrderBtn = styled.p``;

const OrdersItems = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    
`;

const ItemsWrap = styled.div`
    display: flex;
    margin-bottom: .8rem;
`;

const Item = styled.p`
    width: 90px;
    text-align: center;
`;

const ItemId = styled.p`
    width: 220px;
`;

const ItemTotal = styled.p`
    width: 70px;
    text-align: center;
`;

const Btn = styled.button`
    padding: .6rem;
    font-size: .9rem;
    border: none;
    color: #f2f2f2;
    background: #171e40;
    transition: 0.2s ease-out;
    cursor: pointer;
`;

const BtnWrap = styled(Link)``;
