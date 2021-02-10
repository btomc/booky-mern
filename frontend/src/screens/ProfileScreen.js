import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {BtnSubmit} from '../components/BtnSubmit'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
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

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
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
                My Orders
            </OrderContent>
        </ProfileContainer>
    )
}

export default ProfileScreen


const ProfileContainer = styled.div`
    background: #514cad;
    display: flex;
    justify-content: space-evenly;
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
    width: 50%;
`;

