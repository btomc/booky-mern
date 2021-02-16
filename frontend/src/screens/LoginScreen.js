import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {BtnSubmit} from '../components/BtnSubmit'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <LoginContainer>
            <LoginContent>
                <LoginH2>Sign in</LoginH2>
                {error && <Message>{error}</Message>}
                {loading && <Loader />}
                <LoginForm onSubmit={submitHandler}>
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

                    <BtnSubmit type='submit' primary='true'>Sign In</BtnSubmit>
                </LoginForm>

                <Text>
                    New Customer?{' '}
                    <Redirect to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Redirect>
                </Text>
            </LoginContent>
        </LoginContainer>
    )
}

export default LoginScreen


const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    background: rgba(81,76,173,0.8);
    /* background: #514cad; */
    color: #fff;
    color: #171e40;
`;

const LoginContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f7f7f7;
    border-radius: 4px;
    margin: 2rem 0;
    min-width: 400px;
`;

const LoginH2 = styled.h2`
    text-transform: uppercase;
    padding: 1rem;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
`;
const FormItem = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const FormLabel = styled.label`
    margin-bottom: 5px;
    color: #514cad;
    font-weight: 600;
`;

const FormInput = styled.input`
    padding: 12px;
    border-radius: 4px;
    font-size: 1rem;
    border: 1px solid #171e40;
    outline: none;
    color: #171e40;
`;

const Text = styled.p`
    margin: 1rem;
`;

const Redirect = styled(Link)`
    text-decoration: none;
    border-bottom: 2px solid #514cad;
    color: #514cad;
    font-weight: 600;
`;