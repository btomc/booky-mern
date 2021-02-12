import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import CheckoutSteps from '../components/CheckoutSteps'
import {BtnSubmit} from '../components/BtnSubmit'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shipping } = cart

    if(!shipping) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <PaymentContainer>
            <PaymentContent>
                <CheckoutSteps step1 step2 step3 />
                <ContentTitle>Payment Method</ContentTitle>
                <PaymentForm onSubmit={submitHandler}>
                    <FormItem>
                        <FormMainLabel as='legend'>Select Method</FormMainLabel>
                        <FormRadio>
                            <FormInput
                                type='radio'
                                name='paymentMethod'
                                value='PayPal'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                ></FormInput>
                            <FormLabel>PayPal or Credit Card</FormLabel>
                        </FormRadio>

                    </FormItem>
                    <BtnSubmit type='submit' value='submit' style={{ marginBottom: '12px'}}>Continue</BtnSubmit>
                </PaymentForm>
            </PaymentContent>
        </PaymentContainer>
    )
}

export default PaymentScreen

const PaymentContainer = styled.div`
    display: flex;
    justify-content: center;
    background: rgba(129,76,173,0.5);
    color: #fff;
    color: #171e40;
`;

const PaymentContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f7f7f7;
    border-radius: 4px;
    margin: 2rem 0;
    /* min-width: 400px; */
`; 

const ContentTitle = styled.h2`
    padding: 1rem;
    font-size: 1.6rem;
    text-transform: uppercase;
`; 

const PaymentForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 500px;

    @media screen and (max-width: 685px) {
        min-width: 100%;
    }
`; 

const FormItem = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;

    @media screen and (max-width: 685px) {
        width: 90%;
    }
`;

const FormMainLabel = styled.label`
    font-size: 1.3rem;
    margin-bottom: 12px;
    color: #514cad;
    font-weight: 600;
`;

const FormLabel = styled.label`
    /* color: #514cad; */
    font-weight: 600;
    margin-left: 5px;
`;

const FormRadio = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`;

const FormInput = styled.input`
    padding: 12px;
    border-radius: 4px;
    font-size: 1rem;
    border: 1px solid #171e40;
    outline: none;
    color: #171e40;
`;