import React, {useState} from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { saveShipping } from '../actions/cartActions'
import { BtnSubmit } from '../components/BtnSubmit'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shipping } = cart

    const [shippingMethod, setShippingMethod] = useState('Parcel-7$')
    const [address, setAddress] = useState(shipping.address)
    const [city, setCity] = useState(shipping.city)
    const [postalCode, setPostalCode] = useState(shipping.postalCode)
    const [country, setCountry] = useState(shipping.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShipping({ shippingMethod, address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <ShippingContainer>
            <ShippingContent>
                <CheckoutSteps step1 step2 />
                <ContentTitle>Shipping</ContentTitle>
                <ShippingForm onSubmit={submitHandler}>
                    <FormItem>
                        <FormMainLabel as='legend'>Shipping Method</FormMainLabel>
                        <FormRadio>
                            <FormInput
                                type='radio'
                                name='shippingMethod'
                                value={'Parcel'}
                                checked
                                onChange={(e) => setShippingMethod(e.target.value)}
                                ></FormInput>
                            <FormLabel>Parcel 7$</FormLabel>
                        </FormRadio>

                        {/* <FormRadio>
                            <FormInput
                                type='radio'
                                label='UPS courier 10$'
                                name='shippingMethod'
                                value={'UPS-10$'}
                                onChange={(e) => setShippingMethod(e.target.value)}
                                ></FormInput>
                            <FormLabel>UPS courier 10$</FormLabel>
                        </FormRadio> */}
                    </FormItem>

                    <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormInput
                            type='text'
                            placeholder='Enter address'
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        ></FormInput>
                    </FormItem>

                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormInput
                            type='text'
                            placeholder='Enter city'
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        ></FormInput>
                    </FormItem>

                    <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormInput
                            type='text'
                            placeholder='Enter postal code'
                            value={postalCode}
                            required
                            onChange={(e) => setPostalCode(e.target.value)}
                        ></FormInput>
                    </FormItem>

                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormInput
                            type='text'
                            placeholder='Enter country'
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        ></FormInput>
                    </FormItem>

                    <BtnSubmit type='submit' value='submit' style={{ marginBottom: '12px'}}>Continue</BtnSubmit>
                    
                </ShippingForm>
            </ShippingContent>
        </ShippingContainer>
    )
}

export default ShippingScreen


const ShippingContainer = styled.div`
  display: flex;
  justify-content: center;
  background: rgba(124, 121, 178, 0.7);
  background: #dddddd;
  color: #171e40;
`

const ShippingContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f7f7f7;
    border-radius: 4px;
    margin: 2rem 0;
    /* min-width: 400px; */

    @media screen and (max-width: 685px) {
        padding: 0 2rem;
    }
`; 

const ContentTitle = styled.h2`
    padding: 1rem;
    font-size: 1.6rem;
    text-transform: uppercase;
`; 

const ShippingForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 400px;

    @media screen and (max-width: 685px) {
        width: 90%;
    }

    @media screen and (max-width: 485px) {
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

const FormRadio = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`;

const FormLabel = styled.label`
    color: #514cad;
    font-weight: 600;
    margin-left: 5px;
`;

const FormInput = styled.input`
    padding: 12px;
    border-radius: 4px;
    font-size: 1rem;
    border: 1px solid #171e40;
    outline: none;
    color: #171e40;
`;

