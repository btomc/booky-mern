import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'


const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <RegisterContainer>
            <RegisterContent>
                <ContentH2>Sign Up</ContentH2>
                {message && <Message>{message}</Message>}
                {error && <Message>{error}</Message>}
                {loading && <Loader />}
                <RegisterForm onSubmit={submitHandler}>
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

                    <BtnSubmit type='submit' primary='true'>Register</BtnSubmit>
                </RegisterForm>

                <Text>
                    Have an Account?{' '}
                    <Redirect to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                    </Redirect>
                </Text>
            </RegisterContent>
        </RegisterContainer>
    )
}

export default RegisterScreen


const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    background: rgba(129,76,173,0.5);
    color: #fff;
    color: #171e40;
`;

const RegisterContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f7f7f7;
    border-radius: 4px;
    margin: 2rem 0;
    min-width: 400px;
    max-width: 500px;
`;

const ContentH2 = styled.h2`
    text-transform: uppercase;
    padding: 1rem;
`;

const RegisterForm = styled.form`
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
const BtnSubmit = styled.button`
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

    &:hover {
        background: #464293;
        transition: 0.2s ease-out;
    }

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